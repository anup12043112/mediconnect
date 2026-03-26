import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation hook initialize kiya
  const navigate = useNavigate(); 

  // Fake API function (Async/Await ke sath)
  const fetchDoctorsMock = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Dr. Sharma", specialty: "Cardiologist", experience: "10 Years" },
          { id: 2, name: "Dr. Gupta", specialty: "Dermatologist", experience: "5 Years" },
          { id: 3, name: "Dr. Verma", specialty: "Pediatrician", experience: "8 Years" },
          { id: 4, name: "Dr. Khan", specialty: "Neurologist", experience: "12 Years" },
        ]);
      }, 1500);
    });
  };

  useEffect(() => {
    // Async/Await se clean data fetching
    const getDoctorsData = async () => {
      try {
        const data = await fetchDoctorsMock();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDoctorsData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Specialists</h2>
      <p style={styles.subHeading}>Choose a doctor and start your video consultation instantly.</p>
      
      {isLoading ? (
        <p style={styles.loadingText}>Fetching available doctors...</p>
      ) : (
        <div style={styles.grid}>
          {doctors.map((doc) => (
            <div key={doc.id} style={styles.card}>
              <h3 style={styles.doctorName}>{doc.name}</h3>
              <p style={styles.infoText}><strong>Specialty:</strong> {doc.specialty}</p>
              <p style={styles.infoText}><strong>Experience:</strong> {doc.experience}</p>
              
              {/* Ye button ab seedha Video Room me le jayega */}
              <button 
                style={styles.bookButton} 
                onClick={() => navigate('/room')}
              >
                Join Call Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Modern Premium Styles
const styles = {
  container: { 
    padding: '40px 5%', 
    maxWidth: '1100px', 
    margin: '0 auto',
    textAlign: 'center'
  },
  heading: {
    color: '#0f172a',
    fontSize: '2rem',
    marginBottom: '10px'
  },
  subHeading: {
    color: '#64748b',
    marginBottom: '40px'
  },
  loadingText: { 
    color: '#3b82f6', 
    fontStyle: 'italic',
    fontSize: '1.2rem',
    marginTop: '20px'
  },
  grid: { 
    display: 'flex', 
    gap: '30px', 
    flexWrap: 'wrap', 
    justifyContent: 'center' 
  },
  card: { 
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0', 
    borderRadius: '12px', 
    padding: '25px', 
    width: '260px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
  },
  doctorName: {
    color: '#2563eb',
    fontSize: '1.4rem',
    marginBottom: '15px'
  },
  infoText: {
    color: '#475569',
    marginBottom: '8px',
    fontSize: '0.95rem'
  },
  bookButton: {
    marginTop: 'auto', // Button ko hamesha bottom me push karne ke liye
    padding: '12px',
    backgroundColor: '#10b981', // Emerald Green color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  }
};

export default DoctorList;
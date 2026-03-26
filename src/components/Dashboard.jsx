import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fake API function to fetch appointments
  const fetchAppointmentsMock = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 101, doctorName: "Dr. Sharma", date: "28 Mar 2026", time: "10:30 AM", status: "Upcoming", type: "Video Call" },
          { id: 102, doctorName: "Dr. Verma", date: "20 Mar 2026", time: "05:00 PM", status: "Completed", type: "Follow-up" },
          { id: 103, doctorName: "Dr. Gupta", date: "15 Feb 2026", time: "11:00 AM", status: "Completed", type: "Consultation" },
        ]);
      }, 1200); // 1.2 seconds delay
    });
  };

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const data = await fetchAppointmentsMock();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>My Dashboard</h2>
        <p style={styles.subHeading}>Manage your appointments and medical records.</p>
      </div>

      {isLoading ? (
        <p style={styles.loadingText}>Loading your health records...</p>
      ) : (
        <div style={styles.contentWrapper}>
          <div style={styles.listContainer}>
            <h3 style={styles.sectionTitle}>Recent Appointments</h3>
            
            {appointments.map((appt) => (
              <div key={appt.id} style={styles.appointmentCard}>
                <div style={styles.cardLeft}>
                  <h4 style={styles.doctorName}>{appt.doctorName}</h4>
                  <p style={styles.appointmentDetails}>
                    {appt.date} | {appt.time} • {appt.type}
                  </p>
                </div>
                
                <div style={styles.cardRight}>
                  <span style={{
                    ...styles.statusBadge, 
                    backgroundColor: appt.status === "Upcoming" ? '#dcfce7' : '#f1f5f9',
                    color: appt.status === "Upcoming" ? '#16a34a' : '#64748b'
                  }}>
                    {appt.status}
                  </span>
                  
                  {appt.status === "Upcoming" && (
                    <button 
                      style={styles.joinButton}
                      onClick={() => navigate('/room')}
                    >
                      Join Call
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Side Panel for Quick Actions */}
          <div style={styles.sidePanel}>
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            <button style={styles.actionButton} onClick={() => navigate('/doctors')}>
              + Book New Appointment
            </button>
            <button style={{...styles.actionButton, backgroundColor: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1'}}>
              View Lab Reports
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for Dashboard
const styles = {
  container: { padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' },
  header: { marginBottom: '30px' },
  heading: { color: '#0f172a', fontSize: '2.2rem', marginBottom: '8px' },
  subHeading: { color: '#64748b', fontSize: '1.1rem' },
  loadingText: { color: '#3b82f6', fontStyle: 'italic', fontSize: '1.2rem' },
  
  contentWrapper: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
  
  listContainer: { flex: '2', minWidth: '300px' },
  sectionTitle: { color: '#1e293b', marginBottom: '20px', fontSize: '1.3rem' },
  
  appointmentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  },
  cardLeft: { display: 'flex', flexDirection: 'column', gap: '5px' },
  doctorName: { margin: 0, color: '#2563eb', fontSize: '1.2rem' },
  appointmentDetails: { margin: 0, color: '#64748b', fontSize: '0.95rem' },
  
  cardRight: { display: 'flex', alignItems: 'center', gap: '15px' },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  joinButton: {
    padding: '8px 16px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  
  sidePanel: { flex: '1', minWidth: '250px', backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', height: 'fit-content' },
  actionButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    marginBottom: '15px',
    fontSize: '1rem',
    transition: 'background-color 0.2s'
  }
};

export default Dashboard;
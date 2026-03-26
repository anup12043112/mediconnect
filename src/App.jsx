import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DoctorList from './components/DoctorList';
import VideoRoom from './components/VideoRoom';
import Dashboard from './components/Dashboard'; 
import './index.css';

const Home = () => (
  <div className="hero-section">
    <h2 className="hero-title">Healthcare,<br/>Now in your Hands.</h2>
    <p className="hero-subtitle">
      Connect with top specialized doctors through secure, high-quality video consultations from the comfort of your home.
    </p>
    <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
      Book Consultation Now
    </button>
  </div>
);

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Route pehle se set thi */}
        <Route path="/room" element={<VideoRoom />} />
      </Routes>
    </div>
  );
};

export default App;
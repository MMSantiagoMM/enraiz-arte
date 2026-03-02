import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Multimedia from './components/Multimedia';
import Tourism from './components/Tourism';
import Workshops from './components/Workshops';
import Donations from './components/Donations';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './context/AuthContext';

function MainSite() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Multimedia />
      <Tourism />
      <Workshops />
      <Donations />
      <Footer />
    </div>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/admin" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/admin/dashboard" /> : children;
}

import MultimediaView from './components/MultimediaView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminRoute><Login /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/videos" element={<MultimediaView type="videos" />} />
        <Route path="/galeria" element={<MultimediaView type="gallery" />} />
        <Route path="/varios" element={<MultimediaView type="varios" />} />
      </Routes>
    </Router>
  );
}

export default App;


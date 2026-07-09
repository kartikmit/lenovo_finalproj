import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext.jsx';

import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/roadmap" element={<Protected><RoadmapPage /></Protected>} />
        <Route path="/chat" element={<Protected><ChatPage /></Protected>} />
        <Route path="/projects" element={<Protected><ProjectsPage /></Protected>} />
        <Route path="/resources" element={<Protected><ResourcesPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
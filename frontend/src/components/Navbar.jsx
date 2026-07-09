import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'var(--card-bg)' }}>
      <h2 onClick={() => navigate('/dashboard')} style={{ margin: 0, cursor: 'pointer' }}>SkillPath</h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>Dashboard</span>
        <span onClick={() => navigate('/projects')} style={{ cursor: 'pointer' }}>Projects</span>
        <span onClick={() => navigate('/resources')} style={{ cursor: 'pointer' }}>Resources</span>
        <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>Profile</span>
        {user.level === 'Admin' && <span onClick={() => navigate('/admin')} style={{ cursor: 'pointer', color: 'red' }}>Admin</span>}
        <button onClick={toggleTheme} style={{ width: 'auto', margin: 0, padding: '5px' }}>{isDark ? 'Light' : 'Dark'}</button>
        <button onClick={() => { logout(); navigate('/'); }} style={{ width: 'auto', margin: 0, padding: '5px' }}>Logout</button>
      </div>
    </nav>
  );
};
export default Navbar;
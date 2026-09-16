import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  User, 
  ShieldAlert, 
  Sun, 
  Moon, 
  LogOut, 
  Compass 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/projects', icon: Briefcase },
    { label: 'Resources', path: '/resources', icon: BookOpen },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  if (user.level === 'Admin') {
    navLinks.push({ label: 'Admin', path: '/admin', icon: ShieldAlert, isAdmin: true });
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--nav-border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Brand */}
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px var(--primary-glow)',
            }}
          >
            <Compass size={20} strokeWidth={2.5} />
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--text-color) 40%, var(--primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SkillPath
          </h2>
        </div>

        {/* Navigation Links with Active Indicators & Lucide Icons */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isAdmin = item.isAdmin;

            let textColor = isActive ? 'var(--primary)' : 'var(--text-muted)';
            if (isAdmin) {
              textColor = isActive ? '#ef4444' : '#dc2626';
            }

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                style={{
                  width: 'auto',
                  margin: 0,
                  padding: '8px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  color: textColor,
                  background: isActive
                    ? (isAdmin ? 'rgba(239, 68, 68, 0.12)' : 'var(--primary-light)')
                    : 'transparent',
                  border: isActive
                    ? `1px solid ${isAdmin ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-accent)'}`
                    : '1px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <Icon
                  size={17}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  color={textColor}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: '20%',
                      right: '20%',
                      height: '2px',
                      borderRadius: '2px',
                      background: isAdmin ? '#ef4444' : 'var(--primary)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Theme Toggle & Logout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Aligned Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: 'auto',
              margin: 0,
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-color)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isDark ? (
              <Sun size={16} color="#fbbf24" strokeWidth={2} />
            ) : (
              <Moon size={16} color="#6366f1" strokeWidth={2} />
            )}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            title="Log Out"
            aria-label="Log Out"
            style={{
              width: 'auto',
              margin: 0,
              padding: '8px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <LogOut size={16} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
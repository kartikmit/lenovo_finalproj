import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Compass, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please verify your email and password.');
      }
    } catch (err) {
      setError('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="animate-fade-in" 
      style={{ 
        minHeight: 'calc(100vh - 120px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '24px 20px' 
      }}
    >
      <div 
        className="glass-card animate-pop-in" 
        style={{ 
          maxWidth: '440px', 
          width: '100%', 
          padding: '36px 32px', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow-lg)', 
          border: '1px solid var(--border-color)' 
        }}
      >
        {/* Brand Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div 
            style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff', 
              margin: '0 auto 16px auto', 
              boxShadow: '0 4px 16px var(--primary-glow)' 
            }}
          >
            <Compass size={24} strokeWidth={2.5} />
          </div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Welcome Back
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
            Sign in to continue your personalized learning roadmap
          </p>
        </div>

        {/* Refined Error Alert Badge */}
        {error && (
          <div 
            className="animate-fade-in" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '12px 14px', 
              borderRadius: '8px', 
              background: 'rgba(239, 68, 68, 0.12)', 
              color: '#ef4444', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              fontSize: '13px', 
              marginBottom: '20px' 
            }}
          >
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Email Field with Floating/Stacked Label & Inline Icon */}
          <div>
            <label 
              style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '600', 
                color: 'var(--text-color)', 
                marginBottom: '6px' 
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={17} 
                color="var(--text-muted)" 
                style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} 
              />
              <input 
                type="email"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                required 
                style={{
                  margin: 0,
                  padding: '12px 14px 12px 42px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Password Field with Inline Icon & Eye Toggle */}
          <div>
            <label 
              style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '600', 
                color: 'var(--text-color)', 
                marginBottom: '6px' 
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={17} 
                color="var(--text-muted)" 
                style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} 
              />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
                style={{
                  margin: 0,
                  padding: '12px 42px 12px 42px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  padding: '4px',
                  margin: 0,
                  width: 'auto',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              margin: '8px 0 0 0',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '8px',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 14px var(--primary-glow)'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer Navigation */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <span>Don't have an account? </span>
          <span 
            onClick={() => navigate('/register')} 
            style={{ 
              color: 'var(--primary)', 
              fontWeight: '600', 
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
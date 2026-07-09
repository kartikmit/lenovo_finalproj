import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (await login(email, password)) navigate('/dashboard');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '400px', margin: '100px auto', background: 'var(--card-bg)', padding: '30px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate('/register')} style={{ color: 'var(--primary)', cursor: 'pointer' }}>Register here</p>
    </div>
  );
};
export default LoginPage;
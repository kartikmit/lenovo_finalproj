import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('Beginner');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReg = async (e) => {
    e.preventDefault();
    if (await register(name, email, password, level)) navigate('/dashboard');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '400px', margin: '100px auto', background: 'var(--card-bg)', padding: '30px' }}>
      <h2>Register</h2>
      <form onSubmit={handleReg}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <select value={level} onChange={e => setLevel(e.target.value)}>
          <option>Beginner</option><option>Intermediate</option><option>Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate('/')} style={{ color: 'var(--primary)', cursor: 'pointer' }}>Login instead</p>
    </div>
  );
};
export default RegisterPage;
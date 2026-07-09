import { useState, useEffect } from 'react';
import api from '../utils/axios.js';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try { const res = await api.get('/auth/users'); setUsers(res.data); } catch (err) {}
    };
    fetchUsers();
  }, []);
  return (
    <div className="animate-fade-in" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', background: 'var(--card-bg)' }}>
      <h2>Admin Panel</h2>
      {users.map(u => <p key={u._id} style={{ borderBottom: '1px solid var(--border-color)', padding: '10px' }}>{u.name} - {u.email} - {u.level}</p>)}
    </div>
  );
};
export default AdminDashboard;
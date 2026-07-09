import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/axios.js';

const RoadmapPage = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const generate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      await api.post('/roadmaps/create', { topic });
      toast.success('Created');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed');
    }
    setLoading(false);
  };
  return (
    <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '50px auto', background: 'var(--card-bg)', padding: '30px' }}>
      <h2>Create Plan</h2>
      <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" />
      <button onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
    </div>
  );
};
export default RoadmapPage;
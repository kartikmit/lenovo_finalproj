import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../utils/axios.js';
import toast from 'react-hot-toast';
import ProgressRing from '../components/ProgressRing.jsx';
import LessonModal from '../components/learning/LessonModal.jsx';
import QuizModal from '../components/learning/QuizModal.jsx';

const DashboardPage = () => {
  const [plans, setPlans] = useState([]);
  const [overall, setOverall] = useState(0);
  const [lessonData, setLessonData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/roadmaps');
        setPlans(res.data);
        if (res.data.length > 0) {
          const total = res.data.reduce((acc, curr) => acc + curr.progress, 0);
          setOverall(Math.round(total / res.data.length));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlans();
  }, []);

  const markDone = async (planId, stepId) => {
    try {
      await api.put('/roadmaps/update', { planId, stepId });
      // Seamlessly fetch new data without reloading the whole browser page
      const res = await api.get('/roadmaps');
      setPlans(res.data);
      const total = res.data.reduce((acc, curr) => acc + curr.progress, 0);
      setOverall(Math.round(total / res.data.length));
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const getLesson = async (topic) => {
    const toastId = toast.loading('Generating lesson...');
    const res = await api.post('/learn/lesson', { topic });
    setLessonData(res.data.content);
    toast.dismiss(toastId);
  };

  const getQuiz = async (topic) => {
    const toastId = toast.loading('Building quiz...');
    const res = await api.post('/learn/quiz', { topic });
    setQuizData(res.data);
    toast.dismiss(toastId);
  };

  const chartData = plans.map(p => ({ topic: p.topic, progress: p.progress }));

  return (
    <div className="animate-fade-in" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '10px' }}>
          <h3>Total Progress</h3>
          <ProgressRing radius={60} stroke={10} progress={overall} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/roadmap')}>New Roadmap</button>
          <button onClick={() => navigate('/chat')}>Open AI Chat</button>
        </div>
      </div>
      <div style={{ height: '300px', background: 'var(--card-bg)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}><XAxis dataKey="topic" stroke="var(--text-color)" /><YAxis domain={[0, 100]} stroke="var(--text-color)" /><Tooltip /><Bar dataKey="progress" fill="var(--primary)" /></BarChart>
        </ResponsiveContainer>
      </div>
      {plans.map(p => (
        <div key={p._id} style={{ background: 'var(--card-bg)', padding: '20px', marginBottom: '20px' }}>
          <h3>{p.topic} ({p.progress}%)</h3>
          {p.steps.map(s => (
            <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ textDecoration: s.isDone ? 'line-through' : 'none' }}>{s.title}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => getLesson(s.title)} style={{ width: 'auto', margin: 0, padding: '5px' }}>Lesson</button>
                <button onClick={() => getQuiz(s.title)} style={{ width: 'auto', margin: 0, padding: '5px' }}>Quiz</button>
                {!s.isDone && <button onClick={() => markDone(p._id, s._id)} style={{ width: 'auto', margin: 0, padding: '5px' }}>Done</button>}
              </div>
            </div>
          ))}
        </div>
      ))}
      {lessonData && <LessonModal content={lessonData} onClose={() => setLessonData(null)} />}
      {quizData && quizData.length > 0 && <QuizModal quizData={quizData} onClose={() => setQuizData(null)} />}
    </div>
  );
};
export default DashboardPage;
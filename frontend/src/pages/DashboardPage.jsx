import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  PlusCircle, 
  MessageSquareCode, 
  BookOpen, 
  HelpCircle, 
  Check, 
  Layers, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
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
      toast.success('Milestone completed!');
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const getLesson = async (topic) => {
    const toastId = toast.loading('Generating lesson...');
    try {
      const res = await api.post('/learn/lesson', { topic });
      setLessonData(res.data.content);
    } catch (err) {
      toast.error('Failed to generate lesson');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const getQuiz = async (topic) => {
    const toastId = toast.loading('Building quiz...');
    try {
      const res = await api.post('/learn/quiz', { topic });
      setQuizData(res.data);
    } catch (err) {
      toast.error('Failed to build quiz');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const chartData = plans.map(p => ({ topic: p.topic, progress: p.progress }));
  
  const totalSteps = plans.reduce((acc, curr) => acc + (curr.steps?.length || 0), 0);
  const completedSteps = plans.reduce((acc, curr) => acc + (curr.steps?.filter(s => s.isDone).length || 0), 0);

  return (
    <div className="animate-fade-in" style={{ padding: '32px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Learning Dashboard
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
            Track milestone progress, generate interactive AI lessons, and test your mastery.
          </p>
        </div>
        <button
          onClick={() => navigate('/roadmap')}
          style={{
            width: 'auto',
            margin: 0,
            padding: '10px 18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '10px',
            boxShadow: '0 4px 14px var(--primary-glow)',
          }}
        >
          <PlusCircle size={17} />
          <span>New Roadmap</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
          gap: '18px', 
          marginBottom: '28px' 
        }}
      >
        {/* Metric 1: Overall Progress */}
        <div 
          className="glass-card hover-lift"
          style={{ 
            padding: '22px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '16px' 
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Overall Progress
            </span>
            <h2 style={{ margin: '6px 0 2px 0', fontSize: '28px', fontWeight: '800', color: 'var(--text-color)' }}>
              {overall}%
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Across {plans.length} {plans.length === 1 ? 'path' : 'paths'}
            </span>
          </div>
          <ProgressRing radius={38} stroke={6} progress={overall} />
        </div>

        {/* Metric 2: Active Roadmaps */}
        <div 
          className="glass-card hover-lift"
          style={{ 
            padding: '22px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Active Roadmaps
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Compass size={20} />
            </div>
          </div>
          <div>
            <h2 style={{ margin: '8px 0 2px 0', fontSize: '28px', fontWeight: '800', color: 'var(--text-color)' }}>
              {plans.length}
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {plans.filter(p => p.progress === 100).length} completed to 100%
            </span>
          </div>
        </div>

        {/* Metric 3: Milestones Finished */}
        <div 
          className="glass-card hover-lift"
          style={{ 
            padding: '22px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Steps Mastered
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div>
            <h2 style={{ margin: '8px 0 2px 0', fontSize: '28px', fontWeight: '800', color: 'var(--text-color)' }}>
              {completedSteps} <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>/ {totalSteps}</span>
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0}% total milestone completion
            </span>
          </div>
        </div>

        {/* Metric 4: AI Velocity */}
        <div 
          className="glass-card hover-lift"
          style={{ 
            padding: '22px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              AI Learning
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
              <Sparkles size={20} />
            </div>
          </div>
          <div>
            <h2 style={{ margin: '8px 0 2px 0', fontSize: '24px', fontWeight: '800', color: 'var(--text-color)' }}>
              Active Tutor
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Instant lessons & practice quizzes
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '18px', 
          marginBottom: '28px' 
        }}
      >
        <div 
          className="glass-card hover-lift" 
          style={{ 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderLeft: '4px solid var(--primary)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <PlusCircle size={20} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Create Learning Path</h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Design a structured roadmap for any language, technology, or computer science topic.
            </p>
          </div>
          <button 
            onClick={() => navigate('/roadmap')}
            style={{
              width: 'auto',
              margin: 0,
              padding: '9px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
            }}
          >
            <span>Launch Roadmap Planner</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div 
          className="glass-card hover-lift" 
          style={{ 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderLeft: '4px solid #8b5cf6'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <MessageSquareCode size={20} color="#8b5cf6" />
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>AI Tutor Chat</h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Ask conceptual questions, debug tricky code snippets, and receive personalized advice.
            </p>
          </div>
          <button 
            onClick={() => navigate('/chat')}
            style={{
              width: 'auto',
              margin: 0,
              padding: '9px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          >
            <span>Open AI Chat</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Analytics Chart Card */}
      {chartData.length > 0 && (
        <div 
          className="glass-card" 
          style={{ 
            padding: '24px', 
            borderRadius: '12px', 
            marginBottom: '28px' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <TrendingUp size={18} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Roadmap Mastery Overview</h3>
          </div>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="topic" 
                  stroke="var(--text-muted)" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                />
                <YAxis 
                  domain={[0, 100]} 
                  stroke="var(--text-muted)" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card-bg-solid)', 
                    borderColor: 'var(--border-color)', 
                    borderRadius: '8px', 
                    color: 'var(--text-color)',
                    boxShadow: 'var(--shadow-md)',
                    fontSize: '13px'
                  }} 
                />
                <Bar 
                  dataKey="progress" 
                  fill="var(--primary)" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Learning Modules Section */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Layers size={20} color="var(--primary)" />
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Active Learning Tracks</h2>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              background: 'var(--primary-light)', 
              color: 'var(--primary)' 
            }}
          >
            {plans.length}
          </span>
        </div>

        {plans.length === 0 ? (
          <div 
            className="glass-card" 
            style={{ 
              padding: '48px 20px', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <Compass size={40} color="var(--text-muted)" />
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>No active roadmaps found</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px' }}>
              Create your first learning track to unlock personalized lessons, quizzes, and milestone tracking.
            </p>
            <button 
              onClick={() => navigate('/roadmap')}
              style={{
                width: 'auto',
                margin: '8px 0 0 0',
                padding: '10px 20px',
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              Generate First Roadmap
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {plans.map(p => (
              <div 
                key={p._id} 
                className="glass-card hover-lift" 
                style={{ padding: '24px', borderRadius: '12px' }}
              >
                {/* Module Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700' }}>
                      {p.topic}
                    </h3>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {p.steps.filter(s => s.isDone).length} of {p.steps.length} milestones complete
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span 
                      style={{ 
                        fontSize: '13px', 
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: p.progress === 100 ? 'rgba(34, 197, 94, 0.15)' : 'var(--primary-light)',
                        color: p.progress === 100 ? '#16a34a' : 'var(--primary)',
                        border: `1px solid ${p.progress === 100 ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-accent)'}`
                      }}
                    >
                      {p.progress}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div 
                  style={{ 
                    width: '100%', 
                    height: '6px', 
                    background: 'var(--border-color)', 
                    borderRadius: '3px', 
                    overflow: 'hidden',
                    marginBottom: '18px'
                  }}
                >
                  <div 
                    style={{ 
                      width: `${p.progress}%`, 
                      height: '100%', 
                      background: p.progress === 100 
                        ? 'linear-gradient(90deg, #10b981, #22c55e)' 
                        : 'linear-gradient(90deg, var(--primary), #8b5cf6)',
                      borderRadius: '3px',
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} 
                  />
                </div>

                {/* Steps List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.steps.map((s, index) => (
                    <div 
                      key={s._id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '12px 14px', 
                        borderRadius: '8px',
                        background: s.isDone ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-color)',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {s.isDone ? (
                          <CheckCircle2 size={18} color="#16a34a" />
                        ) : (
                          <div 
                            style={{ 
                              width: '18px', 
                              height: '18px', 
                              borderRadius: '50%', 
                              border: '2px solid var(--border-color)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: '700',
                              color: 'var(--text-muted)'
                            }}
                          >
                            {index + 1}
                          </div>
                        )}
                        <span 
                          style={{ 
                            fontSize: '14px',
                            fontWeight: s.isDone ? '400' : '500',
                            textDecoration: s.isDone ? 'line-through' : 'none',
                            color: s.isDone ? 'var(--text-muted)' : 'var(--text-color)',
                            opacity: s.isDone ? 0.75 : 1
                          }}
                        >
                          {s.title}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button 
                          type="button"
                          onClick={() => getLesson(s.title)} 
                          title="Generate AI Lesson"
                          style={{ 
                            width: 'auto', 
                            margin: 0, 
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            borderRadius: '6px',
                            background: 'var(--glass-bg)',
                            color: 'var(--text-color)',
                            border: '1px solid var(--border-color)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <BookOpen size={13} />
                          <span>Lesson</span>
                        </button>

                        <button 
                          type="button"
                          onClick={() => getQuiz(s.title)} 
                          title="Practice Quiz"
                          style={{ 
                            width: 'auto', 
                            margin: 0, 
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            borderRadius: '6px',
                            background: 'var(--glass-bg)',
                            color: 'var(--text-color)',
                            border: '1px solid var(--border-color)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <HelpCircle size={13} />
                          <span>Quiz</span>
                        </button>

                        {!s.isDone && (
                          <button 
                            type="button"
                            onClick={() => markDone(p._id, s._id)} 
                            title="Mark as Completed"
                            style={{ 
                              width: 'auto', 
                              margin: 0, 
                              padding: '6px 12px',
                              fontSize: '12px',
                              fontWeight: '600',
                              borderRadius: '6px',
                              background: 'var(--primary)',
                              color: '#ffffff',
                              border: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Check size={13} />
                            <span>Done</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {lessonData && <LessonModal content={lessonData} onClose={() => setLessonData(null)} />}
      {quizData && quizData.length > 0 && <QuizModal quizData={quizData} onClose={() => setQuizData(null)} />}
    </div>
  );
};

export default DashboardPage;
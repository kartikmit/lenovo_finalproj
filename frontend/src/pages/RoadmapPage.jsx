import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ExternalLink, 
  Compass, 
  Layers, 
  HelpCircle, 
  Check, 
  ArrowRight
} from 'lucide-react';
import api from '../utils/axios.js';
import LessonModal from '../components/learning/LessonModal.jsx';
import QuizModal from '../components/learning/QuizModal.jsx';

const RoadmapPage = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [lessonData, setLessonData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    try {
      const res = await api.get('/roadmaps');
      setPlans(res.data);
      if (res.data.length > 0 && !selectedPlanId) {
        setSelectedPlanId(res.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

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

  const markStepDone = async (planId, stepId) => {
    try {
      await api.put('/roadmaps/update', { planId, stepId });
      const res = await api.get('/roadmaps');
      setPlans(res.data);
      toast.success('Milestone completed!');
    } catch (err) {
      toast.error('Failed to update milestone');
    }
  };

  const getLesson = async (stepTitle) => {
    const toastId = toast.loading('Generating lesson...');
    try {
      const res = await api.post('/learn/lesson', { topic: stepTitle });
      setLessonData(res.data.content);
    } catch (err) {
      toast.error('Failed to generate lesson');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const getQuiz = async (stepTitle) => {
    const toastId = toast.loading('Building quiz...');
    try {
      const res = await api.post('/learn/quiz', { topic: stepTitle });
      setQuizData(res.data);
    } catch (err) {
      toast.error('Failed to build quiz');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const toggleStepExpand = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const popularTopics = [
    'Full-Stack React & Node.js',
    'System Design & Microservices',
    'Python for Machine Learning',
    'DevOps, Docker & Kubernetes',
    'TypeScript Mastery'
  ];

  const selectedPlan = plans.find(p => p._id === selectedPlanId) || plans[0];

  return (
    <div className="animate-fade-in" style={{ padding: '32px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Interactive Roadmap
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
            Follow your personalized curriculum milestone by milestone, track your progress, and explore curated subtasks.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
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
          {showCreateForm ? <Layers size={17} /> : <Plus size={17} />}
          <span>{showCreateForm ? 'View Active Roadmap' : 'New Roadmap'}</span>
        </button>
      </div>

      {/* Generator Card (collapsible or shown when no plans exist or when user clicks New Roadmap) */}
      {(showCreateForm || plans.length === 0) && (
        <div 
          className="glass-card" 
          style={{ 
            padding: '28px', 
            borderRadius: '14px', 
            marginBottom: '32px',
            border: '1px solid var(--border-accent)',
            boxShadow: '0 8px 30px var(--primary-glow)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>AI Roadmap Generator</h2>
              <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                Enter any skill, topic, or career goal to generate an adaptive step-by-step curriculum.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
            <input 
              value={topic} 
              onChange={e => setTopic(e.target.value)} 
              placeholder="e.g. Next.js 15 App Router, Golang Concurrency, PostgreSQL..." 
              style={{ flex: 1, minWidth: '240px', margin: 0 }}
              onKeyDown={e => { if (e.key === 'Enter') generate(); }}
            />
            <button 
              onClick={generate} 
              disabled={loading || !topic.trim()}
              style={{ 
                width: 'auto', 
                margin: 0, 
                padding: '0 24px', 
                height: '46px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                opacity: loading || !topic.trim() ? 0.6 : 1
              }}
            >
              {loading ? <Clock size={16} className="animate-spin" /> : <Sparkles size={16} />}
              <span>{loading ? 'Generating Path...' : 'Generate Roadmap'}</span>
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginRight: '8px' }}>
              Suggestions:
            </span>
            <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              {popularTopics.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTopic(item)}
                  style={{
                    width: 'auto',
                    margin: 0,
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                    borderRadius: '16px',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roadmap Selector Tabs (if multiple plans exist) */}
      {plans.length > 1 && !showCreateForm && (
        <div 
          style={{ 
            display: 'flex', 
            gap: '8px', 
            overflowX: 'auto', 
            paddingBottom: '12px', 
            marginBottom: '20px' 
          }}
        >
          {plans.map(p => {
            const isSelected = p._id === selectedPlan?._id;
            return (
              <button
                key={p._id}
                type="button"
                onClick={() => setSelectedPlanId(p._id)}
                style={{
                  width: 'auto',
                  margin: 0,
                  padding: '8px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: isSelected ? '600' : '500',
                  borderRadius: '10px',
                  background: isSelected ? 'var(--primary-light)' : 'var(--glass-bg)',
                  color: isSelected ? 'var(--primary)' : 'var(--text-color)',
                  border: isSelected ? '1px solid var(--border-accent)' : '1px solid var(--border-color)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Compass size={15} />
                <span>{p.topic}</span>
                <span 
                  style={{ 
                    fontSize: '11px', 
                    padding: '2px 6px', 
                    borderRadius: '10px', 
                    background: p.progress === 100 ? 'rgba(34, 197, 94, 0.2)' : 'var(--border-color)',
                    color: p.progress === 100 ? '#16a34a' : 'inherit'
                  }}
                >
                  {p.progress}%
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Active Roadmap Timeline Section */}
      {selectedPlan && !showCreateForm && (
        <div>
          {/* Roadmap Overview Hero Card */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '24px', 
              borderRadius: '14px', 
              marginBottom: '32px' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Current Track
                </span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: '800' }}>
                  {selectedPlan.topic}
                </h2>
              </div>
              
              {/* Overall Status Badge */}
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  background: selectedPlan.progress === 100 
                    ? 'rgba(34, 197, 94, 0.15)' 
                    : selectedPlan.progress > 0 
                      ? 'var(--primary-light)' 
                      : 'rgba(148, 163, 184, 0.15)',
                  color: selectedPlan.progress === 100 
                    ? '#16a34a' 
                    : selectedPlan.progress > 0 
                      ? 'var(--primary)' 
                      : 'var(--text-muted)',
                  border: `1px solid ${
                    selectedPlan.progress === 100 
                      ? 'rgba(34, 197, 94, 0.3)' 
                      : selectedPlan.progress > 0 
                        ? 'var(--border-accent)' 
                        : 'var(--border-color)'
                  }`
                }}
              >
                {selectedPlan.progress === 100 ? (
                  <>
                    <CheckCircle2 size={15} />
                    <span>Track Completed</span>
                  </>
                ) : selectedPlan.progress > 0 ? (
                  <>
                    <Clock size={15} />
                    <span>In Progress ({selectedPlan.progress}%)</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Not Started (0%)</span>
                  </>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div 
              style={{ 
                width: '100%', 
                height: '8px', 
                background: 'var(--border-color)', 
                borderRadius: '4px', 
                overflow: 'hidden' 
              }}
            >
              <div 
                style={{ 
                  width: `${selectedPlan.progress}%`, 
                  height: '100%', 
                  background: selectedPlan.progress === 100 
                    ? 'linear-gradient(90deg, #10b981, #22c55e)' 
                    : 'linear-gradient(90deg, var(--primary), #8b5cf6)',
                  borderRadius: '4px',
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>{selectedPlan.steps?.filter(s => s.isDone).length} of {selectedPlan.steps?.length} milestones finished</span>
              <span>{selectedPlan.progress}% Total Mastery</span>
            </div>
          </div>

          {/* Interactive Vertical Timeline */}
          <div style={{ position: 'relative', paddingLeft: '20px' }}>
            {/* Timeline Connecting Line */}
            <div 
              style={{ 
                position: 'absolute', 
                left: '37px', 
                top: '24px', 
                bottom: '24px', 
                width: '3px', 
                background: 'linear-gradient(180deg, var(--primary) 0%, var(--border-color) 100%)',
                borderRadius: '2px'
              }} 
            />

            {/* Timeline Steps / Milestones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {selectedPlan.steps?.map((step, index) => {
                const isCompleted = step.isDone;
                // A step is considered "In Progress" if it is the first unfinished step
                const firstPendingIndex = selectedPlan.steps.findIndex(s => !s.isDone);
                const isInProgress = !isCompleted && index === firstPendingIndex;
                const isLocked = !isCompleted && !isInProgress;

                const isExpanded = expandedSteps[step._id] ?? (isInProgress || index === 0);

                let statusBadge = {
                  label: 'Completed',
                  icon: CheckCircle2,
                  bg: 'rgba(34, 197, 94, 0.12)',
                  color: '#16a34a',
                  border: 'rgba(34, 197, 94, 0.3)'
                };

                if (isInProgress) {
                  statusBadge = {
                    label: 'In Progress',
                    icon: Clock,
                    bg: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'var(--border-accent)'
                  };
                } else if (isLocked) {
                  statusBadge = {
                    label: 'Locked',
                    icon: Lock,
                    bg: 'rgba(148, 163, 184, 0.12)',
                    color: 'var(--text-muted)',
                    border: 'var(--border-color)'
                  };
                }

                const StatusIcon = statusBadge.icon;

                return (
                  <div 
                    key={step._id} 
                    style={{ 
                      position: 'relative', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '20px' 
                    }}
                  >
                    {/* Timeline Node Marker */}
                    <div 
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        flexShrink: 0,
                        zIndex: 2,
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: isCompleted 
                          ? '#16a34a' 
                          : isInProgress 
                            ? 'var(--primary)' 
                            : 'var(--card-bg-solid)',
                        color: isCompleted || isInProgress ? '#ffffff' : 'var(--text-muted)',
                        border: isLocked ? '2px solid var(--border-color)' : 'none',
                        boxShadow: isInProgress ? '0 0 12px var(--primary-glow)' : 'var(--shadow-sm)',
                        fontWeight: '700',
                        fontSize: '13px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isCompleted ? (
                        <Check size={18} strokeWidth={3} />
                      ) : isLocked ? (
                        <Lock size={15} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Milestone Card */}
                    <div 
                      className="glass-card hover-lift" 
                      style={{ 
                        flex: 1, 
                        padding: '20px', 
                        borderRadius: '12px',
                        borderLeft: isInProgress ? '4px solid var(--primary)' : isCompleted ? '4px solid #16a34a' : '1px solid var(--border-color)',
                        opacity: isLocked ? 0.85 : 1
                      }}
                    >
                      {/* Milestone Header */}
                      <div 
                        onClick={() => toggleStepExpand(step._id)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          cursor: 'pointer',
                          userSelect: 'none',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
                            MILESTONE {index + 1}
                          </span>
                          <h3 
                            style={{ 
                              margin: 0, 
                              fontSize: '16px', 
                              fontWeight: '700',
                              textDecoration: isCompleted ? 'line-through' : 'none',
                              color: isCompleted ? 'var(--text-muted)' : 'var(--text-color)'
                            }}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {/* Status Pill Badge */}
                          <span 
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '14px',
                              fontSize: '12px',
                              fontWeight: '600',
                              background: statusBadge.bg,
                              color: statusBadge.color,
                              border: `1px solid ${statusBadge.border}`
                            }}
                          >
                            <StatusIcon size={12} />
                            <span>{statusBadge.label}</span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleStepExpand(step._id); }}
                            style={{
                              width: 'auto',
                              margin: 0,
                              padding: '4px',
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer'
                            }}
                          >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Smooth Collapsible Section / Subtasks */}
                      {isExpanded && (
                        <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                          {step.description && (
                            <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                              {step.description}
                            </p>
                          )}

                          {/* Curated Resources (if any) */}
                          {step.resources && step.resources.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                                Recommended References:
                              </span>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {step.resources.map((res, rIdx) => (
                                  <a
                                    key={rIdx}
                                    href={res.startsWith('http') ? res : `https://${res}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '5px',
                                      fontSize: '12px',
                                      padding: '4px 10px',
                                      borderRadius: '6px',
                                      background: 'var(--glass-bg)',
                                      color: 'var(--primary)',
                                      border: '1px solid var(--border-color)',
                                      textDecoration: 'none'
                                    }}
                                  >
                                    <ExternalLink size={12} />
                                    <span>{res}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Subtask Checklist Actions */}
                          <div 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              flexWrap: 'wrap', 
                              gap: '10px',
                              background: 'rgba(255, 255, 255, 0.02)',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)'
                            }}
                          >
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                onClick={() => getLesson(step.title)}
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
                                  gap: '5px'
                                }}
                              >
                                <BookOpen size={14} />
                                <span>Study Lesson</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => getQuiz(step.title)}
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
                                  gap: '5px'
                                }}
                              >
                                <HelpCircle size={14} />
                                <span>Practice Quiz</span>
                              </button>
                            </div>

                            <div>
                              {!isCompleted ? (
                                <button
                                  type="button"
                                  onClick={() => markStepDone(selectedPlan._id, step._id)}
                                  style={{
                                    width: 'auto',
                                    margin: 0,
                                    padding: '7px 16px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    borderRadius: '6px',
                                    background: 'var(--primary)',
                                    color: '#ffffff',
                                    border: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 2px 8px var(--primary-glow)'
                                  }}
                                >
                                  <Check size={14} />
                                  <span>Mark Milestone as Done</span>
                                </button>
                              ) : (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '13px', fontWeight: '600' }}>
                                  <CheckCircle2 size={16} />
                                  <span>Completed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {lessonData && <LessonModal content={lessonData} onClose={() => setLessonData(null)} />}
      {quizData && quizData.length > 0 && <QuizModal quizData={quizData} onClose={() => setQuizData(null)} />}
    </div>
  );
};

export default RoadmapPage;
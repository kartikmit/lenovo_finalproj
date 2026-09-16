import { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Award, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

const QuizModal = ({ quizData, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAnswer = (idx) => {
    if (isAnswered) return; // Prevent double clicks
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === quizData[current].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Smooth auto-advance after showing instant feedback
    setTimeout(() => {
      if (current + 1 < quizData.length) {
        setCurrent(prev => prev + 1);
        setSelectedIdx(null);
        setIsAnswered(false);
      } else {
        setDone(true);
      }
    }, 850);
  };

  const handleRetry = () => {
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelectedIdx(null);
    setIsAnswered(false);
  };

  const currentQ = quizData && quizData[current];
  const progressPercent = quizData ? Math.round(((current + 1) / quizData.length) * 100) : 0;
  const letters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 1000, 
        background: 'rgba(0, 0, 0, 0.65)', 
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="glass-card animate-pop-in" 
        style={{ 
          background: 'var(--card-bg-solid)', 
          padding: '28px', 
          borderRadius: '16px', 
          maxWidth: '560px', 
          width: '100%',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingBottom: '16px', 
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                background: 'rgba(139, 92, 246, 0.12)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#8b5cf6' 
              }}
            >
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Knowledge Check</h3>
              {!done && (
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Question {current + 1} of {quizData.length}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close Quiz"
            aria-label="Close Quiz"
            style={{
              width: '32px',
              height: '32px',
              margin: 0,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              background: 'var(--glass-bg)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        {!done && (
          <div 
            style={{ 
              width: '100%', 
              height: '6px', 
              background: 'var(--border-color)', 
              borderRadius: '3px', 
              overflow: 'hidden',
              marginBottom: '20px' 
            }}
          >
            <div 
              style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--primary), #8b5cf6)',
                borderRadius: '3px',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>
        )}

        {/* Quiz Content */}
        {done ? (
          /* Results Screen */
          <div style={{ textAlign: 'center', padding: '20px 10px' }} className="animate-pop-in">
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: score === quizData.length ? 'rgba(34, 197, 94, 0.15)' : 'var(--primary-light)',
                color: score === quizData.length ? '#16a34a' : 'var(--primary)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto',
                boxShadow: '0 8px 24px var(--primary-glow)'
              }}
            >
              <Award size={32} />
            </div>

            <h2 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '800' }}>
              {score === quizData.length 
                ? 'Mastery Achieved! 🎉' 
                : score >= quizData.length / 2 
                  ? 'Great Job! 👏' 
                  : 'Keep Practicing! 💪'}
            </h2>
            <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)', fontSize: '14px' }}>
              You answered {score} out of {quizData.length} questions correctly ({Math.round((score / quizData.length) * 100)}%).
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleRetry}
                style={{
                  width: 'auto',
                  margin: 0,
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: 'var(--glass-bg)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={15} />
                <span>Retry Quiz</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  width: 'auto',
                  margin: 0,
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px var(--primary-glow)'
                }}
              >
                <span>Continue Learning</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          /* Question & Options Screen */
          currentQ && (
            <div className="animate-fade-in">
              <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', lineHeight: '1.5' }}>
                {currentQ.question}
              </h4>

              {/* Custom Radio/Check Pill Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedIdx === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  
                  let border = '1px solid var(--border-color)';
                  let bg = 'var(--glass-bg)';
                  let color = 'var(--text-color)';
                  let badgeBg = 'rgba(255, 255, 255, 0.06)';
                  let icon = null;

                  if (isAnswered) {
                    if (isCorrect) {
                      border = '1px solid #22c55e';
                      bg = 'rgba(34, 197, 94, 0.15)';
                      color = '#16a34a';
                      badgeBg = '#16a34a';
                      icon = <CheckCircle2 size={18} color="#16a34a" />;
                    } else if (isSelected) {
                      border = '1px solid #ef4444';
                      bg = 'rgba(239, 68, 68, 0.15)';
                      color = '#ef4444';
                      badgeBg = '#ef4444';
                      icon = <XCircle size={18} color="#ef4444" />;
                    } else {
                      bg = 'transparent';
                      color = 'var(--text-muted)';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        margin: 0,
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: bg,
                        color: color,
                        border: border,
                        fontSize: '14px',
                        fontWeight: isSelected ? '600' : '500',
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                        transform: isSelected ? 'scale(1.01)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span 
                          style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: badgeBg,
                            color: isAnswered && (isCorrect || isSelected) ? '#ffffff' : 'var(--text-color)',
                            border: '1px solid var(--border-color)',
                            flexShrink: 0
                          }}
                        >
                          {letters[idx] || idx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuizModal;
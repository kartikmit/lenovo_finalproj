import { useState } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';

const QuizModal = ({ quizData, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const handleAnswer = (idx) => {
    if (idx === quizData[current].correctIndex) setScore(score + 1);
    if (current + 1 < quizData.length) setCurrent(current + 1);
    else setDone(true);
  };
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="animate-fade-in" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0 }}>Quiz</h3>
          <FiX size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        {done ? (
          <div style={{ textAlign: 'center' }}>
            <FiCheckCircle size={50} color="green" />
            <h3>Score: {score} / {quizData.length}</h3>
          </div>
        ) : (
          <div>
            <p>{quizData[current].question}</p>
            {quizData[current].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ textAlign: 'left', background: 'var(--border-color)', color: 'var(--text-color)' }}>{opt}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default QuizModal;
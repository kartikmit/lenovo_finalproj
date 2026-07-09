import ReactMarkdown from 'react-markdown';
import { FiX } from 'react-icons/fi';

const LessonModal = ({ content, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="animate-fade-in" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ margin: 0 }}>AI Lesson</h3>
        <FiX size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
      </div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </div>
);
export default LessonModal;
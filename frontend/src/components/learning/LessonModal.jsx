import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, BookOpen, Sparkles, Check } from 'lucide-react';

const LessonModal = ({ content, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
          maxWidth: '680px', 
          width: '100%',
          maxHeight: '85vh', 
          overflowY: 'auto',
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
                background: 'var(--primary-light)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--primary)' 
              }}
            >
              <BookOpen size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>AI Structured Lesson</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Interactive curriculum guide</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close Lesson"
            aria-label="Close Lesson"
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

        {/* Content Body */}
        <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.7', color: 'var(--text-color)' }}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '20px 0 12px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>{children}</h1>,
              h2: ({ children }) => <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '18px 0 10px 0', color: 'var(--primary)' }}>{children}</h2>,
              h3: ({ children }) => <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '14px 0 8px 0' }}>{children}</h3>,
              p: ({ children }) => <p style={{ margin: '0 0 12px 0' }}>{children}</p>,
              ul: ({ children }) => <ul style={{ paddingLeft: '20px', margin: '0 0 14px 0' }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ paddingLeft: '20px', margin: '0 0 14px 0' }}>{children}</ol>,
              li: ({ children }) => <li style={{ marginBottom: '6px' }}>{children}</li>,
              code: ({ inline, children, ...props }) => inline ? (
                <code style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px' }} {...props}>
                  {children}
                </code>
              ) : (
                <pre style={{ background: 'rgba(0,0,0,0.06)', padding: '12px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', border: '1px solid var(--border-color)' }}>
                  <code>{children}</code>
                </pre>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div 
          style={{ 
            marginTop: '24px', 
            paddingTop: '16px', 
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 'auto',
              margin: 0,
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Check size={16} />
            <span>Finished Reading</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageSquare, 
  Lightbulb, 
  CornerDownLeft 
} from 'lucide-react';
import { useChat } from '../hooks/useChat.js';

const PROMPT_STARTERS = [
  'Explain the difference between useEffect and useLayoutEffect',
  'How do indexes optimize MongoDB query performance?',
  'Give me a frontend system design mock interview question',
  'How do Docker multi-stage builds reduce image size?',
  'Write a clean TypeScript debounce hook with cancellation'
];

const ChatPage = () => {
  const [text, setText] = useState('');
  const { messages, isTyping, sendMessage } = useChat();
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-focus on mount and after sending
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Smooth scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!text.trim() || isTyping) return;
    sendMessage(text);
    setText('');
    inputRef.current?.focus();
  };

  const handleStarterClick = (prompt) => {
    sendMessage(prompt);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 20px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Header Card */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '16px 22px', 
          borderRadius: '14px', 
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff',
              boxShadow: '0 4px 12px var(--primary-glow)'
            }}
          >
            <Bot size={22} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>AI Tutor & Study Companion</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Online & Ready</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <Sparkles size={14} color="var(--primary)" />
          <span>Powered by GROQ AI</span>
        </div>
      </div>

      {/* Main Chat Container */}
      <div 
        className="glass-card" 
        style={{ 
          borderRadius: '14px', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '620px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        {/* Messages Feed */}
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '24px 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px' 
          }}
        >
          {/* Empty State with Suggestion Chips */}
          {messages.length === 0 && (
            <div 
              style={{ 
                margin: 'auto', 
                textAlign: 'center', 
                maxWidth: '520px', 
                padding: '20px 10px' 
              }}
            >
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  background: 'var(--primary-light)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--primary)',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 8px 20px var(--primary-glow)'
                }}
              >
                <Sparkles size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700' }}>
                How can I accelerate your learning?
              </h3>
              <p style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
                Ask code explanations, prepare for system design rounds, or debug complex syntax errors in real time.
              </p>

              {/* Starter Chips */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <Lightbulb size={14} color="var(--primary)" />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>
                    Quick prompt starters:
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {PROMPT_STARTERS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStarterClick(prompt)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        margin: 0,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'var(--card-bg-solid)',
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>{prompt}</span>
                      <CornerDownLeft size={14} color="var(--text-muted)" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rendered Messages */}
          {messages.map((m, i) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={i}
                className="animate-fade-in"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  gap: '10px'
                }}
              >
                {/* AI Avatar */}
                {!isUser && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0,
                      marginTop: '4px',
                      boxShadow: '0 2px 8px var(--primary-glow)'
                    }}
                  >
                    <Bot size={17} />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  style={{
                    maxWidth: '78%',
                    padding: '14px 18px',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: isUser
                      ? 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)'
                      : 'var(--card-bg-solid)',
                    color: isUser ? '#ffffff' : 'var(--text-color)',
                    border: isUser ? 'none' : '1px solid var(--border-color)',
                    boxShadow: isUser ? '0 4px 14px var(--primary-glow)' : 'var(--shadow-sm)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    wordBreak: 'break-word'
                  }}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p style={{ margin: '0 0 8px 0', lastChild: { margin: 0 } }}>{children}</p>,
                      code: ({ node, inline, className, children, ...props }) => {
                        return inline ? (
                          <code 
                            style={{ 
                              background: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)', 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              fontFamily: 'monospace',
                              fontSize: '13px' 
                            }} 
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <pre 
                            style={{ 
                              background: isUser ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)', 
                              padding: '10px 12px', 
                              borderRadius: '6px', 
                              overflowX: 'auto',
                              fontSize: '13px' 
                            }}
                          >
                            <code>{children}</code>
                          </pre>
                        );
                      }
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      flexShrink: 0,
                      marginTop: '4px',
                      border: '1px solid var(--border-accent)'
                    }}
                  >
                    <User size={17} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div 
              className="animate-fade-in" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}
              >
                <Bot size={17} />
              </div>
              <div 
                style={{ 
                  background: 'var(--card-bg-solid)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px 16px 16px 4px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="typing-indicator">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Footer */}
        <div 
          style={{ 
            padding: '16px 20px', 
            borderTop: '1px solid var(--border-color)', 
            background: 'var(--card-bg-solid)' 
          }}
        >
          {/* Quick Starter Chips Row (compact when conversation is active) */}
          {messages.length > 0 && (
            <div 
              style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                paddingBottom: '10px', 
                marginBottom: '6px' 
              }}
            >
              {PROMPT_STARTERS.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleStarterClick(prompt)}
                  style={{
                    width: 'auto',
                    margin: 0,
                    padding: '4px 10px',
                    borderRadius: '14px',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    fontSize: '11px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Integrated Input Form */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or request a code explanation..."
              disabled={isTyping}
              style={{
                margin: 0,
                padding: '14px 50px 14px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                border: '1px solid var(--border-color)'
              }}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || isTyping}
              title="Send Message"
              aria-label="Send Message"
              style={{
                position: 'absolute',
                right: '8px',
                width: '36px',
                height: '36px',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: text.trim() && !isTyping ? 'var(--primary)' : 'var(--border-color)',
                color: text.trim() && !isTyping ? '#ffffff' : 'var(--text-muted)',
                cursor: text.trim() && !isTyping ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                boxShadow: text.trim() && !isTyping ? '0 2px 8px var(--primary-glow)' : 'none'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
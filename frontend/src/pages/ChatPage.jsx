import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '../hooks/useChat.js';

const ChatPage = () => {
  const [text, setText] = useState('');
  const { messages, isTyping, sendMessage } = useChat();
  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <div style={{ background: 'var(--card-bg)', height: '400px', overflowY: 'auto', padding: '20px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{ display: 'inline-block', maxWidth: '80%', padding: '10px', background: m.role === 'user' ? 'var(--primary)' : 'var(--border-color)', color: m.role === 'user' ? '#fff' : 'var(--text-color)', borderRadius: '8px' }}>
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </span>
          </div>
        ))}
        {isTyping && <div className="typing-indicator"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Ask..." />
        <button onClick={() => { sendMessage(text); setText(''); }} style={{ width: 'auto' }}>Send</button>
      </div>
    </div>
  );
};
export default ChatPage;
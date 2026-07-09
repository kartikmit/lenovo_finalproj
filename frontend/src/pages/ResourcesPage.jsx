const ResourcesPage = () => (
  <div className="animate-fade-in" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
    <h2>Resources</h2>
    <div style={{ background: 'var(--card-bg)', padding: '20px', marginBottom: '10px' }}>
      <a href="https://react.dev" style={{ color: 'var(--primary)' }}>React Docs</a>
    </div>
    <div style={{ background: 'var(--card-bg)', padding: '20px' }}>
      <a href="https://developer.mozilla.org" style={{ color: 'var(--primary)' }}>MDN Web Docs</a>
    </div>
  </div>
);
export default ResourcesPage;
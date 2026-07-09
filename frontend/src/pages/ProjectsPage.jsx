const ProjectsPage = () => (
  <div className="animate-fade-in" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
    <h2>Projects</h2>
    <div style={{ background: 'var(--card-bg)', padding: '20px', marginBottom: '10px' }}>
      <h3>Portfolio Website</h3><p>Beginner | React</p>
    </div>
    <div style={{ background: 'var(--card-bg)', padding: '20px' }}>
      <h3>Task Manager API</h3><p>Advanced | Node, MongoDB</p>
    </div>
  </div>
);
export default ProjectsPage;
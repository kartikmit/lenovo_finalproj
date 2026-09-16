import { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  FolderGit2, 
  Sparkles, 
  ArrowUpRight, 
  Tag, 
  Layers 
} from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Modern Portfolio Website',
    level: 'Beginner',
    category: 'Frontend',
    description: 'Build a responsive personal developer portfolio featuring dark mode, project showcases, and contact integration.',
    technologies: ['React', 'Vite', 'CSS Modules', 'Responsive UI'],
    link: 'https://github.com',
    linkText: 'View Template'
  },
  {
    id: 2,
    title: 'Task Manager REST API',
    level: 'Advanced',
    category: 'Backend',
    description: 'Design a high-throughput RESTful API with user authentication, role-based access control, and query pagination.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    link: 'https://github.com',
    linkText: 'API Spec'
  },
  {
    id: 3,
    title: 'AI Code Explainer & Reviewer',
    level: 'Intermediate',
    category: 'AI / ML',
    description: 'An interactive developer tool that parses complex code blocks and generates natural language explanations and security audits.',
    technologies: ['React', 'OpenAI / Gemini API', 'Tailwind', 'Node.js'],
    link: 'https://github.com',
    linkText: 'Explore Demo'
  },
  {
    id: 4,
    title: 'Real-Time Collaborative Whiteboard',
    level: 'Advanced',
    category: 'Full-Stack',
    description: 'Synchronized multi-user drawing board with vector shapes, live user cursors, and presence indicators.',
    technologies: ['React', 'WebSockets', 'Canvas API', 'Redis'],
    link: 'https://github.com',
    linkText: 'Project Guide'
  },
  {
    id: 5,
    title: 'DevOps CI/CD & Monitoring Stack',
    level: 'Intermediate',
    category: 'DevOps',
    description: 'Automated container build pipelines with linting, integration tests, and live health telemetry dashboards.',
    technologies: ['Docker', 'GitHub Actions', 'Prometheus', 'Grafana'],
    link: 'https://github.com',
    linkText: 'Pipeline Repo'
  },
  {
    id: 6,
    title: 'Interactive E-Commerce Checkout',
    level: 'Intermediate',
    category: 'Full-Stack',
    description: 'Full-featured checkout flow with cart state persistence, discount code validation, and Stripe webhook handling.',
    technologies: ['React', 'Stripe API', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com',
    linkText: 'View Source'
  }
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full-Stack', 'AI / ML', 'DevOps'];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.level.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const getLevelBadgeStyle = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return {
          bg: 'rgba(34, 197, 94, 0.12)',
          color: '#16a34a',
          border: 'rgba(34, 197, 94, 0.3)'
        };
      case 'intermediate':
        return {
          bg: 'rgba(59, 130, 246, 0.12)',
          color: '#2563eb',
          border: 'rgba(59, 130, 246, 0.3)'
        };
      case 'advanced':
      default:
        return {
          bg: 'rgba(168, 85, 247, 0.12)',
          color: '#9333ea',
          border: 'rgba(168, 85, 247, 0.3)'
        };
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '32px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <FolderGit2 size={20} />
          </div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Curated Projects
          </h1>
        </div>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
          Put your skills into practice with industry-grade challenges across frontend, backend, and full-stack architecture.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '28px' 
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Embedded Search Input */}
          <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
            <Search 
              size={18} 
              color="var(--text-muted)" 
              style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, technologies, or levels..."
              style={{
                margin: 0,
                padding: '12px 14px 12px 42px',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    width: 'auto',
                    margin: 0,
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: isActive ? '600' : '500',
                    background: isActive ? 'var(--primary)' : 'var(--glass-bg)',
                    color: isActive ? '#ffffff' : 'var(--text-color)',
                    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 2px 8px var(--primary-glow)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div 
          className="glass-card" 
          style={{ 
            padding: '48px 20px', 
            textAlign: 'center', 
            borderRadius: '12px' 
          }}
        >
          <FolderGit2 size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '600' }}>No matching projects found</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
            Try adjusting your search keywords or switching category filters.
          </p>
        </div>
      ) : (
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '20px' 
          }}
        >
          {filteredProjects.map((project) => {
            const levelStyle = getLevelBadgeStyle(project.level);
            return (
              <div
                key={project.id}
                className="glass-card hover-lift"
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-color)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: levelStyle.bg,
                        color: levelStyle.color,
                        border: `1px solid ${levelStyle.border}`
                      }}
                    >
                      {project.level}
                    </span>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <Tag size={12} />
                      <span>{project.category}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700' }}>
                    {project.title}
                  </h3>
                  <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {project.description}
                  </p>

                  {/* Technology Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          border: '1px solid var(--border-accent)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Link Action */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-color)';
                  }}
                >
                  <span>{project.linkText}</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
import { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  Globe, 
  ArrowUpRight, 
  Terminal, 
  Database, 
  Layers, 
  FileCode2,
  Tag 
} from 'lucide-react';

const RESOURCES_DATA = [
  {
    id: 1,
    title: 'React Official Documentation',
    category: 'Frontend',
    iconType: 'react',
    description: 'The definitive guide to modern React, covering Server Components, Hooks, Concurrent Rendering, and best practices.',
    url: 'https://react.dev',
    technologies: ['React 18', 'Hooks', 'Architecture', 'UI']
  },
  {
    id: 2,
    title: 'MDN Web Docs',
    category: 'Web Standards',
    iconType: 'web',
    description: 'Comprehensive references, tutorials, and specifications for JavaScript, CSS3, semantic HTML, and standard Web APIs.',
    url: 'https://developer.mozilla.org',
    technologies: ['JavaScript', 'CSS3', 'HTML5', 'Web APIs']
  },
  {
    id: 3,
    title: 'TypeScript Official Handbook',
    category: 'Language',
    iconType: 'ts',
    description: 'Master strict typing, generics, conditional types, utility types, and compiler configuration for scalable codebases.',
    url: 'https://www.typescriptlang.org/docs/',
    technologies: ['TypeScript', 'Static Types', 'Generics', 'Tooling']
  },
  {
    id: 4,
    title: 'Node.js Documentation & Guides',
    category: 'Backend',
    iconType: 'node',
    description: 'Deep dive into asynchronous I/O, the V8 event loop, buffers, streams, native modules, and server performance.',
    url: 'https://nodejs.org/docs',
    technologies: ['Node.js', 'V8 Engine', 'Event Loop', 'APIs']
  },
  {
    id: 5,
    title: 'Vite Next-Gen Tooling Guide',
    category: 'Dev Tools',
    iconType: 'vite',
    description: 'Blazing fast frontend tooling leveraging native ES modules, instant HMR, Rollup bundling, and plugin ecosystem.',
    url: 'https://vitejs.dev',
    technologies: ['Vite', 'Build Tools', 'ESM', 'HMR']
  },
  {
    id: 6,
    title: 'Tailwind CSS Documentation',
    category: 'Styling',
    iconType: 'tailwind',
    description: 'Utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    url: 'https://tailwindcss.com/docs',
    technologies: ['Tailwind CSS', 'Responsive', 'Design Tokens']
  },
  {
    id: 7,
    title: 'MongoDB Manual & University',
    category: 'Database',
    iconType: 'database',
    description: 'Official guides for NoSQL document modeling, indexing strategies, aggregation pipelines, and high availability.',
    url: 'https://www.mongodb.com/docs/',
    technologies: ['MongoDB', 'NoSQL', 'Aggregation', 'Atlas']
  },
  {
    id: 8,
    title: 'Docker Guides & Reference',
    category: 'DevOps',
    iconType: 'devops',
    description: 'Containerization principles, multi-stage Dockerfiles, Docker Compose networking, and lightweight image optimization.',
    url: 'https://docs.docker.com',
    technologies: ['Docker', 'Containers', 'Compose', 'CI/CD']
  }
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Web Standards', 'Language', 'Database', 'DevOps', 'Dev Tools'];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = RESOURCES_DATA.filter((resource) => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.category.toLowerCase().includes(query) ||
      resource.technologies.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (iconType) => {
    switch (iconType) {
      case 'react':
      case 'vite':
        return <Layers size={18} color="var(--primary)" />;
      case 'node':
        return <Terminal size={18} color="#16a34a" />;
      case 'database':
        return <Database size={18} color="#10b981" />;
      case 'web':
        return <Globe size={18} color="#6366f1" />;
      case 'ts':
        return <FileCode2 size={18} color="#3b82f6" />;
      default:
        return <BookOpen size={18} color="var(--primary)" />;
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '32px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <BookOpen size={20} />
          </div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Developer Resources
          </h1>
        </div>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
          Curated documentation, official handbooks, and references to accelerate your mastery across modern web technologies.
        </p>
      </div>

      {/* Search & Filter Card */}
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
              placeholder="Search documentation, frameworks, or languages..."
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

      {/* Resources Card Grid */}
      {filteredResources.length === 0 ? (
        <div 
          className="glass-card" 
          style={{ 
            padding: '48px 20px', 
            textAlign: 'center', 
            borderRadius: '12px' 
          }}
        >
          <BookOpen size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '600' }}>No matching resources found</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
            Try adjusting your search terms or selecting a different category.
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
          {filteredResources.map((item) => (
            <div
              key={item.id}
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
                {/* Header with Category Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {getResourceIcon(item.iconType)}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      border: '1px solid var(--border-accent)'
                    }}
                  >
                    Official Docs
                  </span>
                </div>

                {/* Title & Description */}
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700' }}>
                  {item.title}
                </h3>
                <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {item.description}
                </p>

                {/* Technology Badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Link Button */}
              <a
                href={item.url}
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
                <span>Visit Documentation</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
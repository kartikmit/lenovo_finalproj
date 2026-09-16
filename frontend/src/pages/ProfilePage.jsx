import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Shield, 
  Award, 
  Trophy, 
  Sparkles, 
  Flame, 
  Zap, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Compass, 
  ArrowRight, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Pathfinder',
    description: 'Initialized personalized AI learning roadmaps',
    icon: Compass,
    color: '#3b82f6',
    status: 'Unlocked'
  },
  {
    id: 2,
    title: 'Scholar',
    description: 'Generated interactive AI lessons across topics',
    icon: BookOpen,
    color: '#10b981',
    status: 'Unlocked'
  },
  {
    id: 3,
    title: 'Quiz Champion',
    description: 'Tested knowledge mastery with practice quizzes',
    icon: Award,
    color: '#8b5cf6',
    status: 'Unlocked'
  },
  {
    id: 4,
    title: 'Code Builder',
    description: 'Selected and explored real-world portfolio challenges',
    icon: Zap,
    color: '#f59e0b',
    status: 'Unlocked'
  },
  {
    id: 5,
    title: 'Consistency Flame',
    description: 'Maintained active continuous learning streak',
    icon: Flame,
    color: '#ef4444',
    status: 'In Progress'
  },
  {
    id: 6,
    title: 'Platform Master',
    description: 'Demonstrated advanced technical proficiency',
    icon: Trophy,
    color: '#06b6d4',
    status: 'In Progress'
  }
];

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const isAdmin = user.level === 'Admin';

  return (
    <div className="animate-fade-in" style={{ padding: '32px 20px', maxWidth: '960px', margin: '0 auto' }}>
      {/* User Card Header */}
      <div 
        className="glass-card hover-lift" 
        style={{ 
          padding: '32px', 
          borderRadius: '16px', 
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Avatar Circle with Initials & Gradient Ring */}
          <div 
            style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff', 
              fontSize: '24px', 
              fontWeight: '800',
              boxShadow: '0 8px 24px var(--primary-glow)',
              border: '3px solid var(--card-bg-solid)'
            }}
          >
            {initials}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>
                {user.name}
              </h1>
              <span 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: '14px',
                  background: isAdmin ? 'rgba(239, 68, 68, 0.15)' : 'var(--primary-light)',
                  color: isAdmin ? '#ef4444' : 'var(--primary)',
                  border: `1px solid ${isAdmin ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-accent)'}`
                }}
              >
                {user.level}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', color: 'var(--text-muted)', fontSize: '14px' }}>
              <Mail size={15} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              width: 'auto',
              margin: 0,
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Dashboard</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            style={{
              width: 'auto',
              margin: 0,
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              background: 'var(--glass-bg)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Account Metadata Summary Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '16px', 
          marginBottom: '32px' 
        }}
      >
        <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>
            <GraduationCap size={16} color="var(--primary)" />
            <span>LEARNING TIER</span>
          </div>
          <h3 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: '700' }}>{user.level} Level</h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Curriculum automatically tailored</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>
            <Shield size={16} color="#10b981" />
            <span>SECURITY STATUS</span>
          </div>
          <h3 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: '700' }}>Authenticated</h3>
          <span style={{ fontSize: '12px', color: '#10b981' }}>Secure session active</span>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>
            <Sparkles size={16} color="#8b5cf6" />
            <span>AI TUTOR ACCESS</span>
          </div>
          <h3 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: '700' }}>Unlimited</h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time generative study</span>
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Trophy size={20} color="var(--primary)" />
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
            Milestones & Achievements
          </h2>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '16px' 
          }}
        >
          {ACHIEVEMENTS.map((item) => {
            const Icon = item.icon;
            const isUnlocked = item.status === 'Unlocked';
            return (
              <div
                key={item.id}
                className="glass-card hover-lift"
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  border: isUnlocked ? '1px solid var(--border-accent)' : '1px solid var(--border-color)',
                  opacity: isUnlocked ? 1 : 0.8
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `${item.color}1a`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0
                  }}
                >
                  <Icon size={22} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700' }}>{item.title}</h4>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: isUnlocked ? 'rgba(34, 197, 94, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                        color: isUnlocked ? '#16a34a' : 'var(--text-muted)'
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
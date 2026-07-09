import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <div className="animate-fade-in" style={{ padding: '30px', maxWidth: '500px', margin: '0 auto', textAlign: 'center', background: 'var(--card-bg)' }}>
      <h2>{user.name}</h2><p>{user.email}</p><p>Level: {user.level}</p>
    </div>
  );
};
export default ProfilePage;
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Dashboard() {
  const { user } = useContext(UserContext);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Role: {user.role}</p>
    </div>
  );
}
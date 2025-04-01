import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/workouts">Workouts</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/nutrition">Nutrition</Link>
    </nav>
  );
}
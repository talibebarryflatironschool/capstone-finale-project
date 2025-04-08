import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function NavBar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={location.pathname} // Animate on route change
    >
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/workouts">Workouts</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/nutrition">Nutrition</Link>
    </motion.nav>
  );
}
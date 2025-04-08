import { motion } from 'framer-motion';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'

export default function Dashboard() {
  const { user } = useContext(UserContext)
  console.log (user)
  if (!user) return <h2>Loading...</h2>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Welcome, {user.name}!</h1>
      <p>Role: {user.role}</p>
    </motion.div>
  );
}
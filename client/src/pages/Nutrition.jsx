import { useEffect, useState } from 'react';
import NutritionForm from '../components/NutritionForm';
import { motion } from 'framer-motion'

export default function Nutrition() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/nutrition')
      .then(r => r.json())
      .then(setLogs);
  }, []);

  const handleAddLog = newLog => {
    setLogs([...logs, newLog]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Nutrition Logs</h2>
      <NutritionForm onAdd={handleAddLog} />
      <ul>
        {logs.map(log => (
          <motion.li
            key={log.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {log.date} - {log.meal_type} - {log.calories} cal
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
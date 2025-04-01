import { useEffect, useState } from 'react';
import NutritionForm from '../components/NutritionForm';

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
    <div>
      <h2>Nutrition Logs</h2>
      <NutritionForm onAdd={handleAddLog} />
      <ul>
        {logs.map(log => (
          <li key={log.id}>{log.date} - {log.meal_type} - {log.calories} cal</li>
        ))}
      </ul>
    </div>
  );
}
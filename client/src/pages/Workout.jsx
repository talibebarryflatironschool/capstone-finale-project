import { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('/workouts')
      .then(r => r.json())
      .then(setWorkouts);
  }, []);

  const handleAddWorkout = newWorkout => {
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <div>
      <h2>Workouts</h2>
      <WorkoutForm onAdd={handleAddWorkout} />
      <ul>
        {workouts.map(w => (
          <li key={w.id}>{w.date} - {w.workout_type} - {w.duration}min</li>
        ))}
      </ul>
    </div>
  );
}
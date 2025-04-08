// import { useEffect, useState } from 'react';
// import WorkoutForm from '../components/WorkoutForm';
// import { motion } from 'framer-motion';

// export default function Workouts() {
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     fetch('/workouts')
//       .then(r => r.json())
//       .then(setWorkouts);
//   }, []);

//   const handleAddWorkout = newWorkout => {
//     setWorkouts([...workouts, newWorkout]);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2>Workouts</h2>
//       <WorkoutForm onAdd={handleAddWorkout} />
//       <ul>
//         {workouts.map(w => (
//           <motion.li
//             key={w.id}
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//           >
//             <p>{w.date} - {w.workout_type} - {w.duration}min</p>
//             <button>delete</button>
//             <button>update</button>
//           </motion.li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// }



import { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import { motion } from 'framer-motion';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  // Fetch all workouts on mount
  useEffect(() => {
    fetch('/workouts')
      .then(r => r.json())
      .then(setWorkouts);
  }, []);

  // Handle adding a new workout (called by WorkoutForm)
  const handleAddWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  // Handle deleting a workout
  function handleDeleteWorkout(id) {
    fetch(`/workouts/${id}`, {
      method: 'DELETE',
      credentials: 'include',  // if you're using session-based auth
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete workout');
        }
        // Remove the deleted workout from state
        setWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w.id !== id));
      })
      .catch((err) => console.error(err));
  }

  // Handle updating a workout (basic example: prompt user for new duration)
  function handleUpdateWorkout(workout) {
    const newDuration = prompt('Enter a new duration (minutes):', workout.duration);
    if (!newDuration) return; // user canceled or entered empty

    fetch(`/workouts/${workout.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // if you're using session-based auth
      body: JSON.stringify({ duration: parseInt(newDuration, 10) }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update workout');
        }
        return res.json();
      })
      .then((updatedWorkout) => {
        // Replace the old item in state with the updated one
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((w) => (w.id === updatedWorkout.id ? updatedWorkout : w))
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Workouts</h2>
      {/* Form for adding workouts */}
      <WorkoutForm onAdd={handleAddWorkout} />

      <ul>
        {workouts.map((w) => (
          <motion.li
            key={w.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p>
              {w.date} - {w.workout_type} - {w.duration} min
              {w.notes ? ` (${w.notes})` : null}
            </p>
            <button onClick={() => handleDeleteWorkout(w.id)}>delete</button>
            <button onClick={() => handleUpdateWorkout(w)}>update</button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

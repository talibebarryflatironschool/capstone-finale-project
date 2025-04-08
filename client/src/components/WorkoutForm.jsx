// import { useState, useContext } from 'react';
// import { UserContext } from '../context/UserContext'

// export default function WorkoutForm({ onAdd }) {
//   const { user } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     workout_type: '',
//     duration: '',
//     notes: '',
//   });

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     fetch('/workouts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...formData, user_id: user.id, date: new Date().toISOString().split('T')[0] })
//     })
//       .then(r => r.json())
//       .then(onAdd);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="workout_type" placeholder="Type" onChange={handleChange} />
//       <input name="duration" type="number" placeholder="Minutes" onChange={handleChange} />
//       <input name="notes" placeholder="Notes" onChange={handleChange} />
//       <button type="submit">Add Workout</button>
//     </form>
//   );
// }




// WorkoutForm.jsx
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function WorkoutForm({ onAdd }) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    workout_type: '',
    duration: '',
    notes: ''
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      // No user logged in!
      setError('Please log in before adding workouts.');
      return;
    }
    fetch('/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...formData,
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
      }),
    })
      .then(r => {
        if (!r.ok) throw new Error('Server error');
        return r.json();
      })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          onAdd(data);
          // reset form
          setFormData({ workout_type: '', duration: '', notes: '' });
        }
      })
      .catch(err => setError(err.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        name="workout_type"
        value={formData.workout_type}
        onChange={handleChange}
        placeholder="Workout type"
      />
      <input
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration"
        type="number"
      />
      <input
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
      />
      <button type="submit">Add Workout</button>
    </form>
  );
}

import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function WorkoutForm({ onAdd }) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    workout_type: '',
    duration: '',
    notes: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user_id: user.id, date: new Date().toISOString().split('T')[0] })
    })
      .then(r => r.json())
      .then(onAdd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="workout_type" placeholder="Type" onChange={handleChange} />
      <input name="duration" type="number" placeholder="Minutes" onChange={handleChange} />
      <input name="notes" placeholder="Notes" onChange={handleChange} />
      <button type="submit">Add Workout</button>
    </form>
  );
}
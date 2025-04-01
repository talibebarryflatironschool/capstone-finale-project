import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function SkillForm({ onAdd }) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    skill_type: '',
    performance_score: '',
    notes: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user_id: user.id, date: new Date().toISOString().split('T')[0] })
    })
      .then(r => r.json())
      .then(onAdd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="skill_type" placeholder="Skill" onChange={handleChange} />
      <input name="performance_score" type="number" placeholder="Score" onChange={handleChange} />
      <input name="notes" placeholder="Notes" onChange={handleChange} />
      <button type="submit">Add Skill Session</button>
    </form>
  );
}
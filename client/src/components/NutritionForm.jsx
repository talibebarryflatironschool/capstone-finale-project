import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function NutritionForm({ onAdd }) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    meal_type: '', calories: '', protein: '', carbs: '', fats: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/nutrition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user_id: user.id, date: new Date().toISOString().split('T')[0] })
    })
      .then(r => r.json())
      .then(onAdd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="meal_type" placeholder="Meal Type" onChange={handleChange} />
      <input name="calories" type="number" placeholder="Calories" onChange={handleChange} />
      <input name="protein" type="number" placeholder="Protein" onChange={handleChange} />
      <input name="carbs" type="number" placeholder="Carbs" onChange={handleChange} />
      <input name="fats" type="number" placeholder="Fats" onChange={handleChange} />
      <button type="submit">Add Meal</button>
    </form>
  );
}
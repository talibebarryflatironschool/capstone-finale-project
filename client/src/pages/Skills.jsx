import { useEffect, useState } from 'react';
import SkillForm from '../components/SkillForm';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/skills')
      .then(r => r.json())
      .then(setSkills);
  }, []);

  const handleAddSkill = newSkill => {
    setSkills([...skills, newSkill]);
  };

  return (
    <div>
      <h2>Skill Sessions</h2>
      <SkillForm onAdd={handleAddSkill} />
      <ul>
        {skills.map(s => (
          <li key={s.id}>{s.date} - {s.skill_type} - {s.performance_score}%</li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from 'react';
import SkillForm from '../components/SkillForm';
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Skill Sessions</h2>
      <SkillForm onAdd={handleAddSkill} />
      <ul>
        {skills.map(s => (
          <motion.li
            key={s.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {s.date} - {s.skill_type} - {s.performance_score}% - {s.notes}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
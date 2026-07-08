import React from 'react';
import { skills } from '../data/skills';
import SkillBar from './SkillBar';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  // ✅ Add Theme Hook
  const { darkMode } = useTheme();

  return (
    // ✅ ADDED: Light/Dark mode background
    <section id="skills" className={`py-20 transition-colors duration-300
      ${darkMode ? 'bg-dark-950' : 'bg-gray-50'}`}>
      <div className="container-custom">
        <h2 className="section-title">
          My <span className="gradient-text">Skills</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* ✅ ADDED: Light/Dark mode card */}
          <div className={`backdrop-blur-sm p-6 rounded-xl transition-colors duration-300
            ${darkMode ? 'bg-dark-900/50' : 'bg-white/80 border border-gray-200/50'}`}>
            <h3 className="text-xl font-bold mb-6 text-center text-primary-400">
              🚀 Frontend
            </h3>
            <div className="space-y-4">
              {skills.frontend.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
          
          {/* ✅ ADDED: Light/Dark mode card */}
          <div className={`backdrop-blur-sm p-6 rounded-xl transition-colors duration-300
            ${darkMode ? 'bg-dark-900/50' : 'bg-white/80 border border-gray-200/50'}`}>
            <h3 className="text-xl font-bold mb-6 text-center text-primary-400">
              ⚙️ Backend
            </h3>
            <div className="space-y-4">
              {skills.backend.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
          
          {/* ✅ ADDED: Light/Dark mode card */}
          <div className={`backdrop-blur-sm p-6 rounded-xl transition-colors duration-300
            ${darkMode ? 'bg-dark-900/50' : 'bg-white/80 border border-gray-200/50'}`}>
            <h3 className="text-xl font-bold mb-6 text-center text-primary-400">
              🛠️ Tools & Others
            </h3>
            <div className="space-y-4">
              {skills.tools.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
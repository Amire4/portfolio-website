import React from 'react';
import { skills } from '../data/skills';
import SkillBar from './SkillBar';

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container-custom">
        <h2 className="section-title">
          My <span className="gradient-text">Skills</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-center text-primary-400">
              Frontend
            </h3>
            <div className="space-y-4">
              {skills.frontend.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
          
          <div className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-center text-primary-400">
              Backend
            </h3>
            <div className="space-y-4">
              {skills.backend.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
          
          <div className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-center text-primary-400">
              Tools & Others
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
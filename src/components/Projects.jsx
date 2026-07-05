import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { Code, Filter, Sparkles } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const resetAnimation = () => {
    setIsVisible(false);
    setHasAnimated(false);
  };

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
          if (!entry.isIntersecting && hasAnimated) {
            setIsVisible(false);
            setHasAnimated(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
        observer.disconnect();
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    resetAnimation();
    
    const handleHashChange = () => {
      if (window.location.hash === '#projects') {
        resetAnimation();
        setTimeout(() => {
          setHasAnimated(false);
          if (sectionRef.current) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasAnimated(true);
                  }
                });
              },
              { threshold: 0.1 }
            );
            observer.observe(sectionRef.current);
            return () => observer.disconnect();
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-dark-900/50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Effects */}
      <div className="absolute top-0 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="section-title flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary-400" />
            My <span className="gradient-text">Projects</span>
          </h2>
        </div>
        
        {/* Filter Buttons */}
        <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                  ${filter === category
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
                  }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {category === 'All' ? <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> All</span> : category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className={`text-center py-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, Code, Users, Rocket } from 'lucide-react';
// ✅ CHANGE THIS - Use named import with curly braces
import { experiences } from '../data/experience';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);

  // Company icons mapping
  const getCompanyIcon = (company) => {
    const icons = {
      'Google': <Rocket className="w-5 h-5" />,
      'Microsoft': <Code className="w-5 h-5" />,
      'Freelance': <Users className="w-5 h-5" />
    };
    return icons[company] || <Briefcase className="w-5 h-5" />;
  };

  // Company colors mapping
  const getCompanyColor = (company) => {
    const colors = {
      'Google': 'from-blue-500 to-cyan-400',
      'Microsoft': 'from-purple-500 to-pink-400',
      'Freelance': 'from-green-500 to-emerald-400'
    };
    return colors[company] || 'from-primary-500 to-primary-400';
  };

  // Reset animation function
  const resetAnimation = () => {
    setIsVisible(false);
    setHasAnimated(false);
    setActiveIndex(null);
  };

  // Intersection Observer for scroll animation
  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            if (experiences && experiences.length > 0) {
              experiences.forEach((_, index) => {
                setTimeout(() => {
                  setActiveIndex(index);
                }, index * 300 + 500);
              });
            }
          }
          if (!entry.isIntersecting && hasAnimated) {
            setIsVisible(false);
            setHasAnimated(false);
            setActiveIndex(null);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px'
      }
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

  // Reset animation on hash change
  useEffect(() => {
    resetAnimation();
    
    const handleHashChange = () => {
      if (window.location.hash === '#experience') {
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
                    if (experiences && experiences.length > 0) {
                      experiences.forEach((_, index) => {
                        setTimeout(() => {
                          setActiveIndex(index);
                        }, index * 300 + 500);
                      });
                    }
                  }
                });
              },
              { threshold: 0.15 }
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

  // Check if experiences data exists
  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="py-20 bg-dark-950">
        <div className="container-custom">
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-center text-gray-400">No experience data available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-dark-950 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container-custom relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            My professional journey working with leading tech companies
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 
            transform transition-all duration-1500"
            style={{ 
              height: isVisible ? '100%' : '0%',
              transitionDelay: '300ms'
            }}>
          </div>

          {experiences.map((exp, index) => {
            const isActive = activeIndex !== null && index <= activeIndex;
            const companyColor = getCompanyColor(exp.company);
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={exp.id} 
                className={`relative pl-16 pb-12 last:pb-0 transform transition-all duration-700
                  ${isVisible ? 'translate-x-0 opacity-100' : (isLeft ? '-translate-x-16' : 'translate-x-16')}
                  hover:translate-x-2 transition-all duration-500`}
                style={{ 
                  transitionDelay: `${index * 200 + 200}ms`,
                }}
              >
                <div className={`absolute left-0 top-2 w-6 h-6 rounded-full border-4 border-dark-950 
                  bg-gradient-to-r ${companyColor} shadow-lg shadow-primary-500/20
                  transform transition-all duration-500 ${isActive ? 'scale-100' : 'scale-0'}
                  ${isActive ? 'animate-pulse' : ''}`}
                  style={{ transitionDelay: `${index * 300 + 500}ms` }}>
                </div>

                <div className={`bg-dark-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 
                  transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/10
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ 
                    transitionDelay: `${index * 300 + 600}ms`,
                    borderColor: isActive ? 'rgba(96, 165, 250, 0.2)' : 'rgba(31, 41, 55, 0.5)'
                  }}>
                  
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${companyColor} p-2.5 
                        flex items-center justify-center text-white
                        transform transition-all duration-500 hover:rotate-12 hover:scale-110`}>
                        {getCompanyIcon(exp.company)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-primary-400 text-sm font-medium">{exp.company}</p>
                      </div>
                    </div>
                    
                    <span className={`text-sm px-4 py-1.5 rounded-full bg-dark-800 text-gray-300 
                      flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-primary-600/20
                      ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${index * 300 + 800}ms` }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <p className={`text-gray-300 leading-relaxed transition-all duration-500
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 300 + 900}ms` }}>
                    {exp.description}
                  </p>
                  
                  <div className={`flex flex-wrap gap-2 mt-4 transition-all duration-500
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 300 + 1000}ms` }}>
                    {exp.technologies && exp.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="text-xs bg-dark-800 text-gray-300 px-3 py-1.5 rounded-full 
                          transition-all duration-300 hover:bg-primary-600 hover:text-white 
                          hover:scale-110 hover:shadow-lg hover:shadow-primary-500/30
                          cursor-default"
                        style={{ 
                          transitionDelay: `${techIndex * 80}ms`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`mt-4 transition-all duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${index * 300 + 1100}ms` }}>
                    <span className={`text-xs px-3 py-1 rounded-full 
                      ${exp.type === 'full-time' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                      {exp.type === 'full-time' ? '💼 Full Time' : '🖥️ Freelance'}
                    </span>
                  </div>

                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${companyColor} 
                    transition-all duration-700 w-0 group-hover:w-full`}>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Zap,
  Sparkles,
  Rocket,
  Target,
  Heart
} from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState({ 
    projects: 0, 
    skills: 0, 
    learning: 0 
  });
  const sectionRef = useRef(null);
  
  const stats = [
    { 
      icon: Code, 
      label: 'Projects', 
      value: '5+', 
      target: 5,
      key: 'projects',
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      delay: 100,
      description: 'Web & App Projects'
    },
    { 
      icon: GraduationCap, 
      label: 'Education', 
      value: 'BS CS',
      target: 1,
      key: 'education',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-500/10',
      delay: 300,
      description: 'Computer Science'
    },
    { 
      icon: BookOpen, 
      label: 'Skills', 
      value: '10+',
      target: 10,
      key: 'skills',
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-500/10',
      delay: 500,
      description: 'Technologies Learned'
    },
    { 
      icon: Globe, 
      label: 'Learning', 
      value: '5+',
      target: 5,
      key: 'learning',
      color: 'from-orange-500 to-yellow-400',
      bgColor: 'bg-orange-500/10',
      delay: 700,
      description: 'Courses & Certifications'
    },
  ];

  // Reset animation function
  const resetAnimation = () => {
    setIsVisible(false);
    setHasAnimated(false);
    setCounters({ 
      projects: 0, 
      skills: 0, 
      learning: 0 
    });
  };

  // Counter animation function
  const animateCounter = (key, target) => {
    let current = 0;
    const duration = 2000;
    const steps = duration / 16;
    const stepValue = target / steps;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters(prev => ({
        ...prev,
        [key]: Math.floor(current)
      }));
    }, 16);
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
            
            stats.forEach((stat) => {
              if (stat.key !== 'education') {
                setTimeout(() => {
                  animateCounter(stat.key, stat.target);
                }, stat.delay);
              }
            });
          }
          if (!entry.isIntersecting && hasAnimated) {
            resetAnimation();
          }
        });
      },
      { 
        threshold: 0.2,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  // Reset animation on hash change
  useEffect(() => {
    resetAnimation();
    
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
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
                    stats.forEach((stat) => {
                      if (stat.key !== 'education') {
                        setTimeout(() => {
                          animateCounter(stat.key, stat.target);
                        }, stat.delay);
                      }
                    });
                  }
                });
              },
              { threshold: 0.2 }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to render stat value
  const getStatValue = (stat) => {
    if (stat.key === 'education') {
      return stat.value;
    }
    const count = counters[stat.key] || 0;
    const suffix = stat.key === 'projects' ? '+' : 
                   stat.key === 'skills' ? '+' : 
                   stat.key === 'learning' ? '+' : '';
    return count + suffix;
  };

  return (
    <section id="about" className="py-20 bg-dark-900/50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Glow Effects */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container-custom relative z-10">
        {/* Section Title with Animation */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="section-title flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary-400" />
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Let me introduce myself and share my journey in the world of technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - About Text with Staggered Animation */}
          <div>
            {/* ✨ INTRO - First Paragraph */}
            <div className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-primary-400 font-semibold">About Me</span>
              </div>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed hover:text-white transition-colors duration-300">
                I'm a <span className="text-primary-400 font-semibold">passionate and dedicated</span> 
                <span className="text-purple-400 font-semibold"> Web Development </span> 
                with a strong foundation in <span className="text-cyan-400">modern web technologies</span>. 
                I love creating <span className="text-green-400">innovative solutions</span> and building 
                <span className="text-pink-400"> responsive, user-friendly applications</span> that make a difference.
              </p>
            </div>

            {/* ✨ FRESHER - Second Paragraph */}
            <div className={`transform transition-all duration-700 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-5 h-5 text-primary-400 animate-bounce" />
                <span className="text-purple-400 font-semibold">Fresher with Fresh Perspective</span>
              </div>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed hover:text-gray-300 transition-colors duration-300">
                As a <span className="text-yellow-400 font-semibold">fresher</span> in the tech industry, 
                I bring <span className="text-cyan-400">fresh perspectives</span>, 
                <span className="text-green-400"> strong problem-solving skills</span>, and a 
                <span className="text-pink-400"> hunger to learn and grow</span>. 
                I'm actively seeking <span className="text-primary-400 font-semibold">opportunities</span> 
                to contribute to <span className="text-purple-400">meaningful projects </span> and build a successful career.
              </p>
            </div>

            {/* ✨ KEY POINTS */}
            <div className="space-y-3 mt-6">
              <div className={`flex items-center gap-3 group cursor-pointer transform transition-all duration-500 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full group-hover:scale-150 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 inline-block">
                  <span className="text-primary-400 font-medium">Full Stack</span> Development
                </span>
              </div>
              
              <div className={`flex items-center gap-3 group cursor-pointer transform transition-all duration-500 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full group-hover:scale-150 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 inline-block">
                  <span className="text-purple-400 font-medium">Modern Web </span> Technologies
                </span>
              </div>
              
              <div className={`flex items-center gap-3 group cursor-pointer transform transition-all duration-500 delay-800 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full group-hover:scale-150 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/50"></div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 inline-block">
                  <span className="text-green-400 font-medium">Responsive</span> UI/UX Design
                </span>
              </div>

              <div className={`flex items-center gap-3 group cursor-pointer transform transition-all duration-500 delay-900 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full group-hover:scale-150 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/50"></div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 inline-block">
                  <span className="text-yellow-400 font-medium">Problem Solving</span> & Innovation
                </span>
              </div>
            </div>

            {/* ✨ FRESHER BADGE */}
            <div className={`mt-6 transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-full">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 text-sm font-medium">🌟 Open to Opportunities | Fresher</span>
              </div>
            </div>

            {/* ✨ MISSION STATEMENT */}
            <div className={`mt-4 transform transition-all duration-700 delay-1100 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="flex items-start gap-3 p-4 bg-dark-800/30 rounded-xl border border-gray-800/30">
                <Target className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <span className="text-primary-400 font-semibold">My Mission:</span> 
                    To leverage my skills in <span className="text-cyan-400">web development </span> 
                    to create <span className="text-green-400">impactful solutions</span> while continuously 
                    learning and growing as a <span className="text-purple-400">software engineer</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Stats with Unique Animations */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              return (
                <div
                  key={index}
                  className={`
                    group relative overflow-hidden 
                    bg-dark-800/50 backdrop-blur-sm 
                    p-6 rounded-2xl text-center 
                    hover:bg-dark-800 
                    hover:scale-105 hover:-translate-y-2
                    transition-all duration-500
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Glowing Border Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 p-[1px]`}>
                    <div className="w-full h-full bg-dark-800/50 rounded-2xl"></div>
                  </div>

                  {/* Icon with Pulsing Animation */}
                  <div className={`relative z-10 ${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 
                    group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <stat.icon className={`w-8 h-8 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text 
                      group-hover:scale-110 transition-all duration-500`} />
                  </div>

                  {/* Counter with Animation */}
                  <div className="relative z-10">
                    <div className="text-4xl font-bold gradient-text mb-1 font-mono group-hover:scale-110 transition-transform duration-300">
                      {getStatValue(stat)}
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="text-gray-500 text-xs mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.description}
                    </div>
                  </div>

                  {/* Progress Bar Animation */}
                  <div className={`relative z-10 mt-3 h-1 w-full bg-dark-700 rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                      style={{ 
                        width: isVisible ? '100%' : '0%',
                        transitionDelay: `${stat.delay + 500}ms`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
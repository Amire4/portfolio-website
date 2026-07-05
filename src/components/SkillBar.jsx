import React, { useState, useEffect, useRef } from 'react';

const SkillBar = ({ skill }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDot, setShowDot] = useState(false);
  const barRef = useRef(null);
  const animationTimeout = useRef(null);

  useEffect(() => {
    const currentBar = barRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation first
            setProgress(0);
            setShowDot(false);
            
            // Clear any existing timeout
            if (animationTimeout.current) {
              clearTimeout(animationTimeout.current);
            }
            
            // Start animation with delay
            animationTimeout.current = setTimeout(() => {
              setIsVisible(true);
              setProgress(skill.level);
              setTimeout(() => {
                setShowDot(true);
              }, 500);
            }, 200);
          } else {
            // Reset when leaving viewport
            setIsVisible(false);
            setProgress(0);
            setShowDot(false);
            if (animationTimeout.current) {
              clearTimeout(animationTimeout.current);
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (currentBar) {
      observer.observe(currentBar);
    }

    return () => {
      if (currentBar) {
        observer.unobserve(currentBar);
        observer.disconnect();
      }
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [skill.level]);

  return (
    <div ref={barRef} className="group">
      {/* Skill Name with Icon and Percentage */}
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-gray-300 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
          <span className="text-lg">{skill.icon}</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {skill.name}
          </span>
        </span>
        <span className={`text-sm font-mono transition-all duration-500
          ${isVisible ? 'text-primary-400' : 'text-gray-400'}`}>
          {isVisible ? `${skill.level}%` : '0%'}
        </span>
      </div>
      
      {/* Progress Bar with Animation */}
      <div className="w-full bg-dark-800 rounded-full h-2.5 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-full 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        </div>
        
        {/* Progress Fill */}
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full 
            transition-all duration-1000 ease-out relative"
          style={{ 
            width: `${progress}%`,
            transitionDelay: '0.2s'
          }}
        >
          {/* Animated Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
            -translate-x-full group-hover:translate-x-full transition-transform duration-1000
            rounded-full">
          </div>
        </div>
        
        {/* Percentage Dot */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-400 rounded-full 
            transition-all duration-700 shadow-lg shadow-primary-500/50
            ${showDot ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{ 
            left: `calc(${progress}% - 6px)`,
            transitionDelay: '0.3s'
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Eye, Sparkles, Star } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  // ✨ Generate particles for each card
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
      });
    }
    setParticles(newParticles);
  }, []);

  // ✨ Intersection Observer with stagger delay
  useEffect(() => {
    const currentCard = cardRef.current;
    const delay = index * 150;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(false);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
        observer.disconnect();
      }
    };
  }, [index]);

  // ✨ Mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * 20;
      const rotateY = (x - 0.5) * -20;
      setGlowIntensity(Math.max(0, 1 - Math.abs(x - 0.5) * 2));
      
      if (cardRef.current) {
        cardRef.current.style.transform = 
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    setIsHovered(false);
    setGlowIntensity(0);
  };

  return (
    <div 
      ref={cardRef}
      className={`
        group relative 
        bg-dark-800/50 backdrop-blur-sm 
        rounded-2xl overflow-hidden 
        hover:bg-dark-800 
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-90'}
        hover:shadow-2xl hover:shadow-primary-500/30
        cursor-pointer
      `}
      style={{
        transitionDelay: `${index * 0.1}s`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ✨ GLOW BORDER - Animated */}
      <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm">
      </div>
      <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 
        opacity-0 group-hover:opacity-50 transition-opacity duration-700 animate-spin-slow">
      </div>

      {/* ✨ BACKGROUND GLOW */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 
          opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          transform: `scale(${1 + glowIntensity * 0.1})`,
        }}
      />

      {/* ✨ PARTICLES ON HOVER */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y + Math.sin(Date.now() / 2000 + i) * 10}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity * (1 + Math.sin(Date.now() / 1000 + i) * 0.5),
              transform: `translate(${Math.sin(Date.now() / 3000 + i) * 20}px, ${Math.cos(Date.now() / 4000 + i) * 20}px)`,
              transition: 'all 3s ease-in-out',
              boxShadow: `0 0 20px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* ✨ PROJECT IMAGE */}
      <div className="relative overflow-hidden h-52">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-1000 
            ${isHovered ? 'scale-125 rotate-2' : 'scale-100'}
            group-hover:brightness-110`}
          style={{
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        {/* ✨ IMAGE OVERLAY GRADIENT */}
        <div className={`absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-transparent 
          transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
        </div>

        {/* ✨ OVERLAY LINKS WITH 3D EFFECT */}
        <div className={`absolute inset-0 flex items-center justify-center gap-6 
          transition-all duration-700 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          
          {/* ✅ GITHUB LINK */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-4 bg-dark-900/80 backdrop-blur-md rounded-full 
              hover:bg-primary-600 transition-all duration-500 
              hover:scale-150 hover:rotate-12 hover:shadow-2xl hover:shadow-primary-500/50
              group/link"
            aria-label="View GitHub Repository"
          >
            <Github className="w-6 h-6 text-white group-hover/link:rotate-12 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 
              opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              GitHub
            </span>
          </a>

          {/* ✅ DEMO LINK */}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-4 bg-dark-900/80 backdrop-blur-md rounded-full 
              hover:bg-purple-600 transition-all duration-500 
              hover:scale-150 hover:-rotate-12 hover:shadow-2xl hover:shadow-purple-500/50
              group/link"
            aria-label="View Live Demo"
          >
            <ExternalLink className="w-6 h-6 text-white group-hover/link:-rotate-12 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 
              opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Demo
            </span>
          </a>
        </div>

        {/* ✨ TOP RIGHT BADGE */}
        <div className={`absolute top-3 right-3 px-3 py-1 bg-dark-900/80 backdrop-blur-md 
          rounded-full text-xs text-primary-400 border border-primary-500/30
          transform transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <Sparkles className="w-3 h-3 inline-block mr-1" />
          {project.category}
        </div>
      </div>
      
      {/* ✨ PROJECT INFO */}
      <div className="p-6 relative z-10">
        {/* ✨ CATEGORY BADGE */}
        <div className="flex items-center justify-between mb-3">
          <span className={`
            text-xs text-primary-400 
            bg-primary-400/10 px-4 py-1.5 rounded-full 
            group-hover:bg-primary-400/20 
            transition-all duration-500 
            group-hover:scale-105
            border border-primary-500/10
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
          `}
          style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}>
            <Star className="w-3 h-3 inline-block mr-1" />
            Featured
          </span>
          
          {/* ✅ VIEW PROJECT - Arrow Icon Removed */}
          <span className={`
            text-xs text-gray-500 
            opacity-0 group-hover:opacity-100 
            transition-all duration-500
            flex items-center gap-1
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}
          `}
          style={{ transitionDelay: `${index * 0.1 + 0.4}s` }}>
            <Eye className="w-3 h-3" />
            <span>View Project</span>
          </span>
        </div>
        
        {/* ✨ TITLE */}
        <h3 className={`
          text-xl font-bold mb-2 
          group-hover:text-primary-400 
          transition-all duration-500
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
        `}
        style={{ transitionDelay: `${index * 0.1 + 0.5}s` }}>
          {project.title}
        </h3>
        
        {/* ✨ DESCRIPTION */}
        <p className={`
          text-gray-400 text-sm mb-4 
          line-clamp-2 
          group-hover:text-gray-300 
          transition-all duration-500
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
        `}
        style={{ transitionDelay: `${index * 0.1 + 0.6}s` }}>
          {project.description}
        </p>
        
        {/* ✨ TECHNOLOGIES */}
        <div className={`
          flex flex-wrap gap-2
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          transition-all duration-500
        `}
        style={{ transitionDelay: `${index * 0.1 + 0.7}s` }}>
          {project.technologies.map((tech, techIndex) => (
            <span
              key={tech}
              className="relative text-xs bg-dark-900 text-gray-300 px-3 py-1.5 rounded-full 
                transition-all duration-300 hover:bg-primary-600 hover:text-white hover:scale-110 
                hover:shadow-lg hover:shadow-primary-500/30 cursor-default
                border border-gray-800/30 hover:border-primary-500/30
                overflow-hidden group/tech"
              style={{ 
                transitionDelay: `${techIndex * 0.05 + 0.1}s`
              }}
            >
              <span className="relative z-10">{tech}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 
                opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
            </span>
          ))}
        </div>

        {/* ✨ BOTTOM GRADIENT LINE */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 
          transition-all duration-1000 ${isHovered ? 'w-full' : 'w-0'}`}>
        </div>

        {/* ✨ BOTTOM GLOW */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-primary-500/20 to-purple-500/20 
          blur-2xl transition-all duration-700 ${isHovered ? 'opacity-100 scale-150' : 'opacity-0'}`}>
        </div>
      </div>

      {/* ✨ STAGGER ANIMATION KEYFRAMES */}
      <style jsx>{`
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .group:hover {
          animation: cardFloat 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
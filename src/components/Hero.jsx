import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Github, Linkedin, Mail, Sparkles, Rocket } from 'lucide-react';

const Hero = () => {
  // Word animation states
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [floatingText, setFloatingText] = useState([]);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  const words = useMemo(() => ['RANA', 'AMIR', 'SHAHZAD'], []);
  
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Element visibility states
  const [showHello, setShowHello] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showImage, setShowImage] = useState(false);
  // ❌ REMOVED: const [showArrow, setShowArrow] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const wordIntervalRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  // ✨ GENERATE PARTICLES
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
      });
    }
    setParticles(newParticles);

    const newFloatingText = [];
    const textWords = ['✦', '★', '◆', '◈', '✧', '✦', '★', '◆'];
    for (let i = 0; i < 20; i++) {
      newFloatingText.push({
        char: textWords[Math.floor(Math.random() * textWords.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    setFloatingText(newFloatingText);
  }, []);

  // ✨ MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
        setGlowIntensity(Math.max(0, 1 - Math.abs(x - 50) / 50));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ✨ CANVAS PARTICLE SYSTEM
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        const x = (p.x / 100) * canvas.width;
        const y = (p.y / 100) * canvas.height;
        const size = p.size * (1 + Math.sin(Date.now() / 1000 + i) * 0.3);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.8 + Math.sin(Date.now() / 2000 + i) * 0.2);
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        
        p.x += p.speedX * 0.5;
        p.y += p.speedY * 0.5;
        if (p.x > 100) p.x = 0;
        if (p.x < 0) p.x = 100;
        if (p.y > 100) p.y = 0;
        if (p.y < 0) p.y = 100;
      });
      
      animationId = requestAnimationFrame(drawParticles);
    };
    
    drawParticles();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particles]);

  // ✨ RENDER WORDS FUNCTION
  const renderWords = () => {
    const parts = displayText.split(' ');
    return parts.map((word, index) => {
      const isLastWord = word === 'SHAHZAD';
      return (
        <span 
          key={index} 
          className={`${isLastWord ? 'gradient-text-3d' : 'text-white'} inline-block`}
          style={{ 
            marginRight: index < parts.length - 1 ? '0.5rem' : '0',
          }}
        >
          {word}
        </span>
      );
    });
  };

  // ✨ RESET ANIMATIONS
  const resetAllAnimations = () => {
    setDisplayText('');
    setShowCursor(true);
    setIsVisible(false);
    setShowHello(false);
    setShowSubtitle(false);
    setShowDescription(false);
    setShowButtons(false);
    setShowSocial(false);
    setShowImage(false);
    // ❌ REMOVED: setShowArrow(false);
    setShowParticles(false);
    setShowSkills(false);
    
    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
      wordIntervalRef.current = null;
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  };

  // ✨ START WORD ANIMATION
  const startWordAnimation = useCallback(() => {
    let index = 0;
    let currentText = '';
    
    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
      wordIntervalRef.current = null;
    }
    
    wordIntervalRef.current = setInterval(() => {
      if (index < words.length) {
        currentText = currentText 
          ? `${currentText} ${words[index]}` 
          : words[index];
        setDisplayText(currentText);
        index++;
      } else {
        if (wordIntervalRef.current) {
          clearInterval(wordIntervalRef.current);
          wordIntervalRef.current = null;
        }
        
        const cursorTimer = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        
        setTimeout(() => setShowSubtitle(true), 400);
        setTimeout(() => setShowDescription(true), 800);
        setTimeout(() => setShowButtons(true), 1200);
        setTimeout(() => setShowSocial(true), 1600);
        setTimeout(() => setShowParticles(true), 2200);
        setTimeout(() => setShowSkills(true), 2500);
        
        animationTimeoutRef.current = cursorTimer;
      }
    }, 600);
  }, [words]);

  // ✨ START ALL ANIMATIONS
  const startAllAnimations = useCallback(() => {
    resetAllAnimations();
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setShowHello(true);
      
      setTimeout(() => {
        startWordAnimation();
      }, 400);
      
      setTimeout(() => {
        setShowImage(true);
      }, 800);
      
    }, 100);
  }, [startWordAnimation]);

  // ✨ INTERSECTION OBSERVER
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAllAnimations();
          } else {
            resetAllAnimations();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
      if (wordIntervalRef.current) clearInterval(wordIntervalRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, [startAllAnimations]);

  // ✨ HASH CHANGE LISTENER
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '' || window.location.hash === '#home') {
        resetAllAnimations();
        setTimeout(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              startAllAnimations();
            }
          }
        }, 200);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [startAllAnimations]);

  // Skills data
  const skills = ['React', 'JavaScript', 'Python', 'Tailwind CSS', 'Fastapi', 'PostgreSQL'];

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 px-0 py-0"
    >
      {/* ✨ CANVAS PARTICLE SYSTEM */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* ✨ 3D ROTATING GLOW ORB */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3), rgba(139,92,246,0.1))',
          top: `${mousePosition.y - 20}%`,
          left: `${mousePosition.x - 20}%`,
          transform: `translate(-50%, -50%) scale(${1 + glowIntensity * 0.5})`,
          transition: 'all 0.3s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* ✨ FLOATING TEXT PARTICLES */}
      {floatingText.map((item, i) => (
        <div
          key={i}
          className="absolute pointer-events-none text-primary-400/20 select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y + Math.sin(Date.now() / 2000 + item.delay) * 5}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity * (0.5 + Math.sin(Date.now() / 1000 + i) * 0.5),
            transform: `rotate(${Math.sin(Date.now() / 3000 + i) * 360}deg)`,
            transition: 'all 2s ease-in-out',
          }}
        >
          {item.char}
        </div>
      ))}

      {/* ✨ MAIN CONTENT */}
      <div className="container-custom relative z-10 py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 lg:gap-16 py-0">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center md:text-left px-2 md:px-0">
            
            {/* ✨ HELLO TEXT */}
            <div className="overflow-hidden relative mb-1 md:mb-3">
              <p className={`text-primary-400 text-sm md:text-lg lg:text-xl font-semibold 
                transition-all duration-700 ${showHello ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                flex items-center gap-1 md:gap-2`}>
                <Sparkles className={`w-4 h-4 md:w-5 md:h-5 animate-pulse ${showHello ? 'opacity-100' : 'opacity-0'}`} />
                <span> Hello, I'm</span>
              </p>
            </div>

            {/* ✨ NAME */}
            <div className="min-h-[2.5rem] md:min-h-[4rem] relative">
              <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4">
                {displayText ? (
                  <>
                    {renderWords()}
                    <span className={`inline-block w-1 h-6 md:h-10 lg:h-12 bg-primary-400 ml-1 
                      ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100
                      animate-pulse`}>
                    </span>
                  </>
                ) : (
                  <span className="text-white tracking-wide text-xl md:text-4xl lg:text-6xl">
                    RANA AMIR SHAHZAD
                  </span>
                )}
              </h1>
              <div className={`absolute bottom-0 left-0 h-0.5 md:h-1 bg-gradient-to-r from-primary-500 to-purple-500 
                transition-all duration-1000 ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                style={{ transitionDelay: '2s' }} />
            </div>

            {/* ✨ SUBTITLE */}
            <div className={`overflow-hidden transition-all duration-700 
              ${showSubtitle ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <h2 className="text-sm md:text-2xl lg:text-3xl text-gray-300 mb-3 md:mb-6 flex items-center gap-2 md:gap-3">
                <Rocket className={`w-4 h-4 md:w-6 md:h-6 text-primary-400 ${showSubtitle ? 'animate-bounce' : 'opacity-0'}`} />
                <span className="text-[10px] sm:text-sm md:text-base lg:text-xl">Software Engineering | Full Stack Developer</span>
              </h2>
            </div>

            {/* ✨ DESCRIPTION */}
            <div className={`overflow-hidden transition-all duration-700 
              ${showDescription ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <p className="text-white text-[10px] sm:text-sm md:text-base lg:text-lg mb-3 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                <span className="text-primary-400 font-semibold">🎓 Software Engineering student</span>
                <span className="text-white"> and </span>
                <span className="text-white font-semibold">aspiring Full Stack Developer</span>
                <span className="text-white"> with a passion for building </span>
                <span className="text-white font-semibold">scalable web solutions</span>
                <span className="text-white">.</span>
                <br className="hidden sm:block" />
                <span className="text-white">💡 Proficient in </span>
                <span className="text-primary-400 font-semibold">React</span>
                <span className="text-white">, </span>
                <span className="text-primary-400 font-semibold">JavaScript</span>
                <span className="text-white">, and </span>
                <span className="text-primary-400 font-semibold">Python</span>
                <span className="text-white">. Always eager to learn and innovate.</span>
                <br className="hidden sm:block" />
                <span className="text-yellow-400 font-semibold animate-pulse inline-block text-[8px] sm:text-sm">
                  ✨ Actively seeking internship opportunities ✨
                </span>
              </p>
            </div>

            {/* ✨ INTERNSHIP BADGE */}
            <div className={`mb-3 md:mb-6 transition-all duration-700 delay-1000 
              ${showButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <div className="inline-flex items-center gap-1 md:gap-3 px-2 py-1 md:px-5 md:py-2.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 
                border border-yellow-500/30 rounded-full animate-pulse">
                <Sparkles className="w-2 h-2 md:w-4 md:h-4 text-yellow-400" />
                <span className="text-[8px] sm:text-xs md:text-sm">🌟 Open to Internship Opportunities</span>
              </div>
            </div>

            {/* ✨ BUTTONS */}
            <div className={`flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start transition-all duration-700 
              ${showButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              <a
                href="#projects"
                className="group relative px-4 py-1.5 md:px-8 md:py-3 bg-gradient-to-r from-primary-600 to-primary-500 
                  rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl 
                  hover:shadow-primary-500/50 overflow-hidden text-[10px] sm:text-sm md:text-base"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
              <a
                href="#contact"
                className="group relative px-4 py-1.5 md:px-8 md:py-3 border-2 border-gray-600 hover:border-primary-500 
                  rounded-lg transition-all duration-300 hover:scale-110 hover:bg-dark-800/50
                  overflow-hidden text-[10px] sm:text-sm md:text-base"
              >
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* ✨ SOCIAL LINKS */}
            <div className={`flex gap-2 md:gap-4 mt-4 md:mt-8 justify-center md:justify-start transition-all duration-700 
              ${showSocial ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
              {[
                { icon: Github, link: 'https://github.com/Amire4/dashboard', label: 'GitHub' },
                { icon: Linkedin, link: 'https://www.linkedin.com/in/rana-amir-shahzad-899506408', label: 'LinkedIn' },
                { icon: Mail, link: 'mailto:ranaamirshahzad@gmail.com', label: 'Email' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-1.5 md:p-3 bg-dark-800/50 hover:bg-primary-600 rounded-full 
                    transition-all duration-300 hover:scale-110 md:hover:scale-125 hover:rotate-12 
                    hover:shadow-2xl hover:shadow-primary-500/50"
                >
                  <item.icon className="w-3 h-3 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 text-[8px] md:text-xs text-gray-400 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 rounded-full border-2 border-primary-500/50 
                    scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 
                    transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* ✅ ✨ SKILLS TAGS */}
            <div className={`flex flex-wrap gap-1 md:gap-2 mt-4 md:mt-8 justify-center md:justify-start transition-all duration-700
              ${showSkills ? 'opacity-100 transform translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 md:px-3 md:py-1 text-[8px] sm:text-[10px] md:text-xs bg-dark-800/50 text-gray-400 rounded-full 
                    border border-gray-700/30 hover:border-primary-500/50 hover:text-primary-400 
                    transition-all duration-300 hover:scale-105 cursor-default"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ✨ RIGHT - PROFILE IMAGE */}
          <div className={`flex-1 flex justify-center transition-all duration-1000 
            ${showImage ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} mt-2 md:mt-0`}>
            
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 animate-smooth-slide">
              
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full 
                blur-2xl md:blur-3xl opacity-20 md:opacity-30 animate-pulse scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full 
                blur-xl md:blur-2xl opacity-15 md:opacity-20 animate-pulse scale-125" style={{ animationDelay: '2s' }} />
              
              {/* Rotating Rings */}
              <div className="absolute inset-[-4px] md:inset-[-8px] rounded-full border border-primary-500/20 
                animate-spin-slow" />
              <div className="absolute inset-[-8px] md:inset-[-16px] rounded-full border border-purple-500/20 
                animate-spin-slower" />
              
              {/* ✅ IMAGE CONTAINER */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 md:border-4 border-primary-500/30 
                shadow-xl md:shadow-2xl shadow-primary-500/20">
                <img
                  src="/images/profile 5.jpeg"
                  alt="Rana Amir Shahzad"
                  className="w-full h-full object-cover object-top"
                  style={{
                    objectPosition: '50% 15%',
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/1e293b/60a5fa?text=Rana+Amir';
                  }}
                />
              </div>

              {/* Internship Badge */}
              <div className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 md:px-4 md:py-1.5 
                bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full 
                text-white text-[6px] md:text-xs font-semibold shadow-lg shadow-yellow-500/30
                animate-pulse whitespace-nowrap z-10">
                🎯 Looking for Internship
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ❌ SCROLL DOWN ARROW - REMOVED */}

      {/* ✨ SPARKLE PARTICLES */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10%',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
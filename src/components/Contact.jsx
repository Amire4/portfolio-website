import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent successfully! ✅');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 2000);
  };

  // Contact items with icons and colors
  const contactItems = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'ranaamirshahzad@gmail.com',
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      hoverColor: 'hover:bg-blue-500/20',
      borderColor: 'border-blue-500/20'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '+92 3104603860',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-500/10',
      hoverColor: 'hover:bg-purple-500/20',
      borderColor: 'border-purple-500/20'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Pakistan, Punjab, Jhang',
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-500/10',
      hoverColor: 'hover:bg-green-500/20',
      borderColor: 'border-green-500/20'
    }
  ];

  // Reset animation function
  const resetAnimation = () => {
    setIsVisible(false);
    setHasAnimated(false);
    setActiveField(null);
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
            // Activate fields one by one
            contactItems.forEach((_, index) => {
              setTimeout(() => {
                setActiveField(index);
              }, index * 200 + 300);
            });
          }
          if (!entry.isIntersecting && hasAnimated) {
            setIsVisible(false);
            setHasAnimated(false);
            setActiveField(null);
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
  // Replace with simple comments or remove
  }, [hasAnimated]);

  // Reset animation on hash change
  useEffect(() => {
    resetAnimation();
    
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
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
                    contactItems.forEach((_, index) => {
                      setTimeout(() => {
                        setActiveField(index);
                      }, index * 200 + 300);
                    });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="contact" className="py-20 bg-dark-900/50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Effects */}
      <div className="absolute top-0 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="contact-particle" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
        <div className="contact-particle" style={{ top: '30%', right: '10%', animationDelay: '1s' }}></div>
        <div className="contact-particle" style={{ bottom: '20%', left: '15%', animationDelay: '2s' }}></div>
        <div className="contact-particle" style={{ bottom: '40%', right: '5%', animationDelay: '0.5s' }}></div>
        <div className="contact-particle" style={{ top: '50%', left: '50%', animationDelay: '1.5s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Title with Animation */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Have a question or want to work together? Let's connect!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            {/* Heading with Animation */}
            <div className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary-400" />
                Let's Connect
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I'm always interested in hearing about new opportunities,
                creative collaborations, or just having a chat.
              </p>
            </div>
            
            {/* Contact Items with Staggered Animation */}
            <div className="space-y-4">
              {contactItems.map((item, index) => {
                const isActive = activeField !== null && index <= activeField;
                const Icon = item.icon;

                return (
                  <div 
                    key={index}
                    className={`group flex items-center gap-4 p-4 rounded-xl 
                      bg-dark-800/30 border border-gray-800/30 
                      hover:bg-dark-800 
                      transform transition-all duration-500
                      ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}
                      hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10
                      cursor-pointer`}
                    style={{ 
                      transitionDelay: `${index * 200 + 400}ms`,
                      borderColor: isActive ? 'rgba(96, 165, 250, 0.2)' : 'rgba(31, 41, 55, 0.5)'
                    }}
                  >
                    {/* Icon with Pulse Animation */}
                    <div className={`relative ${item.bgColor} w-14 h-14 rounded-2xl 
                      flex items-center justify-center
                      transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                      ${item.hoverColor}`}
                    >
                      <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${item.color} bg-clip-text`} />
                      {/* Pulse Ring */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} 
                        opacity-0 group-hover:opacity-20 transition-opacity duration-500`}>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {item.label}
                      </p>
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                    
                    {/* Arrow Icon on Hover */}
                    <ArrowRight className={`w-4 h-4 text-gray-600 
                      transform transition-all duration-300 
                      group-hover:translate-x-2 group-hover:text-primary-400
                      opacity-0 group-hover:opacity-100`} />
                  </div>
                );
              })}
            </div>

            {/* Social/Status Badge */}
            <div className={`transform transition-all duration-700 delay-1000 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center gap-3 p-4 bg-dark-800/30 rounded-xl border border-gray-800/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">Available for freelance work</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Contact Form with Animation */}
          <form 
            onSubmit={handleSubmit} 
            className={`space-y-6 transform transition-all duration-700 delay-400 
              ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary-400" />
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-12 bg-dark-800 border-2 border-gray-700 
                    rounded-xl focus:outline-none focus:border-primary-500 
                    transition-all duration-300 text-white
                    group-hover:border-gray-600"
                  placeholder="Amir"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 
                  group-focus-within:text-primary-400 transition-colors duration-300" />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-12 bg-dark-800 border-2 border-gray-700 
                    rounded-xl focus:outline-none focus:border-primary-500 
                    transition-all duration-300 text-white
                    group-hover:border-gray-600"
                  placeholder="amir@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 
                  group-focus-within:text-primary-400 transition-colors duration-300" />
              </div>
            </div>
            
            {/* Message Field */}
            <div className="group">
              <label htmlFor="message" className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary-400" />
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 pl-12 bg-dark-800 border-2 border-gray-700 
                    rounded-xl focus:outline-none focus:border-primary-500 
                    transition-all duration-300 text-white resize-none
                    group-hover:border-gray-600"
                  placeholder="Your message here..."
                ></textarea>
                <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-gray-500 
                  group-focus-within:text-primary-400 transition-colors duration-300" />
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 
                hover:from-primary-500 hover:to-primary-400 
                rounded-xl transition-all duration-300 
                flex items-center justify-center gap-2
                hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/30
                group
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '1.2s' }}
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="font-medium">{status || 'Send Message'}</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
              </div>
            </button>

            {/* Status Message */}
            {status && (
              <div className={`text-center text-sm font-medium 
                ${status.includes('successfully') ? 'text-green-400' : 'text-yellow-400'}
                animate-pulse`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* ✅ Navbar */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500
        ${scrolled ? 'bg-dark-950/95 backdrop-blur-lg shadow-lg' : 'bg-dark-950/80 backdrop-blur-sm'}
        border-b ${scrolled ? 'border-gray-800/50' : 'border-transparent'}`}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="text-2xl md:text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
              Portfolio
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-gray-300 hover:text-white transition-all duration-300 text-sm lg:text-base"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* ✅ Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-dark-800/50 transition-all duration-300 focus:outline-none text-white z-50"
                aria-label="Toggle menu"
                type="button"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu - Full Screen Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-dark-950 z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white text-3xl font-medium 
                transition-all duration-300 hover:scale-110 hover:text-primary-400
                hover:translate-x-2"
              onClick={closeMenu}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* ✅ Spacer - Prevents content from hiding behind navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
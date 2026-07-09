import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollToBottom = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Jab page ke bottom ke paas ho
      const bottom = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < bottom - 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToBottom}
      className={`fixed bottom-8 right-8 p-3 bg-purple-600 hover:bg-purple-700 rounded-full 
        transition-all duration-300 z-50 shadow-lg hover:shadow-xl hover:scale-110
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      aria-label="Scroll to bottom"
    >
      <ChevronDown className="w-6 h-6 text-white" />
    </button>
  );
};

export default ScrollToBottom;
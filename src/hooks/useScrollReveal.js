import { useEffect, useRef } from 'react';

function useScrollReveal() {
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    
    // Agar element exist nahi karta toh return karein
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentElement);

    // Cleanup
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return elementRef;
}

export default useScrollReveal;
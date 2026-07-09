import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToBottom from './components/ScrollToBottom';

// App content with theme
const AppContent = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${darkMode ? 'bg-dark-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollToBottom />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
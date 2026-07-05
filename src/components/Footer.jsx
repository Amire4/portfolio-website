import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-950 border-t border-gray-800 py-8 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5 opacity-50"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side - Copyright */}
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
              © {new Date().getFullYear()} Rana Amir Shahzad.
            </p>
            <span className="text-gray-600 text-sm">|</span>
            <p className="text-gray-500 text-xs flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> 
              <span className="text-gray-500">&amp; React</span>
            </p>
          </div>
          
          {/* Right Side - Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/Amire4"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2.5 rounded-full bg-dark-800/50 hover:bg-primary-600 
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/30"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                GitHub
              </span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/rana-amir-shahzad-899506408"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2.5 rounded-full bg-dark-800/50 hover:bg-primary-600 
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/30"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LinkedIn
              </span>
            </a>
            
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2.5 rounded-full bg-dark-800/50 hover:bg-primary-600 
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/30"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Twitter
              </span>
            </a>
            
            <a
              href="mailto:ranaamirshahzad@gmail.com"
              className="group relative p-2.5 rounded-full bg-dark-800/50 hover:bg-primary-600 
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/30"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Email
              </span>
            </a>
          </div>
        </div>
        
        {/* Bottom Decorative Line */}
        <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-center">
          <p className="text-gray-600 text-[10px] tracking-wider uppercase">
            Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
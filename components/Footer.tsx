import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#05090f] pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2 brand-font">Let's Build Something Secure</h2>
            <p className="text-gray-400">Open for commissions and security audits.</p>
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.platform}
                  href={link.url}
                  className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-cyan-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label={link.platform}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Discord: <span className="text-gray-300 select-all cursor-text">0xyue.dev</span>
          </div>
          
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Yuehan. All systems operational.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
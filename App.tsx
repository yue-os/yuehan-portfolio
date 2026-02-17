import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Desktop only custom cursor for better UX */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Services />
        <Projects />
        <TechStack />
      </main>

      <Footer />
    </div>
  );
}

export default App;
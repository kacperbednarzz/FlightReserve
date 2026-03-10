import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative h-[600px] w-full rounded-[3rem] overflow-hidden bg-[#050505] shadow-2xl border border-white/5"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-20 max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.15] mb-6 tracking-tight text-white max-w-2xl transition-all">
          Rise into the sky on your terms
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-lg leading-relaxed opacity-90">
          Discover flight deals that give you real freedom
        </p>
      </div>
    </div>
  );
};

export default Hero;
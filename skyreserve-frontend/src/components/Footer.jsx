import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-40 border-t border-white/5 bg-[#050505] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        

        <div className="flex items-center gap-2 opacity-80">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          <span className="text-xl font-bold tracking-tighter text-white">BEDNARZAIRLINES.</span>
        </div>

        <div className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-light">
          © 2026 BednarzAirLines Premium Travel — All Rights Reserved
        </div>

        <div className="mt-4 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
      </div>
    </footer>
  );
};

export default Footer;
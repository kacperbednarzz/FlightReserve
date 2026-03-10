import React, { useState, useEffect } from 'react';
import { User as UserIcon, LogOut, Map } from 'lucide-react';

const Navbar = ({ onSignInClick, onMyTripsClick, onLogoClick }) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    window.location.href = '/';
  };

  const handleMyTrips = () => {
    if (!userName) {
      onSignInClick();
    } else {
      onMyTripsClick();
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 md:px-12 py-8 w-full relative z-50">
      
      <div className="flex-1">
        <div 
          onClick={onLogoClick}
          className="group flex items-center cursor-pointer transition inline-flex"
        >
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
          
          <span className="text-xl font-black tracking-tighter uppercase text-white flex items-center">
            BEDNARZAIRLINES.
          </span>
        </div>
      </div>
      <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
        <span 
          onClick={onLogoClick}
          className="hover:text-white cursor-pointer transition-all border-b-2 border-transparent hover:border-blue-500 pb-1"
        >
          Explore
        </span>
        <span 
          onClick={handleMyTrips}
          className="flex items-center gap-2 hover:text-white cursor-pointer transition-all border-b-2 border-transparent hover:border-blue-500 pb-1"
        >
          <Map size={14} className="text-blue-600" />
          My Trips
        </span>
      </div>
<div className="flex-1 flex justify-end items-center gap-6">
  {userName ? (
    <div className="flex items-center gap-6 animate-in fade-in duration-500">
      <div className="hidden sm:block text-right">
        <p className="text-[8px] text-blue-500 uppercase tracking-[0.2em] font-black">Member Profile</p>
        <p className="text-white text-xs font-black tracking-tight flex items-center gap-2 justify-end">
          <UserIcon size={14} /> {userName.toUpperCase()}
        </p>
      </div>
      <button 
        onClick={handleLogout}
        className="group flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all active:scale-95"
      >
        <LogOut size={14} className="group-hover:translate-x-0.5 transition-transform" />
        Sign Out
      </button>
    </div>
  ) : (
    <button 
      onClick={onSignInClick}
      className="group flex items-center gap-3 bg-white/[0.03] border border-white/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 shadow-2xl shadow-black"
    >
      <span>Sign In</span>
      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:bg-current transition-colors" />
    </button>
  )}
</div>

    </nav>
  );
};

export default Navbar;
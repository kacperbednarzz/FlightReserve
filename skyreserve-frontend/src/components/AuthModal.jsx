import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api'; 

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let data;
      if (isLogin) {
        data = await apiService.users.login({ email, password });
      } else {
        data = await apiService.users.register({ firstName, lastName, email, password });
      }

      localStorage.setItem('userId', data.id);
      localStorage.setItem('userName', data.firstName);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('isLoggedIn', 'true');
      
      onClose(); 
      
      window.location.href = "/";
      
    } catch (err) {
      setError(err.message || "Authentication failed. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 blur-[100px]" />
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-all hover:bg-white/5 p-2 rounded-full">
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2">
            {isLogin ? 'WELCOME BACK' : 'JOIN THE CREW'}
          </h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            {isLogin ? 'Access your premium trips' : 'Start your journey with Bednarz Airlines'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={16} />
            <span className="flex-1">{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  required
                  type="text" 
                  placeholder="First Name" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-600 transition"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  required
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-600 transition"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              required
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-600 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              required
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-600 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl mt-4 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase text-xs tracking-widest shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Register Account'} 
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }} 
            className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            {isLogin ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
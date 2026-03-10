import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  
  const premiumCabinImg = "https://images.unsplash.com/photo-1731952161739-bc8bb6d17a76?q=80&w=1472&auto=format&fit=crop";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch('http://localhost:8080/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="mt-40 px-6 max-w-7xl mx-auto mb-20">
      <div className="relative h-[500px] rounded-[3rem] overflow-hidden flex items-center justify-center bg-[#050505] shadow-2xl border border-white/5">
        
        <img 
          src={premiumCabinImg}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          alt="Luxury Aircraft Interior"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/80 backdrop-blur-[1px]" />

        <div className="relative z-10 text-center px-6 w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
            This is where your free adventure <br className="hidden md:block" /> in the sky begins
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light tracking-wide opacity-90">
            {status === 'success' 
              ? "Welcome to the elite fleet, Pilot!" 
              : "Sign up to access hidden deals and instant price drops"}
          </p>

          <div className="max-w-md mx-auto relative group">
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 py-4 text-blue-500 animate-in zoom-in-95 duration-500">
                <CheckCircle2 size={32} />
                <span className="font-bold uppercase tracking-widest text-sm">Successfully Subscribed</span>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className={`flex items-center bg-black/60 backdrop-blur-2xl border rounded-full p-1.5 transition-all duration-300 ${
                  status === 'error' ? 'border-red-500/50' : 'border-white/10 focus-within:border-blue-500/50'
                }`}
              >
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={status === 'error' ? "Something went wrong..." : "Your email address"} 
                  className="w-full bg-transparent py-3 px-6 text-white focus:outline-none text-base placeholder:text-gray-500"
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20 whitespace-nowrap min-w-[140px] flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
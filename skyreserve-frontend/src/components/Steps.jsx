import React from 'react';
import { MapPin, Ticket, CreditCard } from 'lucide-react';

const Steps = () => {
  const steps = [
    {
      id: '01',
      title: 'LOCATION',
      subtitle: 'Select the place of departure and arrival',
      desc: 'Choose your flight fare starting from $80',
      icon: <MapPin className="text-blue-500" size={28} />
    },
    {
      id: '02',
      title: 'FARE',
      subtitle: 'Choose your flight fare',
      desc: 'Choose your direct flight your ticket in 5 min',
      icon: <Ticket className="text-blue-500" size={28} />
    },
    {
      id: '03',
      title: 'PAYMENT',
      subtitle: 'Check your details and pay online',
      desc: 'Quick and secure online payment process',
      icon: <CreditCard className="text-blue-500" size={28} />
    }
  ];

  return (
    <section className="mt-40 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Book your ticket in <span className="text-blue-600">3 steps</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 transition-all duration-500 hover:bg-[#0f0f0f] hover:border-white/10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-between items-start mb-12">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent tracking-tighter italic">
                {step.id}
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all duration-500">
                {step.icon}
              </div>
            </div>

            <div className="relative z-10">
              <h4 className="text-blue-500 font-bold tracking-[0.3em] text-[10px] mb-4 uppercase">
                {step.title}
              </h4>
              <p className="text-white text-2xl font-bold mb-6 leading-tight tracking-tight">
                {step.subtitle}
              </p>
              <div className="w-12 h-[1px] bg-white/10 mb-6 group-hover:w-full transition-all duration-700" />
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/5 blur-[100px] group-hover:bg-blue-600/10 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
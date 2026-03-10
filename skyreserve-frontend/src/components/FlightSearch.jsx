import React, { useState, useEffect, useRef } from 'react';
import { PlaneTakeoff, PlaneLanding, ArrowRightLeft, Calendar, Search, SearchIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css"; 

const FlightSearch = ({ onSearch, availableFlights = [] }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const searchContainerRef = useRef(null);

  const departureAirports = [...new Set(availableFlights.map(f => f.departureCity || f.departure_city).filter(Boolean))].map(city => ({
    name: city, code: city.substring(0, 3).toUpperCase(),
  }));

  const arrivalAirports = [...new Set(availableFlights.map(f => f.arrivalCity || f.arrival_city).filter(Boolean))].map(city => ({
    name: city, code: city.substring(0, 3).toUpperCase(),
  }));

  const handleSwap = (e) => {
    e.stopPropagation();
    const temp = from; setFrom(to); setTo(temp);
  };

  const handleFinalSearch = () => {
    onSearch({ 
      from: from ? from.name : '', 
      to: to ? to.name : '', 
      startDate: startDate
    });
  };

  return (
    <div ref={searchContainerRef} className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <div className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] shadow-2xl p-3 relative">
        <div className="flex flex-wrap lg:flex-nowrap items-center py-2 relative">
          
          <div className="flex-1 px-6 py-4 hover:bg-white/5 rounded-3xl transition cursor-pointer relative" onClick={() => { setShowFromList(!showFromList); setShowToList(false); }}>
            <div className="flex items-center gap-4">
              <PlaneTakeoff size={20} className="text-blue-500" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">From</p>
                <p className="text-sm font-bold text-white uppercase">{from ? from.name : 'Select origin'}</p>
              </div>
            </div>
            {showFromList && (
              <div className="absolute top-full left-0 w-72 mt-4 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 z-[60]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-3">
                  <SearchIcon size={14} className="text-gray-500" />
                  <input autoFocus placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white w-full" value={fromSearch} onChange={(e) => setFromSearch(e.target.value)} />
                </div>
                {departureAirports.filter(ap => ap.name.toLowerCase().includes(fromSearch.toLowerCase())).map((ap) => (
                  <div key={ap.name} onClick={() => { setFrom(ap); setShowFromList(false); }} className="p-3 hover:bg-blue-600 rounded-xl text-white cursor-pointer mb-1 flex justify-between">
                    <span className="font-bold text-xs">{ap.name}</span>
                    <span className="opacity-50 text-[10px]">{ap.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleSwap} className="z-10 bg-blue-600 p-2 rounded-full border-4 border-[#0f0f0f] text-white mx-[-10px] hover:bg-blue-500 transition-all">
            <ArrowRightLeft size={16} />
          </button>


          <div className="flex-1 px-6 py-4 hover:bg-white/5 rounded-3xl transition cursor-pointer relative" onClick={() => { setShowToList(!showToList); setShowFromList(false); }}>
            <div className="flex items-center gap-4">
              <PlaneLanding size={20} className="text-blue-500" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">To</p>
                <p className="text-sm font-bold text-white uppercase">{to ? to.name : 'Where to?'}</p>
              </div>
            </div>
            {showToList && (
              <div className="absolute top-full left-0 w-72 mt-4 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 z-[60]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-3">
                  <SearchIcon size={14} className="text-gray-500" />
                  <input autoFocus placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white w-full" value={toSearch} onChange={(e) => setToSearch(e.target.value)} />
                </div>
                {arrivalAirports.filter(ap => ap.name.toLowerCase().includes(toSearch.toLowerCase())).map((ap) => (
                  <div key={ap.name} onClick={() => { setTo(ap); setShowToList(false); }} className="p-3 hover:bg-blue-600 rounded-xl text-white cursor-pointer mb-1 flex justify-between">
                    <span className="font-bold text-xs">{ap.name}</span>
                    <span className="opacity-50 text-[10px]">{ap.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-12 w-[1px] bg-white/10 mx-2 hidden lg:block" />
          <div className="flex-[1.5] px-6 py-4 hover:bg-white/5 rounded-3xl transition group flex items-center gap-4 relative cursor-pointer">
            <Calendar size={20} className="text-gray-500 group-hover:text-blue-500" />
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              minDate={new Date()}
              customInput={
                <div className="flex gap-4 w-full">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Departure</p>
                    <p className="text-sm font-bold text-white">{startDate ? startDate.toLocaleDateString('pl-PL') : 'Add date'}</p>
                  </div>
                  <div className="flex-1 pl-2 border-l border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Return</p>
                    <p className="text-sm font-bold text-white">{endDate ? endDate.toLocaleDateString('pl-PL') : 'Add date'}</p>
                  </div>
                </div>
              }
            />
          </div>

          <button onClick={handleFinalSearch} className="bg-blue-600 hover:bg-blue-500 text-white h-20 w-20 rounded-[1.8rem] flex items-center justify-center ml-2 transition-all shadow-lg active:scale-95">
            <Search size={28} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
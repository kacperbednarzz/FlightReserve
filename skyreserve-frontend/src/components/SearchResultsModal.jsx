import React from 'react';
import { X, Clock, Plane, Calendar, ChevronRight, AlertCircle } from 'lucide-react';

const SearchResultsModal = ({ isOpen, onClose, flights = [], onSelectFlight, searchParams }) => {
  if (!isOpen) return null;

  const getDisplayDate = () => {
    if (searchParams?.startDate) {
      return new Date(searchParams.startDate).toLocaleDateString('pl-PL', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    }
    if (flights.length > 0) {
      const firstFlightDate = flights[0].departureTime || flights[0].departure_time;
      return new Date(firstFlightDate).toLocaleDateString('pl-PL', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    }
    return "Nie wybrano daty";
  };

  const displayDate = getDisplayDate();

  // NOWA FUNKCJA: Obsługa wyboru, która najpierw czyści widok
  const handleFlightSelection = (flight) => {
    onClose(); // Zamykamy wyniki wyszukiwania
    setTimeout(() => {
      onSelectFlight(flight); // Przekazujemy do App.jsx (tam sprawdzi logowanie/otworzy Booking)
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* HEADER */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-transparent flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-500">
              <Calendar size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Summary</span>
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
              Deparature: <span className="text-blue-500 not-italic">{displayDate}</span>
            </h2>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                 {searchParams?.from || "Skądkolwiek"}
               </span>
               <ChevronRight size={14} className="text-blue-500" />
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                 {searchParams?.to || "Dokądkolwiek"}
               </span>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full text-white/50 transition-all hover:rotate-90">
            <X size={28} />
          </button>
        </div>
        
        {/* LISTA LOTÓW */}
        <div className="p-4 overflow-y-auto space-y-3 custom-scrollbar bg-black/40 min-h-[300px]">
          {flights.length > 0 ? flights.map((flight) => {
            const depTime = new Date(flight.departureTime || flight.departure_time);
            const arrTime = new Date(flight.arrivalTime || flight.arrival_time);
            
            const durationMs = arrTime - depTime;
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

            return (
              <div 
                key={flight.id || flight.flightNumber} 
                onClick={() => handleFlightSelection(flight)}
                className="group relative bg-[#111111] border border-white/5 p-6 rounded-3xl flex items-center justify-between hover:bg-blue-600/[0.08] hover:border-blue-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* DEPARTURE */}
                <div className="flex flex-col items-center min-w-[100px] z-10">
                  <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Departure</span>
                  <span className="text-2xl font-black text-white italic tracking-tighter">
                    {depTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-[10px] text-blue-500 font-bold uppercase">{flight.departureCity}</span>
                </div>

                {/* TRACKER / LINE */}
                <div className="flex-1 px-10 flex flex-col items-center relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-white/30 group-hover:text-blue-500 transition-colors">
                    <Clock size={12} />
                    <span className="text-[10px] font-black tracking-widest">{hours}H {minutes}M</span>
                  </div>
                  
                  <div className="w-full h-[1px] bg-white/10 relative">
                    <div className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    <Plane 
                      size={14} 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-blue-500 fill-blue-500 transition-transform group-hover:scale-125" 
                    />
                  </div>
                  <p className="text-[8px] text-gray-600 font-black uppercase mt-3 tracking-[0.4em]">{flight.flightNumber}</p>
                </div>

                {/* ARRIVAL */}
                <div className="flex flex-col items-center min-w-[100px] z-10">
                  <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Arrival</span>
                  <span className="text-2xl font-black text-white italic tracking-tighter">
                    {arrTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-[10px] text-blue-500 font-bold uppercase">{flight.arrivalCity}</span>
                </div>

                {/* CENA */}
                <div className="flex items-center gap-6 pl-10 ml-4 border-l border-white/5 z-10">
                  <div className="text-right">
                    <p className="text-2xl font-black text-white italic">
                      {flight.ticketPrice} <span className="text-[10px] font-normal text-gray-500 not-italic uppercase">PLN</span>
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[8px] text-blue-600 font-black uppercase tracking-widest">
                       <span>Select</span>
                       <ChevronRight size={10} />
                    </div>
                  </div>
                </div>

                {/* Background Decor */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.01] italic pointer-events-none select-none">
                    {flight.flightNumber}
                </div>
              </div>
            );
          }) : (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <AlertCircle size={40} className="text-gray-700" />
              </div>
              <h3 className="text-white font-black uppercase tracking-widest mb-2 text-xl">Brak lotów</h3>
              <p className="text-gray-600 text-xs uppercase max-w-[300px] leading-relaxed tracking-widest">
                Spróbuj zmienić trasę lub datę. Skupiamy się na największych hubach lotniczych w 2026 roku.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex justify-between items-center px-10">
            <div className="flex items-center gap-4">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
                    Bednarz Airlines Premium
                </span>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsModal;
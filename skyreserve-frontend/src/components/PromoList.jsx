import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Plane } from 'lucide-react';
import { apiService } from '../services/api';

const PromoList = ({ onSelectFlight }) => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const offersPerPage = 3;

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true);
        const data = await apiService.promoTickets.getAll();
        setPromos(data || []);
      } catch (error) {
        console.error("❌ Błąd pobierania promocji przez apiService:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPromos();
  }, []);

  const startIndex = currentPage * offersPerPage;
  const currentOffers = promos.slice(startIndex, startIndex + offersPerPage);

  const nextPage = () => {
    if (startIndex + offersPerPage < promos.length) {
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else {
      setCurrentPage(Math.max(0, Math.ceil(promos.length / offersPerPage) - 1));
    }
  };

  if (loading) return (
    <div className="h-[400px] flex items-center justify-center text-blue-500 font-bold tracking-[0.2em] uppercase animate-pulse">
      Loading Premium Offers...
    </div>
  );

  if (promos.length === 0) return (
    <div className="h-[300px] flex flex-col items-center justify-center text-gray-500 italic border border-white/5 rounded-[2rem] bg-white/5">
      <Plane size={40} className="mb-4 opacity-20" />
      <p className="text-xl mb-2 font-bold text-white/50">No promotional offers</p>
    </div>
  );

  return (
    <section className="mt-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">Promotional tickets</h3>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em]">Exclusive deals for limited time</p>
        </div>
        
        {promos.length > offersPerPage && (
          <div className="flex gap-3">
            <button onClick={prevPage} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white group">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextPage} className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 transition-all text-white group shadow-lg shadow-blue-600/20">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[550px] animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* DUŻA KARTA (GŁÓWNA) */}
        {currentOffers[0] && (
          <div key={`main-${currentOffers[0].id}`} className="md:col-span-5 relative group rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl bg-[#0a0a0a] min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />
            <img 
              src={currentOffers[0].imgUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=1000'} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" 
              alt={currentOffers[0].destination} 
            />
            
            <div className="absolute bottom-28 left-8 z-20">
              <div className="flex items-center gap-2 text-blue-400 mb-1 font-bold tracking-widest text-[9px] uppercase">
                <span>{currentOffers[0].origin || 'POLAND'}</span>
                <ArrowRight size={10} />
                <span>{currentOffers[0].destination}</span>
              </div>
              <h4 className="text-4xl font-black text-white mb-2 tracking-tighter italic uppercase">{currentOffers[0].destination}</h4>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-4 flex justify-between items-center transform transition-transform group-hover:scale-[1.02]">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-0.5">Promo Price</p>
                  <p className="text-2xl font-black text-white">{currentOffers[0].price} <span className="text-xs font-normal text-gray-400">PLN</span></p>
                </div>
                <button 
                  onClick={() => onSelectFlight(currentOffers[0])}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/40"
                >
                  Book <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DWIE BOCZNE KARTY */}
        <div className="md:col-span-7 grid grid-rows-2 gap-6">
          {currentOffers.slice(1).map((offer) => (
            <div key={offer.id} className="relative group rounded-[2rem] overflow-hidden border border-white/5 shadow-xl bg-[#0a0a0a]">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent z-10" />
              <img 
                src={offer.imgUrl || 'https://images.unsplash.com/photo-1500835595353-b0ad2e5831ad?q=80&w=1000'} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" 
                alt={offer.destination} 
              />
              
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-white/10 backdrop-blur-xl px-2.5 py-1 rounded-lg border border-white/10 text-base shadow-lg">✈️</span>
              </div>

              <div className="absolute inset-y-0 left-8 flex flex-col justify-center z-20">
                <div className="flex items-center gap-2 text-blue-400 mb-1 font-bold tracking-widest text-[8px] uppercase">
                  <span>{offer.origin || 'POLAND'}</span>
                  <ArrowRight size={10} />
                  <span>{offer.destination}</span>
                </div>
                <h4 className="text-3xl font-black text-white mb-1 tracking-tighter italic uppercase">{offer.destination}</h4>
                <p className="text-gray-400 text-[10px] max-w-[200px] font-bold uppercase tracking-widest leading-relaxed">
                  Special deal available: {offer.date ? new Date(offer.date).toLocaleDateString() : 'Limited Time'}.
                </p>
              </div>

              <div className="absolute right-6 inset-y-0 flex items-center z-20">
                <div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-4 rounded-[1.5rem] text-center min-w-[130px] group-hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                  <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-0.5">Special Price</p>
                  <p className="text-xl font-black text-white mb-3">{offer.price} <span className="text-[10px] font-normal text-gray-400">PLN</span></p>
                  <button 
                    onClick={() => onSelectFlight(offer)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full mx-auto flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-blue-600/20"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoList;
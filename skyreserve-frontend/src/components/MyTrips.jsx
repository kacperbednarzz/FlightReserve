import React, { useEffect, useState } from 'react';
import { Plane, Trash2, ShieldCheck, Loader2, RefreshCw, UserCheck } from 'lucide-react';
import { apiService } from '../services/api';
import DeleteConfirmModal from './DeleteConfirmModal';

const MyTrips = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const fetchMyTrips = async () => {
    const storedId = localStorage.getItem('userId');
    
    if (!storedId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const userId = parseInt(storedId);
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.bookings.getUserBookings(userId);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Terminal Link Lost");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchMyTrips(); 
  }, []);

  const requestDelete = (id) => {
    setBookingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookingToDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setBookings(prev => prev.filter(b => b.id !== bookingToDelete));
        console.log(`Mission terminated: ${bookingToDelete}`);
      } else {
        alert("Database error during deletion.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server connection error.");
    } finally {
      setIsDeleteModalOpen(false);
      setBookingToDelete(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-60 bg-black">
      <Loader2 className="text-blue-500 animate-spin" size={40} />
      <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em] mt-4">Syncing Fleet...</p>
    </div>
  );

  return (
    <div className="py-20 max-w-5xl mx-auto px-6 bg-black min-h-screen">
      
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            MY <span className="text-blue-600">FLIGHTS</span>
          </h1>
        </div>
        <button onClick={fetchMyTrips} className="p-3 bg-white/5 rounded-full hover:bg-blue-600 transition-all group">
          <RefreshCw size={16} className="text-gray-400 group-hover:text-white" />
        </button>
      </div>

      <div className="grid gap-6">
        {bookings.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-gray-600 font-black uppercase tracking-widest italic text-[10px]">You currently have no reservationts.</p>
          </div>
        ) : (
          bookings.map((booking) => {
            const fl = booking.flight || {};
            const depCity = fl.departureCity || fl.departure_city || "TBD";
            const arrCity = fl.arrivalCity || fl.arrival_city || "TBD";
            const passengers = booking.passengers || [];

            return (
              <div key={booking.id} className="group relative bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-500">
                <div className="flex flex-col md:flex-row items-stretch">
                  
                  <div className="flex-1 p-8 flex items-center justify-between gap-8 border-b md:border-b-0 md:border-r border-white/5">
                    <div className="flex-1">
                      <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Origin</p>
                      <h2 className="text-2xl font-black text-white uppercase italic">{depCity}</h2>
                    </div>
                    <div className="flex flex-col items-center">
                      <Plane size={14} className="text-blue-600 rotate-90" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Destination</p>
                      <h2 className="text-2xl font-black text-white uppercase italic">{arrCity}</h2>
                    </div>
                  </div>

                  <div className="p-8 flex items-center gap-8 bg-white/[0.01]">
                    <div className="text-center">
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Date</p>
                      <p className="text-xs font-bold text-white uppercase">
                        {fl.departureTime ? new Date(fl.departureTime).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Price</p>
                      <p className="text-xs font-black text-white">{booking.totalPrice} PLN</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center p-6 bg-white/[0.03]">
                    <button 
                      onClick={() => requestDelete(booking.id)}
                      className="p-4 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="px-8 py-4 bg-black/40 border-t border-white/5 flex flex-wrap gap-3 items-center">
                  <UserCheck size={12} className="text-blue-600 mr-2" />
                  {passengers.map((p, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                      <span className="text-[9px] font-bold text-gray-300 uppercase">
                        {p.firstName} {p.lastName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyTrips;
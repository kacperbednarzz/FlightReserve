import React, { useState, useEffect } from 'react';
import { X, Plane, CreditCard, Loader2, CheckCircle2, ShieldCheck, UserPlus, Trash2, Users } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, flight, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [passengers, setPassengers] = useState([
    { firstName: '', lastName: '', passportNumber: '', email: '' }
  ]);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setLoading(false);
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        const newPassengers = [{ firstName: storedName, lastName: '', passportNumber: '', email: '' }];
        setPassengers(newPassengers);
      } else {
        setPassengers([{ firstName: '', lastName: '', passportNumber: '', email: '' }]);
      }
    }
  }, [isOpen]);

  if (!isOpen || !flight) return null;

  const departureCity = flight.departureCity || flight.departure_city;
  const arrivalCity = flight.arrivalCity || flight.arrival_city;
  const singlePrice = flight.ticketPrice || flight.ticket_price;
  const totalPrice = singlePrice * passengers.length;

  const addPassenger = () => {
    if (passengers.length < 5) {
      setPassengers([...passengers, { firstName: '', lastName: '', passportNumber: '', email: '' }]);
    }
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = field === 'passportNumber' ? value.toUpperCase() : value;
    setPassengers(newPassengers);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      await onConfirm(passengers);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (error) {
      console.error(" Booking Error Details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        
        {!success ? (
          <>
            <div className="p-8 border-b border-white/5 flex justify-between items-center relative shrink-0">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/10 blur-[60px] rounded-full" />
              <div>
                <div className="flex items-center gap-2 text-blue-500 mb-1">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Group Reservation</span>
                </div>
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                  Finalize <span className="text-blue-500">Tickets</span>
                </h2>
              </div>
              

              <button 
                type="button"
                onClick={onClose} 
                className="z-10 p-3 text-gray-500 hover:text-white transition-all hover:bg-white/10 rounded-full active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-black/20">
              <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 mb-8 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-blue-600/20 flex items-center justify-center rounded-2xl">
                    <Plane size={24} className="text-blue-500 fill-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest">Selected Route</p>
                    <p className="text-xl font-black text-white uppercase italic">
                      {departureCity} <span className="text-blue-600">→</span> {arrivalCity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest">Total Price</p>
                  <p className="text-2xl font-black text-white italic">{totalPrice} <span className="text-xs not-italic text-blue-500">PLN</span></p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Passengers ({passengers.length})</span>
                  </div>
                  <button 
                    type="button"
                    onClick={addPassenger}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                  >
                    <UserPlus size={14} /> Add Passenger
                  </button>
                </div>

                {passengers.map((p, index) => (
                  <div key={index} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] relative group animate-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black text-blue-500/50 uppercase tracking-widest italic">
                        Passenger #{index + 1} {index === 0 && "(Lead)"}
                      </span>
                      {index > 0 && (
                        <button type="button" onClick={() => removePassenger(index)} className="text-red-500/50 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-full">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] text-gray-500 font-black uppercase ml-2 text-left block">First Name</label>
                        <input required 
                          className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all" 
                          value={p.firstName} 
                          placeholder="Name"
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] text-gray-500 font-black uppercase ml-2 text-left block">Last Name</label>
                        <input required 
                          className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all" 
                          value={p.lastName} 
                          placeholder="Last Name"
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <label className="text-[8px] text-gray-500 font-black uppercase ml-2 text-left block">Passport / ID Number</label>
                      <input required 
                        className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-white text-xs font-bold focus:border-blue-500 outline-none transition-all uppercase" 
                        placeholder="e.g. ID12345678"
                        maxLength={10}
                        value={p.passportNumber} 
                        onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/[0.01] shrink-0">
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading} 
                className="w-full group bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-black uppercase tracking-[0.3em] py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-[0.98] text-xs shadow-xl shadow-blue-600/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="py-24 text-center animate-in zoom-in-95 relative">
            <button 
                onClick={onClose} 
                className="absolute top-8 right-8 p-3 text-gray-500 hover:text-white transition-all hover:bg-white/5 rounded-full"
              >
                <X size={24} />
            </button>
            <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 border-2 border-blue-600 rounded-full animate-ping opacity-20" />
                <CheckCircle2 size={48} className="text-blue-500" />
            </div>
            <h2 className="text-4xl font-black italic text-white mb-2 uppercase tracking-tighter">Flight booked successfully</h2>
            <p className="text-gray-500 text-xs font-black mb-10 uppercase tracking-[0.3em]">Details in the my flights section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
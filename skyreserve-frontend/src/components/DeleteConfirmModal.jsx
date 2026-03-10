import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
  
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0c0c0c] border border-red-500/30 rounded-[2rem] max-w-md w-full p-8 overflow-hidden shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)]">
        
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 blur-[80px] rounded-full" />
        
        <div className="relative text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle className="text-red-500" size={32} />
          </div>

          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">
            CANCEL YOUR <span className="text-red-500">FLIGHT?</span>
          </h3>
          
          <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8 uppercase tracking-widest">
            This action will permanently delete the booking from the central database. This cannot be undone.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all border border-white/5"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              Confirm
            </button>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
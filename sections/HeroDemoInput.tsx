'use client';
import React from 'react';

interface HeroDemoInputProps {
  phone: string;
  setPhone: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  phoneErr: boolean;
  requestCall: () => void;
  callState: 'idle' | 'connecting' | 'ringing' | 'initiated';
}

const HeroDemoInput = ({ 
  phone, setPhone, name, setName, phoneErr, requestCall, callState 
}: HeroDemoInputProps) => {
  return (
    <div className="flex gap-2.5 items-center px-5 py-5 border-t border-black/6 flex-wrap bg-gray-50/30">
      <select className="text-xs font-semibold px-2.5 py-3 border border-black/10 rounded-lg bg-white text-black w-20 focus:outline-none focus:border-green-500 min-h-[44px]">
        <option>+91</option><option>+1</option><option>+44</option>
      </select>
      <input 
        type="tel"
        inputMode="tel"
        value={phone} 
        onChange={e => setPhone(e.target.value)} 
        placeholder="Phone number *" 
        maxLength={10}
        aria-label="Phone number"
        className={`flex-1 min-w-[150px] text-xs px-4 py-3 border rounded-lg bg-white text-black placeholder:text-black/30 focus:outline-none transition-colors min-h-[44px] ${phoneErr ? 'border-red-400' : 'border-black/10 focus:border-green-500'}`} 
      />
      <input 
        type="text"
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Your name"
        aria-label="Your name"
        className="flex-1 min-w-[120px] text-xs px-4 py-3 border border-black/10 rounded-lg bg-white text-black placeholder:text-black/30 focus:outline-none focus:border-green-500 transition-colors min-h-[44px]" 
      />
      <button 
        onClick={requestCall} 
        disabled={callState !== 'idle'}
        className="w-full md:w-auto bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-200 text-white font-black text-xs px-8 py-3 rounded-xl transition-all whitespace-nowrap min-h-[44px] shadow-lg shadow-green-500/20 active:scale-[0.98]"
      >
        Get a Call →
      </button>
    </div>
  );
};

export default React.memo(HeroDemoInput);

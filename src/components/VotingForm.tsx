'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Send } from 'lucide-react';

interface VotingFormProps {
  onVote: (amount: number) => void;
}

export default function VotingForm({ onVote }: VotingFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [unit, setUnit] = useState<'yen' | 'man'>('man');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(inputValue.replace(/,/g, ''));
    if (isNaN(num)) return;
    
    const amount = unit === 'man' ? num * 10000 : num;
    onVote(amount);
  };

  const formattedValue = inputValue ? Number(inputValue.replace(/,/g, '')).toLocaleString() : '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
    >
      <div className="text-center mb-10">
        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Coins className="text-indigo-600 w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Asset Quest</h1>
        <p className="text-slate-500">あなたの現在の貯金額（純資産）を教えてください。</p>
        <p className="text-xs text-slate-400 mt-1">※データは匿名で集計され、公開されることはありません。</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={formattedValue}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              setInputValue(val);
            }}
            placeholder="0"
            className="w-full text-4xl font-bold text-center py-6 px-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all outline-none text-slate-700"
            autoFocus
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={() => setUnit('man')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${unit === 'man' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              万円
            </button>
            <button
              type="button"
              onClick={() => setUnit('yen')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${unit === 'yen' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              円
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[10, 100, 500, 1000].map((quickVal) => (
            <button
              key={quickVal}
              type="button"
              onClick={() => {
                setInputValue(quickVal.toString());
                setUnit('man');
              }}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition-colors"
            >
              +{quickVal}万
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={!inputValue || parseInt(inputValue) === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-lg font-bold py-5 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          結果を召喚する
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}

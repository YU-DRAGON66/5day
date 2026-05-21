'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Stats } from '@/lib/types';
import { getCharacter, CHARACTERS } from '@/lib/constants';
import { 
  User, 
  Zap, 
  Crown, 
  Shield, 
  Sword, 
  TrendingUp, 
  Database, 
  RefreshCcw 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultDisplayProps {
  amount: number;
  stats: Stats;
  onReset: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Crown,
  Shield,
  Sword,
  User,
};

export default function ResultDisplay({ amount, stats, onReset }: ResultDisplayProps) {
  const character = getCharacter(amount);
  const IconComponent = ICON_MAP[character.iconName] || User;

  const chartData = [
    { name: 'あなた', value: amount, color: '#4f46e5' },
    { name: '平均値', value: stats.mean, color: '#94a3b8' },
    { name: '中央値', value: stats.median, color: '#cbd5e1' },
    { name: '最頻値', value: stats.mode, color: '#e2e8f0' },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 100000000) return `${(val / 100000000).toFixed(1)}億円`;
    if (val >= 10000) return `${(val / 10000).toLocaleString()}万円`;
    return `${val.toLocaleString()}円`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Character Reveal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className={`relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl bg-gradient-to-br ${character.color}`}
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/20 p-6 rounded-full backdrop-blur-md mb-6 border border-white/30"
          >
            <IconComponent size={64} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-bold tracking-widest uppercase mb-2 inline-block backdrop-blur-sm border border-white/20">
              Rank: {character.title}
            </span>
            <h2 className="text-5xl font-black mb-4 tracking-tighter">{character.name}</h2>
            <p className="max-w-md mx-auto text-white/90 leading-relaxed italic">
              「{character.description}」
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* Stats Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" />
            資産力比較
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-xl border border-slate-100">
                          <p className="font-bold text-slate-800">{payload[0].value?.toLocaleString()}円</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-300">
            <Database className="text-indigo-400" />
            集計データ（{stats.totalVotes.toLocaleString()}人）
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-slate-400 text-sm">あなたの貯金額</span>
              <span className="text-2xl font-bold text-white">{formatCurrency(amount)}</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-4">
                <span className="text-slate-400 text-sm">平均値</span>
                <span className="font-mono text-indigo-300 font-bold">{formatCurrency(stats.mean)}</span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-slate-400 text-sm">中央値</span>
                <span className="font-mono text-indigo-300 font-bold">{formatCurrency(stats.median)}</span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-slate-400 text-sm">最頻値</span>
                <span className="font-mono text-indigo-300 font-bold">{formatCurrency(stats.mode)}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onReset}
            className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            もう一度投票する
          </button>
        </motion.div>
      </div>

      {/* Pyramid visualization (Simplified) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
      >
        <h3 className="text-xl font-bold text-slate-800 mb-8 text-center">資産ピラミッドにおける立ち位置</h3>
        <div className="flex flex-col items-center gap-1">
          {CHARACTERS.map((c, i) => (
            <div 
              key={c.layer}
              className={`h-10 transition-all duration-700 rounded-lg flex items-center justify-center text-xs font-bold border-2 ${
                character.layer === c.layer 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 scale-105 shadow-md' 
                  : 'border-slate-100 bg-slate-50 text-slate-400 opacity-50'
              }`}
              style={{ width: `${(5 - i) * 20}%` }}
            >
              {c.title} {character.layer === c.layer && '📍'}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

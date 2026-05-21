'use client';

import React, { useState } from 'react';
import VotingForm from './VotingForm';
import ResultDisplay from './ResultDisplay';
import { Stats, VoteData } from '@/lib/types';

const MOCK_STATS: Stats = {
  mean: 18500000,
  median: 8000000,
  mode: 1000000,
  totalVotes: 1240,
};

export default function VotingApp() {
  const [hasVoted, setHasVoted] = useState(false);
  const [currentAmount, setCurrentAmount] = useState<number | null>(null);
  const [stats, setStats] = useState<Stats>(MOCK_STATS);

  const handleVote = (amount: number) => {
    setCurrentAmount(amount);
    // In a real app, we would send this to Supabase and fetch updated stats
    setHasVoted(true);
    
    // Simulate updating stats locally for demo
    setStats(prev => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      // (Simplistic logic for demo purposes)
      mean: (prev.mean * prev.totalVotes + amount) / (prev.totalVotes + 1)
    }));
  };

  const handleReset = () => {
    setHasVoted(false);
    setCurrentAmount(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {!hasVoted ? (
        <VotingForm onVote={handleVote} />
      ) : (
        <ResultDisplay 
          amount={currentAmount || 0} 
          stats={stats} 
          onReset={handleReset}
        />
      )}
    </div>
  );
}

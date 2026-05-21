export type AssetLayer = 'mass' | 'upper-mass' | 'semi-affluent' | 'affluent' | 'ultra-affluent';

export interface Character {
  layer: AssetLayer;
  name: string;
  title: string;
  description: string;
  minAmount: number; // in Yen
  color: string;
  iconName: string;
}

export interface VoteData {
  amount: number;
  created_at: string;
}

export interface Stats {
  mean: number;
  median: number;
  mode: number;
  totalVotes: number;
}

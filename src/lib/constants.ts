import { Character } from './types';

export const CHARACTERS: Character[] = [
  {
    layer: 'ultra-affluent',
    name: 'ゼウス',
    title: '至高神',
    description: '全知全能の財力を持ち、世界を動かす頂点。黄金の覇気がすべてを圧倒する。',
    minAmount: 500000000, // 5億円
    color: 'from-yellow-400 to-yellow-600',
    iconName: 'Zap',
  },
  {
    layer: 'affluent',
    name: 'エンペラー',
    title: '覇王',
    description: '広大な領土（資産）を統治する支配者。その一言で経済が揺れ動く。',
    minAmount: 100000000, // 1億円
    color: 'from-purple-500 to-indigo-600',
    iconName: 'Crown',
  },
  {
    layer: 'semi-affluent',
    name: 'パラディン',
    title: '聖騎士',
    description: '盤石の守りを誇る、資産防衛の達人。未来への盾は決して壊れない。',
    minAmount: 50000000, // 5000万円
    color: 'from-blue-400 to-cyan-500',
    iconName: 'Shield',
  },
  {
    layer: 'upper-mass',
    name: 'レンジャー',
    title: '精鋭冒険者',
    description: '数々の困難を乗り越え、中堅層のリーダーとなった実力者。上昇志向の塊。',
    minAmount: 30000000, // 3000万円
    color: 'from-green-400 to-emerald-600',
    iconName: 'Sword',
  },
  {
    layer: 'mass',
    name: 'ビギナー',
    title: '見習い冒険者',
    description: 'これからの冒険を夢見る若き挑戦者。その伸び代は無限大だ。',
    minAmount: 0,
    color: 'from-gray-300 to-slate-400',
    iconName: 'User',
  },
];

export const getCharacter = (amount: number): Character => {
  return CHARACTERS.find((c) => amount >= c.minAmount) || CHARACTERS[CHARACTERS.length - 1];
};

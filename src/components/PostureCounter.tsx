'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Bluetooth, RefreshCcw, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';

export default function PostureCounter() {
  // --- 3. 状態管理 (State) の定義 ---
  const [isConnected, setIsConnected] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'GOOD' | 'BAD'>('GOOD');
  const [badCount, setBadCount] = useState(0);
  const lastTimestampRef = useRef<number>(0);

  // --- 4. 処理のロジック ---

  // ステップ2用：micro:bit接続関数（スタブ）
  const connectMicrobit = async () => {
    console.log('Web Serial API 接続開始（ステップ2で実装予定）');
    // 擬似的に接続状態をトグル
    setIsConnected(!isConnected);
  };

  // 擬似Badボタン：手動で姿勢悪化状態をシミュレート
  const simulateBad = useCallback(() => {
    const now = Date.now();
    setCurrentStatus('BAD');

    // 仕様通り：2秒以内の連続カウントを防止
    if (now - lastTimestampRef.current > 2000) {
      setBadCount((prev) => prev + 1);
      lastTimestampRef.current = now;
    }

    // 1.5秒後に自動でGOODに戻す（シミュレーション用演出）
    setTimeout(() => {
      setCurrentStatus('GOOD');
    }, 1500);
  }, []);

  // カウントを0に戻す
  const resetCount = () => {
    setBadCount(0);
    setCurrentStatus('GOOD');
    lastTimestampRef.current = 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* ① Header コンポーネント */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="text-indigo-600" size={24} />
            <h1 className="text-xl font-black tracking-tighter text-slate-800">
              しせいシャキッと！
            </h1>
          </div>
          <button
            onClick={connectMicrobit}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 ${
              isConnected
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            <Bluetooth size={18} />
            {isConnected ? '接続済み' : 'micro:bitに接続'}
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6 space-y-6">
        {/* ② StatusCard コンポーネント */}
        <div
          className={`relative overflow-hidden rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center transition-all duration-700 border-4 ${
            currentStatus === 'GOOD'
              ? 'bg-green-50 border-green-100 text-green-600'
              : 'bg-red-50 border-red-100 text-red-600 scale-[1.02] shadow-2xl shadow-red-200'
          }`}
        >
          {currentStatus === 'GOOD' ? (
            <div className="animate-in zoom-in duration-500">
              <CheckCircle size={100} className="mb-6 drop-shadow-sm" />
              <h2 className="text-4xl font-black mb-2">いい姿勢！</h2>
              <p className="text-green-500 font-bold">その調子でキープ👍</p>
            </div>
          ) : (
            <div className="animate-in zoom-in duration-300">
              <AlertTriangle size={100} className="mb-6 drop-shadow-sm animate-bounce" />
              <h2 className="text-4xl font-black mb-2">背中が丸まってるよ！</h2>
              <p className="text-red-500 font-bold">シャキッと伸ばそう💀</p>
            </div>
          )}
          
          {/* 装飾用背景 */}
          <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl ${currentStatus === 'GOOD' ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>

        {/* ③ CounterCard コンポーネント */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 flex flex-col items-center">
          <p className="text-slate-400 font-extrabold mb-4 uppercase tracking-[0.2em] text-xs">
            姿勢が悪くなった累計回数
          </p>
          <div className="relative mb-10">
            <span className="text-[10rem] leading-none font-black text-slate-800 tracking-tighter tabular-nums">
              {badCount}
            </span>
            <span className="absolute -bottom-2 -right-8 text-2xl font-black text-slate-300">
              回
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={resetCount}
              className="group flex flex-col items-center justify-center gap-2 py-6 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-[1.5rem] transition-all border border-slate-100"
            >
              <RefreshCcw size={24} className="group-active:rotate-180 transition-transform duration-500" />
              <span className="text-sm">リセット</span>
            </button>
            <button
              onClick={simulateBad}
              className="group flex flex-col items-center justify-center gap-2 py-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-[1.5rem] shadow-xl shadow-red-200 transition-all transform active:scale-95"
            >
              <AlertTriangle size={24} />
              <span className="text-sm">擬似Badボタン</span>
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-[10px] text-slate-400 font-medium border border-slate-100">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            開発モード：2秒間のチャタリング防止が有効です
          </div>
        </div>
      </main>
    </div>
  );
}

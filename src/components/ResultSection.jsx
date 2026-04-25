import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const ResultSection = ({ result, onReset }) => {
  const typedResult = useTypewriter(result, 50);
  const isFinished = typedResult === result;

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-yellow-500/30 p-8 md:p-12 rounded-3xl shadow-2xl relative">
      <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-500"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-500"></div>
      
      <h2 className="text-yellow-500 text-sm font-bold tracking-[0.3em] uppercase mb-6 flex items-center">
        <span className="w-8 h-px bg-yellow-500/50 mr-3"></span>
        신비의 분석 결과
        <span className="w-8 h-px bg-yellow-500/50 ml-3"></span>
      </h2>

      <div className="min-h-[200px]">
        <p className="text-xl md:text-2xl leading-relaxed text-gray-100 break-keep">
          {typedResult}
          {!isFinished && (
            <span className="inline-block w-1 h-6 ml-1 bg-yellow-500 animate-pulse align-middle"></span>
          )}
        </p>
      </div>

      <div className={`mt-12 flex justify-center transition-opacity duration-1000 ${isFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 rounded-full tracking-widest font-bold text-sm"
        >
          다시 제물 바치기
        </button>
      </div>
    </div>
  );
};

export default ResultSection;

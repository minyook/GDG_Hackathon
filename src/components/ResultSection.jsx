import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const ResultSection = ({ result, onReset }) => {
  const typedResult = useTypewriter(result, 50);
  const isFinished = typedResult === result;

  return (
    <div className="w-full">
      {/* 상단 뒤로가기 버튼 추가 */}
      <div className="flex justify-start mb-6">
        <button 
          onClick={onReset}
          className="flex items-center text-gray-500 hover:text-purple-400 transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          처음으로 돌아가기
        </button>
      </div>

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

        <div className={`mt-12 flex justify-center transition-all duration-1000 ${isFinished ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
          <button 
            onClick={onReset}
            className="px-10 py-4 bg-gradient-to-r from-purple-900 to-purple-700 border border-purple-500/50 text-white hover:from-purple-800 hover:to-purple-600 transition-all duration-300 rounded-full tracking-widest font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            새로운 제물 바치기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;

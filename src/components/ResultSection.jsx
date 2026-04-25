import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter.js';

const ResultSection = ({ result, onReset }) => {
  // result 객체: { fate, fortune_score, lucky_color, lucky_item, imageUrl }
  const typedResult = useTypewriter(result.fate || "", 40);
  const isFinished = typedResult === result.fate;
  
  // 게이지 계산 (반지름 45 기준 둘레 약 283)
  const strokeDashoffset = 283 - (283 * (result.fortune_score || 0)) / 100;

  return (
    <div className="w-full max-w-3xl flex flex-col items-center space-y-10 animate-in fade-in duration-1000 pb-20">
      {/* 상단 뒤로가기 버튼 */}
      <div className="flex justify-start w-full">
        <button 
          onClick={onReset}
          className="flex items-center text-gray-500 hover:text-purple-400 transition-colors group text-sm"
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          처음으로 돌아가기
        </button>
      </div>

      {/* 메인 분석 결과 창 */}
      <div className="w-full bg-gray-900/80 backdrop-blur-xl border border-yellow-500/30 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden h-auto">
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-500"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-500"></div>
        
        <h2 className="text-yellow-500 text-sm font-bold tracking-[0.3em] uppercase mb-10 flex items-center justify-center">
          <span className="w-8 h-px bg-yellow-500/50 mr-3"></span>
          신비의 분석 보고서
          <span className="w-8 h-px bg-yellow-500/50 ml-3"></span>
        </h2>

        <div className="flex flex-col items-center space-y-12">
          {/* 이미지 미리보기 (상단 고정) */}
          {result.imageUrl && (
            <div className="w-56 h-56 md:w-80 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.4)] transform hover:scale-105 transition-transform duration-700">
              <img src={result.imageUrl} alt="제물의 형상" className="w-full h-full object-cover" />
            </div>
          )}

          {/* 분석 텍스트 (하단 배치, 줄바꿈 유지) */}
          <div className="w-full min-h-[200px] px-2">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-100 whitespace-pre-wrap break-keep text-center md:text-left font-serif">
              {typedResult}
              {!isFinished && (
                <span className="inline-block w-1 h-6 ml-1 bg-yellow-500 animate-pulse align-middle"></span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 수치 시각화 및 처방 섹션 */}
      <div className={`grid md:grid-cols-2 gap-6 w-full transition-all duration-1000 transform ${typedResult.length > 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 1. 영적 에너지 게이지 & 그래프 */}
        <div className="bg-gray-900/60 border border-purple-900/30 p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <svg className="w-20 h-20 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z"/>
            </svg>
          </div>
          
          <h3 className="text-purple-400 text-[11px] font-bold mb-6 tracking-[0.2em] uppercase opacity-80 z-10">Spirit Energy 동기화율</h3>
          
          <div className="w-full space-y-6 z-10">
            {/* 원형 게이지와 수치 */}
            <div className="flex items-center justify-around">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-800" />
                  <circle 
                    cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" 
                    className="text-yellow-500 transition-all duration-[2500ms] ease-out"
                    strokeDasharray="251"
                    strokeDashoffset={isFinished ? 251 - (251 * result.fortune_score) / 100 : 251}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-black text-white">{result.fortune_score}</span>
                  <span className="text-[7px] text-yellow-600 font-bold uppercase">Sync</span>
                </div>
              </div>

              <div className="flex-1 ml-6 space-y-2">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono italic">
                  <span>UNSTABLE</span>
                  <span>PERFECT</span>
                </div>
                {/* 선형 프로그레스 바 그래프 */}
                <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-green-400 transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                    style={{ width: `${result.fortune_score}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-green-400 text-right font-bold tracking-tighter italic mt-1">
                  * 현재 영적 주파수: {result.fortune_score}% 일치
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 도사님의 처방전 */}
        <div className="bg-gray-900/60 border border-purple-900/30 p-6 rounded-3xl space-y-4 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
          <h3 className="text-purple-400 text-[11px] font-bold mb-2 tracking-[0.2em] text-center uppercase opacity-80">도사님의 영험한 처방</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-950/50 rounded-xl border border-purple-500/10">
              <span className="text-gray-500 text-[10px] font-bold">길한 색상</span>
              <span className="text-yellow-200 font-bold text-sm">{result.lucky_color}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-950/50 rounded-xl border border-purple-500/10">
              <span className="text-gray-500 text-[10px] font-bold">행운의 물건</span>
              <span className="text-yellow-200 font-bold text-sm">{result.lucky_item}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-center w-full pt-4 transition-all duration-1000 ${isFinished ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
        <button 
          onClick={onReset}
          className="px-10 py-4 bg-gradient-to-r from-purple-900 to-purple-700 border border-purple-500/50 text-white hover:from-purple-800 hover:to-purple-600 transition-all duration-300 rounded-full tracking-widest font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          새로운 제물 바치기
        </button>
      </div>
    </div>
  );
};

export default ResultSection;

import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "표면 스크래치에서 전생의 업보 추출 중...",
  "찌그러진 각도로 초년기 풍파 계산 중...",
  "음양오행 데이터베이스와 동기화 중...",
  "사물 바닥면의 제조 일자로 사주팔자 분석 중...",
  "담겼던 흔적과 잔류 성분으로 성격 파악 중...",
  "우주의 기운을 모아 무생물의 영혼과 대화 중..."
];

const LoadingState = () => {
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[index]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-yellow-500 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-b-4 border-purple-500 rounded-full animate-spin transition-all duration-1000" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="h-12 text-center">
        <p className="text-2xl font-medium text-purple-300 animate-pulse tracking-tight">
          {loadingText}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;

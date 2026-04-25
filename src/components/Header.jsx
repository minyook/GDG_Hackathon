import React from 'react';

const Header = ({ minimized }) => {
  return (
    <header className={`transition-all duration-1000 transform ${minimized ? 'scale-75 opacity-50' : 'scale-100'}`}>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 tracking-tighter drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
          네 텀블러의 팔자가 <br className="md:hidden" /> 참으로 기구하구나
        </h1>
        <p className="text-purple-400 text-lg md:text-xl font-medium tracking-widest uppercase">
          우주의 기운을 모아 무생물의 관상과 전생을 분석해 드립니다
        </p>
      </div>
    </header>
  );
};

export default Header;

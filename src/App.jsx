import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import LoadingState from './components/LoadingState';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';

const results = [
  "허허... 이 텀블러, 전생에 만주벌판을 달리던 장군님의 물그릇이었구먼. 겉은 차가운 스테인리스나 속은 뜨거운 열정을 품었으니, 뜨거운 아메리카노만 담기길 원하고 있어. 하지만 조심하게, 이번 달에는 바닥으로 추락할 낙마(落馬)의 살이 끼어있으니 컵홀더를 꼭 챙기게나.",
  "이 사과 꽁다리를 보아하니... 태생부터 비범하군. 비록 지금은 앙상하게 뼈대만 남았으나, 그 과육은 수많은 이들에게 기쁨을 주었소. 관상학적으로 꼭대기의 꼭지가 길게 뻗은 것이 장수할 팔자였으나 인간의 식탐을 이기지 못했구먼. 다음 생엔 거대한 사과나무 숲의 주인이 될 것이야.",
  "자네의 마우스... 참으로 기구한 팔자로다. 하루 수만 번의 클릭질에 손가락의 기운이 억눌려 있구먼. 왼쪽 버튼의 마모도를 보니 참을성이 대단한 성격이야. 하지만 밤마다 휠을 굴리는 소리에 외로움이 묻어나는군. 가끔은 마우스 패드 위에서 휴식을 주어야 큰 고장을 면할 것이야."
];

function App() {
  const [appState, setAppState] = useState('idle'); // 'idle', 'loading', 'result'
  const [result, setResult] = useState('');

  const handleUpload = () => {
    setAppState('loading');
    // 실제 환경에서는 여기서 FastAPI 서버로 이미지를 전송하고 결과를 받아올 예정입니다.
    setTimeout(() => {
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setResult(randomResult);
      setAppState('result');
    }, 5000);
  };

  const handleReset = () => {
    setAppState('idle');
    setResult('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-900 rounded-full blur-[120px]"></div>
      </div>

      <Header minimized={appState !== 'idle'} />

      <main className="w-full max-w-2xl z-10 flex flex-col items-center">
        {appState === 'idle' && <UploadZone onUpload={handleUpload} />}
        {appState === 'loading' && <LoadingState />}
        {appState === 'result' && <ResultSection result={result} onReset={handleReset} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;

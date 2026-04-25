import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import UploadZone from '../components/UploadZone.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ResultSection from '../components/ResultSection.jsx';
import { analyzeFate } from '../api.js';

const Home = () => {
  const [appState, setAppState] = useState('idle');
  const [result, setResult] = useState('');

  const handleUpload = async (data) => {
    setAppState('loading');
    try {
      const response = await analyzeFate(data);
      setResult(response.fate || response.result); // 백엔드 응답 필드에 맞춰 조정
      setAppState('result');
    } catch (error) {
      alert("우주의 기운이 불안정하여 분석에 실패했습니다. 다시 시도해 주세요.");
      setAppState('idle');
    }
  };

  const handleReset = () => {
    setAppState('idle');
    setResult('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Header minimized={appState !== 'idle'} />
      <main className="w-full max-w-2xl z-10 flex flex-col items-center">
        {appState === 'idle' && <UploadZone onUpload={handleUpload} />}
        {appState === 'loading' && <LoadingState />}
        {appState === 'result' && <ResultSection result={result} onReset={handleReset} />}
      </main>
    </div>
  );
};

export default Home;

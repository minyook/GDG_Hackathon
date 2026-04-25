import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import UploadZone from '../components/UploadZone.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ResultSection from '../components/ResultSection.jsx';
import CompatibilityZone from '../components/CompatibilityZone.jsx';
import { analyzeFate } from '../api.js';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Home = () => {
  const [appState, setAppState] = useState('idle');
  const [result, setResult] = useState('');
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsMember(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleAnalysis = async (payload) => {
    setAppState('loading');
    
    // 이미지 로컬 미리보기 생성 (궁합인 경우 여러 장 처리)
    let imageUrls = [];
    if (payload.images && payload.images.length > 0) {
      imageUrls = payload.images.map(img => img ? URL.createObjectURL(img) : null).filter(Boolean);
    }

    try {
      const response = await analyzeFate(payload);
      
      const isCompatibility = payload.images && payload.images.length > 1;
      const detectedName = isCompatibility 
        ? "운명적 궁합 분석 (두 기운의 만남)" 
        : (payload.itemName || "이름 없는 제물");

      const analysisData = {
        fate: response.result_text,
        fortune_score: response.fortune_score,
        lucky_color: response.lucky_color,
        lucky_item: response.lucky_item,
        imageUrls: imageUrls, // 배열로 변경
        itemName: detectedName
      };
      
      setResult(analysisData);

      if (auth.currentUser) {
        try {
          await addDoc(collection(db, "fates"), {
            userId: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            itemName: detectedName,
            fate: analysisData.fate,
            fortune_score: analysisData.fortune_score,
            lucky_color: analysisData.lucky_color,
            lucky_item: analysisData.lucky_item,
            imageUrl: imageUrl,
            isMember: payload.isMember,
            createdAt: serverTimestamp()
          });
        } catch (dbError) {
          console.error("DB 기록 실패:", dbError);
        }
      }

      setAppState('result');
    } catch (error) {
      alert("분석 실패! 우주의 주파수가 맞지 않습니다.");
      setAppState('idle');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pb-20">
      <Header minimized={appState !== 'idle'} />
      
      <main className="w-full max-w-4xl z-10 flex flex-col items-center">
        {appState === 'idle' && (
          <div className="w-full flex flex-col items-center space-y-20">
            {/* 단일 사물 분석 섹션 */}
            <div className="w-full max-w-2xl flex flex-col items-center">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400 uppercase tracking-widest">
                  무생물 단일 관상
                </h2>
                <p className="text-gray-500 text-xs mt-2 italic">사물에 깃든 전생의 기운과 사주팔자를 해독합니다</p>
              </div>

              <div className="animate-float w-full flex flex-col items-center">
                <UploadZone onUpload={(data) => handleAnalysis({ ...data, images: [data.imageFile], isMember })} />
                
                {isMember && (
                  <div className="mt-6 flex justify-center">
                    <span className="px-4 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold rounded-full animate-pulse">
                      ✨ 우수 신도 전용: VVIP 전생 추적 기능 활성화됨
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 구분선 (디자인 요소) */}
            <div className="flex items-center space-x-4 w-full max-w-lg opacity-20">
              <div className="h-px bg-gradient-to-r from-transparent to-purple-500 flex-1"></div>
              <div className="text-purple-500 text-xl">☯</div>
              <div className="h-px bg-gradient-to-l from-transparent to-purple-500 flex-1"></div>
            </div>

            {/* 무생물 궁합 보기 섹션 (회원 전용) */}
            <div className="w-full flex justify-center">
              <CompatibilityZone isMember={isMember} onUpload={handleAnalysis} />
            </div>
          </div>
        )}

        {appState === 'loading' && <LoadingState />}
        
        {appState === 'result' && (
          <ResultSection result={result} onReset={() => setAppState('idle')} />
        )}
      </main>
    </div>
  );
};

export default Home;

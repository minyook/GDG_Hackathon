import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';

const CompatibilityZone = ({ isMember, onUpload }) => {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);

  const handleFileChange = (e, slot) => {
    if (e.target.files && e.target.files[0]) {
      if (slot === 1) setImg1(e.target.files[0]);
      else setImg2(e.target.files[0]);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-12 relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400 uppercase tracking-widest">
          무생물 궁합 보기
        </h2>
        <p className="text-gray-500 text-xs mt-2 italic">두 사물의 영적 주파수를 대조하여 상성을 분석합니다</p>
      </div>

      <div className={`relative p-8 rounded-3xl border border-purple-500/20 bg-gray-900/40 transition-all duration-700 ${!isMember ? 'blur-md grayscale pointer-events-none' : 'blur-0 grayscale-0'}`}>
        <div className="flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0 md:space-x-4">
          {/* Slot 1 */}
          <div 
            onClick={() => document.getElementById('comp-1').click()}
            className="w-32 h-40 border-2 border-dashed border-purple-500/30 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors bg-gray-950/50 overflow-hidden"
          >
            {img1 ? (
              <img src={URL.createObjectURL(img1)} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-purple-900 text-4xl">?</span>
            )}
            <input type="file" id="comp-1" className="hidden" onChange={(e) => handleFileChange(e, 1)} />
          </div>

          <div className="text-3xl animate-pulse text-yellow-500 font-black">VS</div>

          {/* Slot 2 */}
          <div 
            onClick={() => document.getElementById('comp-2').click()}
            className="w-32 h-40 border-2 border-dashed border-purple-500/30 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors bg-gray-950/50 overflow-hidden"
          >
            {img2 ? (
              <img src={URL.createObjectURL(img2)} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-purple-900 text-4xl">?</span>
            )}
            <input type="file" id="comp-2" className="hidden" onChange={(e) => handleFileChange(e, 2)} />
          </div>
        </div>

        <button 
          disabled={!img1 || !img2}
          onClick={() => onUpload({ images: [img1, img2], isMember: true })}
          className={`mt-10 w-full py-4 rounded-xl font-black tracking-widest transition-all ${(!img1 || !img2) ? 'bg-gray-800 text-gray-600' : 'bg-gradient-to-r from-purple-600 to-yellow-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105'}`}
        >
          궁합 분석 요청
        </button>
      </div>

      {/* Non-member Overlay */}
      {!isMember && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-white font-bold text-lg mb-2">업보가 부족하여 궁합을 볼 수 없습니다</p>
          <p className="text-gray-400 text-xs mb-6">우수 신도로 등록하여 무생물 간의 상성을 확인하십시오</p>
          <button 
            onClick={handleLogin}
            className="px-6 py-2.5 bg-yellow-500 text-gray-900 font-bold rounded-full text-sm hover:bg-yellow-400 transition-colors"
          >
            우수 신도 등록 (Google 로그인)
          </button>
        </div>
      )}
    </div>
  );
};

export default CompatibilityZone;

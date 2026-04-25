import React, { useState } from 'react';

const UploadZone = ({ onUpload }) => {
  const [itemName, setItemName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("제물(사진)을 먼저 바쳐야 합니다!");
      return;
    }
    onUpload({ itemName, birthDate, imageFile: selectedFile });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl space-y-8">
      {/* 사진 업로드 버튼 */}
      <div className="relative group cursor-pointer" onClick={() => document.getElementById('file-upload').click()}>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
        <button className="relative px-10 py-10 bg-gray-900 rounded-full leading-none flex items-center border border-purple-500/30 transition-all">
          <div className="flex flex-col items-center space-y-3">
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-yellow-100 text-sm font-bold tracking-[0.2em] uppercase">
              {selectedFile ? '사진 등록됨' : '제물(사진) 바치기'}
            </span>
          </div>
        </button>
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
        />
      </div>
      {selectedFile && <p className="text-purple-400 text-xs font-mono tracking-widest uppercase">{selectedFile.name}</p>}

      {/* 선택 사항 폼 */}
      <div className="w-full bg-gray-900/40 backdrop-blur-md border border-purple-900/30 p-8 rounded-3xl space-y-6">
        <div className="text-center">
          <h3 className="text-purple-300 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center">
            <span className="w-4 h-px bg-purple-500/30 mr-2"></span>
            수행 데이터 보정 (선택)
            <span className="w-4 h-px bg-purple-500/30 ml-2"></span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">사물 이름</label>
            <input 
              type="text" 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="예: 최애 텀블러"
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-gray-100 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">탄생일 (제조일)</label>
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 text-gray-100 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full py-3 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-xl transition-all tracking-[0.2em] uppercase"
        >
          기운 증폭하여 분석 시작
        </button>
      </div>

      <p className="text-gray-500 text-[10px] italic text-center leading-relaxed">
        * 사진을 먼저 등록하거나 정보를 입력한 후 '분석 시작'을 누르십시오.<br/>
        더 많은 정보가 제공될수록 우주의 기운이 정밀하게 동기화됩니다.
      </p>
    </div>
  );
};

export default UploadZone;

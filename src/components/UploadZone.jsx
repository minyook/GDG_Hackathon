import React from 'react';

const UploadZone = ({ onUpload }) => {
  return (
    <div className="flex flex-col items-center animate-float">
      <div className="relative group cursor-pointer" onClick={onUpload}>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
        <button className="relative px-12 py-12 bg-gray-900 rounded-full leading-none flex items-center divide-x divide-gray-600 border border-purple-500/30">
          <div className="flex flex-col items-center space-y-4">
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-yellow-100 text-xl font-bold tracking-widest">제물(사진) 바치기</span>
          </div>
        </button>
      </div>
      <p className="mt-8 text-gray-500 text-sm italic">
        * 카메라로 물건을 비추거나 사진을 업로드하십시오.
      </p>
    </div>
  );
};

export default UploadZone;

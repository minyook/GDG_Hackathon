import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      console.log("회원가입 성공");
      navigate('/login');
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다: " + error.message);
    }
  };

  return (
    <div className="w-full max-w-md animate-float">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-yellow-500/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* 장식용 네온 라인 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-2 tracking-tighter">신규 수행자 등록</h2>
          <p className="text-gray-400 text-sm">운명의 실타래를 기록할 새로운 공간을 만듭니다</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] ml-1">수행자 성명</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 text-gray-100 transition-all"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] ml-1">식별 번호 (이메일)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shaman@cosmos.com"
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 text-gray-100 transition-all"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] ml-1">비밀의 암호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 text-gray-100 transition-all"
              required
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-yellow-900/30 hover:bg-yellow-800/50 border border-yellow-500/50 text-yellow-100 font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
            >
              운명 기록부 생성
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            이미 수행 중이신가요?{" "}
            <button onClick={() => navigate('/login')} className="text-purple-400 hover:text-purple-300 underline underline-offset-4">기존 포털로 접속</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공");
      navigate('/');
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <div className="w-full max-w-md animate-float">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-purple-500/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* 장식용 네온 라인 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-yellow-500 mb-2 tracking-tighter">영혼의 접속</h2>
          <p className="text-purple-400 text-sm">우주의 기록에 접근하기 위해 신원을 확인하십시오</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">식별 번호 (이메일)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shaman@cosmos.com"
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-gray-100 transition-all"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">비밀의 암호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-gray-100 transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-purple-900/50 hover:bg-purple-800 border border-purple-500/50 text-purple-100 font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            포털 개방
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            아직 기록이 없으신가요?{" "}
            <button onClick={() => navigate('/signup')} className="text-yellow-600 hover:text-yellow-500 underline underline-offset-4">신규 수행자 등록</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

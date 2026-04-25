import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert("로그인 실패: 이메일 또는 비밀번호를 확인하십시오.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  };

  const handleGuestLogin = () => {
    // 비회원 상태는 Firebase Auth 로그아웃 상태로 간주
    navigate('/', { state: { isGuest: true } });
  };

  return (
    <div className="w-full max-w-md animate-float">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-purple-500/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-500 mb-2 tracking-tighter">영혼의 접속</h2>
          <p className="text-purple-400 text-sm italic">우주의 기록에 접근하기 위해 신원을 확인하십시오</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="수행자 이메일"
            className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-gray-100 transition-all text-sm"
            required
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀의 암호"
            className="w-full bg-gray-950/50 border border-purple-900/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-gray-100 transition-all text-sm"
            required
          />
          <button type="submit" className="w-full py-3 bg-purple-900/50 hover:bg-purple-800 border border-purple-500/50 text-purple-100 font-bold rounded-xl transition-all">
            이메일로 접속
          </button>
        </form>

        <div className="my-6 flex items-center space-x-2 opacity-30">
          <div className="h-px bg-gray-500 flex-1"></div>
          <span className="text-[10px] text-gray-400 uppercase font-mono">OR</span>
          <div className="h-px bg-gray-500 flex-1"></div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
            <span>Google 계정으로 접속 (우수 신도)</span>
          </button>
          
          <button 
            onClick={handleGuestLogin}
            className="w-full py-3 bg-transparent border border-gray-700 text-gray-500 font-bold rounded-xl hover:text-gray-300 hover:border-gray-500 transition-all text-xs"
          >
            수행 기록 없이 둘러보기 (비회원)
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            아직 기록이 없으신가요?{" "}
            <button onClick={() => navigate('/signup')} className="text-yellow-600 hover:text-yellow-500 underline underline-offset-4">신규 수행자 등록</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

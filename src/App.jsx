import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import MyPage from './pages/MyPage.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative bg-[#050208]">
        {/* 배경 이미지 및 장식 (전역 유지) */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat grayscale-[0.5] contrast-[1.2]"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050208]/80 via-transparent to-[#050208]"></div>
          
          {/* 회전하는 마법진 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow text-yellow-600/50" fill="none" stroke="currentColor">
              <circle cx="100" cy="100" r="90" strokeWidth="0.5" strokeDasharray="1 2" />
              <circle cx="100" cy="100" r="70" strokeWidth="0.5" />
              <path d="M100 10 L100 190 M10 100 L190 100 M36.4 36.4 L163.6 163.6 M36.4 163.6 L163.6 36.4" strokeWidth="0.5" />
              <rect x="50" y="50" width="100" height="100" strokeWidth="0.5" transform="rotate(45 100 100)" />
            </svg>
          </div>

          {/* 떠다니는 입자 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-200/30 rounded-full blur-[2px] animate-float-particle"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                bottom: `-20px`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

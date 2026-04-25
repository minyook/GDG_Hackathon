import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
      <Link to="/" className="flex items-center space-x-2 pointer-events-auto group">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-yellow-600 rounded-lg flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
          🔮
        </div>
        <div className="hidden md:block">
          <span className="text-gray-100 font-bold tracking-tighter text-lg group-hover:text-yellow-500 transition-colors">사이버 무당</span>
          <p className="text-[8px] text-purple-500 tracking-[0.2em] leading-none uppercase">Digital Shamanism</p>
        </div>
      </Link>

      {!isAuthPage && (
        <div className="flex items-center space-x-4 pointer-events-auto">
          {user ? (
            <>
              {/* 로그인 상태: 이름, 로그아웃, 마이페이지 */}
              <div className="flex items-center space-x-3 bg-gray-900/80 px-3 py-1.5 rounded-full border border-yellow-500/20">
                {user.photoURL && (
                  <img src={user.photoURL} alt="profile" className="w-6 h-6 rounded-full border border-yellow-500/50" />
                )}
                <span className="text-xs font-bold text-yellow-500">{user.displayName || user.email?.split('@')[0]} 신도</span>
              </div>
              
              <Link 
                to="/mypage"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 border border-purple-500/30 rounded-full hover:scale-110 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                title="마이페이지"
              >
                <span className="text-xl">🧘</span>
              </Link>

              <button 
                onClick={handleLogout} 
                className="px-3 py-1.5 text-[10px] text-gray-500 hover:text-red-400 uppercase font-mono border border-gray-800 rounded-lg hover:border-red-900/30 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            /* 비로그인 상태: 통합 버튼 */
            <Link 
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-900 to-purple-700 text-purple-100 text-xs font-black rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-all uppercase tracking-widest border border-purple-500/30"
            >
              정보 등록하러 가기
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

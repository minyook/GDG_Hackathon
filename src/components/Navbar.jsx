import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
      {/* 로고: 어느 화면에서든 홈으로 이동 */}
      <Link 
        to="/"
        className="flex items-center space-x-2 pointer-events-auto group"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-yellow-600 rounded-lg flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
          🔮
        </div>
        <div className="hidden md:block">
          <span className="text-gray-100 font-bold tracking-tighter text-lg group-hover:text-yellow-500 transition-colors">사이버 무당</span>
          <p className="text-[8px] text-purple-500 tracking-[0.2em] leading-none uppercase">Digital Shamanism</p>
        </div>
      </Link>

      {/* 오른쪽 메뉴 (로그인 페이지 등에서는 숨길 수 있음) */}
      {!isAuthPage && (
        <div className="flex items-center space-x-4 pointer-events-auto">
          <Link 
            to="/login"
            className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-purple-400 transition-colors uppercase tracking-widest border border-gray-800 rounded-lg hover:border-purple-500/30 bg-gray-950/50 backdrop-blur-sm"
          >
            Portal Access
          </Link>
          <Link 
            to="/mypage"
            className="w-10 h-10 flex items-center justify-center bg-gray-900 border border-purple-500/30 rounded-full hover:scale-110 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          >
            <span className="text-xl">🧘</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

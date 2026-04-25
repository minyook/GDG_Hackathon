import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedFate, setSelectedFate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // 리스트 확장 모드 상태

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchHistory(currentUser.uid);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchHistory = async (uid) => {
    try {
      const fatesRef = collection(db, "fates");
      const q = query(fatesRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // 최신순 정렬
      historyData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setHistory(historyData);
    } catch (error) {
      console.error("기록 불러오기 실패:", error);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("정말로 이 운명의 기록을 말소하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "fates", id));
        setHistory(history.filter(item => item.id !== id));
      } catch (error) {
        alert("기록 삭제에 실패했습니다.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // 표시할 데이터 (확장 모드가 아니면 상위 5개만)
  const displayHistory = isExpanded ? history : history.slice(0, 5);

  return (
    <div className="w-full max-w-4xl space-y-8 animate-float pb-20 mt-20">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center space-x-4">
          {isExpanded && (
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-2 bg-gray-900 border border-purple-500/30 rounded-full text-purple-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
          )}
          <h2 className="text-3xl font-bold text-yellow-500 tracking-tighter">
            {isExpanded ? "전체 운명 기록부" : "나의 운명 기록부"}
          </h2>
        </div>
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-purple-400 text-sm font-mono">[ 홈으로 ]</button>
      </div>

      <div className={`grid gap-6 ${isExpanded ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
        {/* 프로필 카드 (확장 모드일 때는 숨김) */}
        {!isExpanded && (
          <div className="md:col-span-1 bg-gray-900/80 border border-purple-500/30 p-6 rounded-3xl h-fit">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-yellow-600 rounded-full flex items-center justify-center text-3xl shadow-lg overflow-hidden border-2 border-yellow-500/20">
                {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" alt="profile"/> : "🧘"}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-100">{user?.displayName || '수행자'}</h3>
                <p className="text-[10px] text-gray-500 font-mono">{user?.email}</p>
              </div>
              <div className="w-full h-px bg-gray-800 my-2"></div>
              <div className="w-full space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">수행 등급</span><span className="text-yellow-500 font-bold italic">상급 도사</span></div>
                <div className="flex justify-between"><span className="text-gray-500">누적 업보</span><span className="text-purple-400 font-bold">{history.length}건</span></div>
              </div>
              <button onClick={handleLogout} className="w-full mt-4 py-2 bg-red-900/20 text-red-500 text-[10px] font-bold border border-red-900/30 rounded-xl hover:bg-red-900/40 transition-all uppercase tracking-widest">Logout</button>
            </div>
          </div>
        )}

        {/* 기록 리스트 (확장 모드일 때 전체 너비 사용) */}
        <div className={`${isExpanded ? 'w-full' : 'md:col-span-2'} space-y-4`}>
          {!isExpanded && <h3 className="text-sm font-bold text-purple-400 ml-2 tracking-widest uppercase opacity-70">Recent Karma</h3>}
          
          {displayHistory.length > 0 ? (
            <div className={`grid gap-4 ${isExpanded ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {displayHistory.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedFate(item)}
                  className="bg-gray-900/60 border border-gray-800 hover:border-purple-500/50 p-5 rounded-2xl transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-600/20 group-hover:bg-purple-500 transition-colors"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-yellow-500 font-bold">{item.itemName}</span>
                      <span className="px-2 py-0.5 bg-purple-900/40 text-[9px] text-purple-300 rounded-full border border-purple-500/20 font-mono">Score: {item.fortune_score}</span>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(e, item.id)}
                      className="p-1.5 text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-300 transition-colors break-keep">{item.fate}</p>
                  <div className="mt-3 text-[9px] text-gray-700 font-mono">{item.createdAt?.toDate().toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-600 italic border-2 border-dashed border-gray-900 rounded-3xl">아직 해독된 영혼이 없습니다.</div>
          )}

          {/* more+ 버튼 (5개 초과 시 및 확장 모드가 아닐 때만 노출) */}
          {!isExpanded && history.length > 5 && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="w-full py-4 border border-gray-800 text-gray-500 rounded-2xl hover:border-purple-500/30 hover:text-purple-400 transition-all font-mono text-sm group"
            >
              more <span className="group-hover:ml-1 transition-all">+</span>
            </button>
          )}
        </div>
      </div>

      {/* 상세 보기 모달 */}
      {selectedFate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-gray-900 border border-yellow-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedFate(null)} className="absolute top-4 right-6 text-gray-400 hover:text-white text-2xl">×</button>
            <div className="p-8 md:p-12 space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {selectedFate.imageUrl && (
                  <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-purple-500/30 flex-shrink-0 shadow-xl">
                    <img src={selectedFate.imageUrl} className="w-full h-full object-cover" alt="제물"/>
                  </div>
                )}
                <div className="text-center md:text-left">
                  <h4 className="text-xs text-purple-400 font-bold tracking-[0.3em] uppercase mb-1">Decoded Soul</h4>
                  <h3 className="text-3xl font-black text-yellow-500">{selectedFate.itemName}</h3>
                  <p className="text-xs text-gray-500 mt-2 font-mono">{selectedFate.createdAt?.toDate().toLocaleString()}</p>
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-200 break-keep italic">"{selectedFate.fate}"</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-gray-950 rounded-2xl border border-purple-900/30">
                    <span className="block text-[10px] text-gray-500 uppercase mb-1">Fortune Score</span>
                    <span className="text-2xl font-black text-yellow-500">{selectedFate.fortune_score}</span>
                  </div>
                  <div className="p-4 bg-gray-950 rounded-2xl border border-purple-900/30">
                    <span className="block text-[10px] text-gray-500 uppercase mb-1">Lucky Color</span>
                    <span className="text-sm font-bold text-gray-200">{selectedFate.lucky_color}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;

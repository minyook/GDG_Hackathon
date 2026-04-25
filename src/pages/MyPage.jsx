import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

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
      const q = query(
        collection(db, "fates"), 
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(historyData);
    } catch (error) {
      console.error("이력 불러오기 실패:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="w-full max-w-4xl space-y-8 animate-float">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-yellow-500 tracking-tighter">나의 운명 기록부</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-purple-400 text-sm font-mono"
        >
          [ 뒤로가기 ]
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 사용자 정보 카드 */}
        <div className="md:col-span-1 bg-gray-900/80 border border-purple-500/30 p-6 rounded-3xl h-fit">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-yellow-600 rounded-full flex items-center justify-center text-3xl">
              🧘
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">{user?.displayName || '수행자'}</h3>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="w-full h-px bg-gray-800 my-2"></div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">수행 등급</span>
                <span className="text-yellow-500">신참 도사</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">분석한 사물</span>
                <span className="text-purple-400">{history.length}개</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full mt-4 py-2 bg-red-900/20 text-red-500 text-xs border border-red-900/50 rounded-lg hover:bg-red-900/40 transition-all"
            >
              수행 중단 (로그아웃)
            </button>
          </div>
        </div>

        {/* 활동 이력 리스트 */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-purple-400 ml-2">최근 기록된 영혼들</h3>
          {history.length > 0 ? history.map((item) => (
            <div 
              key={item.id}
              className="bg-gray-900/60 border border-gray-800 hover:border-purple-500/50 p-5 rounded-2xl transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-yellow-500 font-bold">{item.itemName}</span>
                <span className="text-[10px] text-gray-600 font-mono">
                  {item.createdAt?.toDate().toLocaleDateString() || item.date}
                </span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-200 transition-colors">
                {item.fate}
              </p>
            </div>
          )) : (
            <div className="text-center py-20 text-gray-600 italic">
              아직 기록된 영혼이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;

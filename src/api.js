import axios from 'axios';

// --- 백엔드 연결 설정 ---
// 백엔드가 GCP에 배포되어 현재 이 주소로 연동됩니다.
const API_BASE_URL = 'https://destiny-scanner-backend-248895382472.asia-northeast3.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeFate = async (payload) => {
  try {
    const formData = new FormData();

    // 사진이 여러 장(궁합)일 경우 모두 추가, 단일 사진일 경우 1개만 추가
    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((img, index) => {
        if (img) {
          // 백엔드에서 'file' 혹은 'file1', 'file2'로 받을 수 있게 'files'로 통일하거나 
          // 현재 백엔드 구조에 맞춰 첫 번째 사진을 'file'로 전송
          if (index === 0) formData.append('file', img);
          else formData.append(`file${index + 1}`, img); 
        }
      });
    }

    formData.append('item_name', payload.itemName || '');
    formData.append('birth_date', payload.birthDate || '');

    // 백엔드에서 이 가이드를 읽을 수 있도록 전송
    const depthPrompt = payload.isMember 
      ? "반드시 10문장 이상의 장문으로 아주 깊이 있게 분석해주시오." 
      : "5줄 이내로 짧고 강렬하게 분석해주시오.";
    formData.append('prompt_extension', depthPrompt);
    formData.append('is_member', payload.isMember ? "true" : "false");

    const response = await api.post('/analyze', formData);
    const rawData = response.data;

    // 백엔드 응답을 우선순위로 사용 (값이 없을 때만 랜덤 기본값 사용)
    return {
      result_text: rawData.result_text || rawData.result || "운명을 해독할 수 없습니다.",
      fortune_score: rawData.fortune_score !== undefined ? rawData.fortune_score : Math.floor(Math.random() * 30) + 70,
      lucky_color: rawData.lucky_color || "심연의 색",
      lucky_item: rawData.lucky_item || "부적"
    };
  } catch (error) {

    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
    } else {
      console.error('API 분석 중 오류 발생:', error.message);
    }
    throw error;
  }
};

export default api;

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
    
    if (payload.images && payload.images.length > 0 && payload.images[0]) {
      formData.append('file', payload.images[0]);
    }

    // 백엔드 Form 필드명과 일치시킴
    formData.append('item_name', payload.itemName || '');
    formData.append('birth_date', payload.birthDate || '');

    // 회원 여부에 따른 분석 요청 가이드 (초강력 지시)
    const depthPrompt = payload.isMember 
      ? "당신은 사물의 운명을 해독하는 장엄한 대문호입니다. 반드시 10개 이상의 명확한 문단(줄바꿈으로 구분)으로 구성하여 아주 길게 작성해주시오. 단, 하나의 문장 진행되는 도중에는 절대 줄바꿈을 하지 말고, 반드시 마침표(.)가 끝난 지점에서만 줄을 바꾸어 총 10줄 이상의 문단이 보이게 하시오. 각 문단은 깊은 철학적 통찰을 담아야 하오." 
      : "비회원이니 5줄 이내의 짧은 문단들로 간략하고 명쾌하게 운명을 읊어주시오. 문장 중간에 줄을 바꾸지 마시오.";

    formData.append('prompt_extension', depthPrompt);
    formData.append('is_member', payload.isMember ? "true" : "false");

    // multipart/form-data 전송 시 headers를 직접 설정하지 않아야 브라우저가 boundary를 자동으로 생성합니다.
    const response = await api.post('/analyze', formData);

    const rawData = response.data;

    // --- 무작위 처방 데이터 (백엔드 미응답 대비) ---
    const colors = ["빛바랜 옥색", "영험한 금빛", "심연의 묵색", "신비로운 보랏빛", "정열의 주사색", "청결한 백색"];
    const items = ["단선된 USB 케이블", "오래된 동전", "젖은 물티슈", "먼지 쌓인 피규어", "구겨진 영수증", "반쯤 남은 생수병"];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    // 백엔드 응답 필드가 result_text 인지 result 인지 확인하여 유연하게 처리
    return {
      result_text: rawData.result_text || rawData.result || "운명을 해독할 수 없습니다.",
      fortune_score: rawData.fortune_score || Math.floor(Math.random() * 30) + 70,
      lucky_color: rawData.lucky_color || randomColor,
      lucky_item: rawData.lucky_item || randomItem
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

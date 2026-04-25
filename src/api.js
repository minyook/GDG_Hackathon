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
    
    if (payload.images && payload.images.length > 0) {
      formData.append('file', payload.images[0]);
    }

    // 백엔드 Form 필드명과 일치시킴
    formData.append('item_name', payload.itemName || '');
    formData.append('birth_date', payload.birthDate || '');
    
    const depthPrompt = payload.isMember 
      ? "당신은 아주 상세하게 설명하는 대문호입니다. 반드시 줄바꿈을 포함하여 10줄 이상의 장문으로, 각 항목별(관상, 전생, 미래)로 아주 자세하게 운명 보고서를 작성해주시오." 
      : "비회원이니 5줄 이내로 간략하게 운명을 읊어주시오.";
    
    formData.append('prompt_extension', depthPrompt);
    formData.append('is_member', payload.isMember);

    const response = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const rawData = response.data;
    // 백엔드 응답 필드가 result_text 인지 result 인지 확인하여 유연하게 처리
    return {
      result_text: rawData.result_text || rawData.result || "운명을 해독할 수 없습니다.",
      fortune_score: rawData.fortune_score || Math.floor(Math.random() * 30) + 70,
      lucky_color: rawData.lucky_color || "영험한 금빛",
      lucky_item: rawData.lucky_item || "오래된 마우스"
    };
  } catch (error) {
    console.error('API 분석 중 오류 발생:', error);
    throw error;
  }
};

export default api;

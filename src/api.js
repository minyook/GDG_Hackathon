import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI 서버 주소

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeFate = async (data) => {
  try {
    // data: { itemName, birthDate, imageFile (optional) }
    // 만약 이미지를 보낸다면 FormData를 사용해야 함
    if (data.imageFile) {
      const formData = new FormData();
      formData.append('file', data.imageFile);
      formData.append('item_name', data.itemName);
      formData.append('birth_date', data.birthDate);
      
      const response = await api.post('/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await api.post('/analyze', {
        item_name: data.itemName,
        birth_date: data.birthDate,
      });
      return response.data;
    }
  } catch (error) {
    console.error('API 분석 중 오류 발생:', error);
    throw error;
  }
};

export default api;

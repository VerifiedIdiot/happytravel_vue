import axios from 'axios';



// 필요한 공통설정 추가하세요. (ex:)

const apiClient = axios.create({
  baseURL: '',  // 기본 URL을 빈 문자열로 설정
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer 뭐뭐토큰', // 보안토큰 전달 필요 시 사용
    // 'Accept': 'application/json', // xml을 받을 수 있을때는 수정
    // 'User-Agent': 'YourAppName/1.0', // 요건 모바일 혹은 태블릿 pc 환경시에 다른 응답값을 원할 때 설정
    // 필요시 api-key 혹은 보안정보 추가
  },
});

export default apiClient;

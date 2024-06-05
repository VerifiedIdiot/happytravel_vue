import apiClient from '@/api/axios';

// 급여 항목, 사원 정보, 급여 총계
export const selectAllLists = async (salaryDate) => {
  try {
    const response = await apiClient.get('/salary/lists', {
      params: { salaryDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
};

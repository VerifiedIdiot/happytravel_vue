import apiClient from '@/api/axios';

// 생성: 급여 데이터 초기화 - 일괄 처리 & 단일 처리
export const initSalaryData = async (salaryDate, empId) => {
  try {
    const response = await apiClient.post(`/salary/insert/${salaryDate}`, {
      emp_id: empId,
    });
    return response.data;
  } catch (error) {
    console.error('Error inserting batchInitSalaryData:', error);
    throw error;
  }
};
// 조회: 특정 사원의 급여 데이터
export const selectAllSalaryData = async (empId, salaryDate) => {
  try {
    const response = await apiClient.get(`/salary/select/${salaryDate}/${empId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salaryData:', error);
    throw error;
  }
};
// 수정: 특정 사원의 급여 데이터
export const updataSalaryData = async (empId, salaryDate, salaryData) => {
  try {
    const response = await apiClient.patch(`/salary/update/${salaryDate}/${empId}`, salaryData);
    return response.data;
  } catch (error) {
    console.error('Error updating salaryData:', error);
    throw error;
  }
};

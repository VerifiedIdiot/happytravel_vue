import apiClient from '@/api/axios';

// 급여 지급 내역 조회
export const selectPaymentData = async (paymentYear) => {
  try {
    const response = await apiClient.get(`/salary/payment/${paymentYear}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching paymentData:', error);
    throw error;
  }
};

// 급여 지급 상세 내역 조회
export const selectPaymentDatailData = async (paymentYear, empId) => {
  try {
    const response = await apiClient.get(`/salary/payment/${paymentYear}/${empId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching paymentData:', error);
    throw error;
  }
};

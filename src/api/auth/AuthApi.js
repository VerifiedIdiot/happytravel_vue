import apiClient from '@/api/axios';


export const login = async (param) => {
  try {
    const response = await apiClient.post(`/auth/login`, param);
    return response.data;
  } catch (error) {
    console.error('Error inserting batchInitSalaryData:', error);
    throw error;
  }
};
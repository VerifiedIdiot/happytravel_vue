import apiClient from "@/api/axios";

// 급여 내역 생성 - 일괄 처리 & 단일 처리
export const initSalaryData = async (salaryDate, empId) => {
  try {
    const response = await apiClient.post(`/salary/insert/${salaryDate}`, {
      emp_id: empId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching batchInitSalaryData:", error);
    throw error;
  }
};
// 급여 내역 조회
export const selectAllSalaryData = async (empId, salaryDate) => {
  try {
    const response = await apiClient.get(
      "/salary/select/" + salaryDate + "/" + empId
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching salaryData:", error);
    throw error;
  }
};

import apiClient from "@/api/axios";

// 급여 내역 생성 - 일괄 처리
export const batchInitSalaryData = async (salaryDate) => {
  try {
    const response = await apiClient.post("/salary/insert", {
      param: {
        salaryDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching batchInitSalaryData:", error);
    throw error;
  }
};
// 급여 내역 생성 - 단일 처리
export const singleInitSalaryData = async (empId, salaryDate) => {
  try {
    const response = await apiClient.post("/salary/insert", {
      param: {
        empId,
        salaryDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching singleInitSalaryData:", error);
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

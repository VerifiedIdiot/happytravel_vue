import apiClient from "../axios";

/** 사원 리스트 조회 */
// GET
export const getEmpList = async () => {
  try {
    const response = await apiClient.get("/hr/emp-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching emp list:", error);
    throw error;
  }
};

/** 사원 단건 조회 */
//GET
export const getEmpInfo = async (empId) => {
  try {
    const response = await apiClient.get("/hr/emp-info", { params: { empId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching emp info:", error);
  }
};

// 마지막 사원번호 조회
export const generateLastEmpId = async () => {
  try {
    const response = await apiClient.get("/hr/emp/generate-id");
    const data = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching last emp id: ", error);
    throw error;
  }
};

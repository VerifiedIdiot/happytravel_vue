import apiClient from "../axios";
// 자기 부서 부장 조회
export const getManagerIdByDeptCode = async (deptCode) => {
  try {
    const response = await apiClient.get(
      `/attendances/managerIdByDeptCode?deptCode=${deptCode}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching manager ID by dept code:", error);
    throw error;
  }
};

import apiClient from "../axios";

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

//GET
export const getEmpInfo = async (empId) => {
  try {
    const response = await apiClient.get("/hr/emp-info", { params: { empId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching emp info:", error);
  }
};

//GET
export const searchEmpList = async (searchType, searchQuery) => {
  const response = await apiClient.get("/hr/emp-list/search", {
    params: {
      searchType,
      searchQuery,
    },
  });
  return response.data;
};

// GET
export const getDeptList = async () => {
  try {
    const response = await apiClient.get("/hr/dept-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching department list:", error);
    throw error;
  }
};

// GET
export const getPosList = async () => {
  try {
    const response = await apiClient.get("/hr/pos-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching position list:", error);
    throw error;
  }
};

// GET
export const getempStatusList = async () => {
  try {
    const response = await apiClient.get("/hr/empstat-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching emp status list:", error);
    throw error;
  }
};

// GET
export const getbankList = async () => {
  try {
    const response = await apiClient.get("/hr/bank-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching bank list:", error);
    throw error;
  }
};

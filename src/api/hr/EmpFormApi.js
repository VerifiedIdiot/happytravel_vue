import apiClient from "../axios";

/** 사원 정보 form option 불러오기 START */
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
/** 사원 정보 form option 불러오기 END */

/** 신규 사원 저장 */
// POST
export const insertEmployee = async (employee) => {
  try {
    const response = await apiClient.post("/hr/emp-save", employee, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving employee: " + error);
    throw error;
  }
};

/** 사원 정보 수정 */
// PUT
export const updateEmployee = async (employee) => {
  try {
    const response = await apiClient.put("/hr/emp-update", employee, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating employee: " + error);
    throw error;
  }
};

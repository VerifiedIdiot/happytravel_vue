import apiClient from "../axios";
import axios from "axios";

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
  try {
    const response = await apiClient.get("/hr/emp-list/search", {
      params: {
        searchType,
        searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching empList: ", error);
    throw error;
  }
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

// 사원 사진 업로드
export const uploadPhotoFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/hr/emp/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.fileName; // fileName을 반환
  } catch (error) {
    console.error("Error uploading photo: ", error);
    throw error;
  }
};

// 신규 사원 저장
export const insertEmployee = async (employee) => {
  try {
    const response = await apiClient.post("/hr/emp/save", employee, {
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

// 사원 정보 수정
export const updateEmployee = async (employee) => {
  try {
    const response = await apiClient.put("/hr/emp/update", employee, {
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

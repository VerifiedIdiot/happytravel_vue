import apiClient from "../axios";

// GET
export const getAttendance = async (empId) => {
  try {
    const response = await apiClient.get("/attendance/api/attendance", {
      params: { empId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching agency list:", error);
    throw error;
  }
};

export const getVacation = async (empId) => {
  try {
    const response = await apiClient.get("/attendance/api/vacation", {
      params: { empId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching agency list:", error);
    throw error;
  }
};

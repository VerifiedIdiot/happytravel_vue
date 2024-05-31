import apiClient from "../axios";

// GET
export const getAttendanceList = async () => {
  try {
    const response = await apiClient.get("/attendances/attendance");
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance list:", error);
    throw error;
  }
};

// POST (출근 기록 삽입)
export const insertAttendance = async (attendance) => {
  try {
    const response = await apiClient.post(
      "/attendances/attendance",
      attendance
    );
    return response.data;
  } catch (error) {
    console.error("Error inserting attendance:", error);
    throw error;
  }
};

// PUT (퇴근 시간 업데이트)
export const updateAttendance = async (attendance) => {
  try {
    const response = await apiClient.put("/attendances/attendance", attendance);
    return response.data;
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
};

// DELETE
export const deleteAttendance = async (empId) => {
  try {
    const response = await apiClient.delete(`/attendances/attendance${empId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting attendance:", error);
    throw error;
  }
};

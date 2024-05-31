import apiClient from "../axios";

// GET
export const getAttendanceManagementList = async () => {
  try {
    const response = await apiClient.get("/attendances/attendanceManagement");
    return response.data;
  } catch (error) {
    console.error("Error fetching attendanceManagement list:", error);
    throw error;
  }
};

// POST
export const insertAttendanceManagement = async (attendanceManagement) => {
  try {
    const response = await apiClient.post(
      "/attendances/attendanceManagement",
      attendanceManagement
    );
    return response.data;
  } catch (error) {
    console.error("Error inserting attendanceManagement:", error);
    throw error;
  }
};

// PUT
export const updateAttendance = async (
  attendanceCode,
  attendanceManagement
) => {
  try {
    const response = await apiClient.put(
      `/attendances/attendance${attendanceCode}`,
      attendanceManagement
    );
    return response.data;
  } catch (error) {
    console.error("Error updating attendanceManagement:", error);
    throw error;
  }
};

// DELETE
export const deleteAttendance = async (attendanceCode) => {
  try {
    const response = await apiClient.delete(
      `/attendances/attendance${attendanceCode}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting attendanceManagement:", error);
    throw error;
  }
};

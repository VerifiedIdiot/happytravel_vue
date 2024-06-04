import apiClient from "../axios";

export const getTeamAttendance = async (department) => {
  try {
    const response = await apiClient.get("/attendance/teamAttendance", {
      params: { department },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teamAttendance list:", error);
    throw error;
  }
};
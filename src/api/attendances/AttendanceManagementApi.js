import apiClient from "../axios";

// GET
export const getAttendanceManagementList = async (deptCode) => {
  try {
    const response = await apiClient.get("/attendance/attendanceManagement", {
      params: { deptCode },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendanceManagement list:", error);
    throw error;
  }
};

export const approveRequest = async (attendanceCode, status) => {
  try {
    console.log(`휴가 신청 ${status}: ${attendanceCode}`);
    const response = await apiClient.patch(`/attendance/attendanceManagement/${attendanceCode}?status=${status}`, null);
    return response.data;
  } catch (error) {
    console.error(`Error ${status} attendanceManagement:`, error);
    throw error;
  }
};

export const rejectRequest = async (attendanceCode, status) => {
  try {
    console.log(`반려 신청 ${status}: ${attendanceCode}`);
    const response = await apiClient.patch(`/attendance/attendanceManagement/${attendanceCode}?status=${status}`, null);
    return response.data;
  } catch (error) {
    console.error(`Error ${status} attendanceManagement:`, error);
    throw error;
  }
};

export const getAttendanceHistory = async (deptCode, limit, offset) => {
  try {
    const response = await apiClient.get("/attendance/attendanceConfirm", {
      params: { deptCode ,limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendanceHistory list:", error);
    throw error;
  }
};

export const getAttendanceCount = async (empId) => {
  try {
    const response = await apiClient.get("/attendance/countAttendanceThisMonth", {
      params: { empId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendanceCount:", error);
    throw error;
  }
};

// GET 작성 날짜 조회 API

// 최대 attendance type code 조회
export const getMaxAttendanceTypeCode = async (creationDate) => {
  try {
    const response = await apiClient.get(
      `/attendance/maxAttendanceTypeCode?creationDate=${creationDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching max attendance type code:", error);
    throw error;
  }
};
// POST
export const insertAttendanceManagement = async (attendanceManagement) => {
  try {
    const response = await apiClient.post(
      "/attendance/add",
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

import apiClient from "../axios";

// 사용자 정보 조회
export const getMyPageUserInfo = async (empId) => {
  try {
    const response = await apiClient.get("/mypage/userInfo", {
      params: { emp_id: empId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// 공지사항 조회
export const getNotices = async (deptCode) => {
  try {
    const response = await apiClient.get("/mypage/notices", {
      params: { dept_code: deptCode },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
};

// 출퇴근 조회
export const getAttendance = async (empId, today) => {
  try {
    const response = await apiClient.get("/mypage/attendance", {
      params: { emp_id: empId, today },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

// 근태 신청 조회
export const getLeaveTravel = async (empId) => {
  try {
    const response = await apiClient.get("/mypage/attendanceManagement", {
      params: { emp_id: empId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching leave and travel:", error);
    throw error;
  }
};

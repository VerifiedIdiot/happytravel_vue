import apiClient from "../axios";

// GET Hotel List
export const getHotelList = async (params) => {
  try {
    const response = await apiClient.get("/sales/hotel-list", {params});
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel list:", error);
    throw error;
  }
};

// GET Single Hotel
export const getHotel = async (params) => {
  try {
    const response = await apiClient.get('/sales/hotel-detail', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw error;
  }
};

// POST Insert Hotel
export const insertHotel = async (hotel, empId) => {
  try {
    const response = await apiClient.post("/sales/hotel", hotel, empId);
    return response.data;
  } catch (error) {
    console.error("Error inserting hotel:", error);
    throw error;
  }
};

// PUT Update Hotel
export const updateHotel = async (hotelItem) => {
  try {
    const response = await apiClient.put(`/sales/hotel`, hotelItem);
    return response.data;
  } catch (error) {
    console.error('Error updating hotel:', error);
    throw error;
  }
};

// PUT Update Hotel Y/N
export const updateHotelYN = async (params) => {
  try {
    const response = await apiClient.put('/sales/hotel-yn', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error updating hotel Y/N:', error);
    throw error;
  }
};

// GET Country List
export const getCountries = async (params) => {
  try {
    const response = await apiClient.get("sales/countries", { params });
    return response.data;
  } catch (error) {
    console.error("Error getting countries:", error);
    throw error;
  }
};

// // GET Hotel Count
export const getHotelCnt = async (params) => {
  try {
    const response = await apiClient.get('sales/hotel-count', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting hotel count:', error);
    throw error;
  }
}

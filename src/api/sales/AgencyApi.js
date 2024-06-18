import apiClient from "../axios";

// GET Agency List
export const getAgencyList = async (params) => {
  try {
    const response = await apiClient.get("/sales/agency-list", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching agency list:", error);
    throw error;
  }
};

// GET Single Agency
export const getAgency = async (params) => {
  try {
    const response = await apiClient.get("/sales/agency-detail", { params });
    if (response) {
      console.log(response.data)
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching agency :", error);
    throw error;
  }
};

// POST Insert Agency
export const insertAgency = async (agency) => {
  try {
    const response = await apiClient.post("/sales/agency", agency);
    return response.data;
  } catch (error) {
    console.error("Error inserting agency:", error);
    throw error;
  }
};

// PUT Update Agency
export const updateAgency = async (agencyItem) => {
  try {
    const response = await apiClient.put(`/sales/agency`, agencyItem);
    return response.data;
  } catch (error) {
    console.error("Error updating agency:", error);
    throw error;
  }
};

// PUT Update Agency Y/N
export const updateAgencyYN = async (params) => {
  try {
    const response = await apiClient.put('/sales/agency-yn', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error updating hotel Y/N:', error);
    throw error;
  }
};

// GET Country List
export const getCountries = async (params) => {
  try {
    const response = await apiClient.get("/sales/agency-countries", { params });
    return response.data;
  } catch (error) {
    console.error("Error getting countries:", error);
    throw error;
  }
};

// GET Agency Count
export const getAgencyCnt = async (params) => {
  try {
    const response = await apiClient.get("/sales/agency-count", { params });
    return response.data;
  } catch (error) {
    console.error("Error getting agency count:", error);
    throw error;
  }
};

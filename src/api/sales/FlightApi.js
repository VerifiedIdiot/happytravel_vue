import apiClient from '../axios'; 

// GET Flight List
export const getFlightList = async (params) => {
  try {
    const response = await apiClient.get('/sales/flight-list', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching flight list:', error);
    throw error;
  }
};

// GET Flight Detail
export const getFlight = async (params) => {
  try {
    const response = await apiClient.get('/sales/flight-detail', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching flight:', error);
    throw error;
  }
};

// POST Insert Flight
export const insertFlight = async (flight) => {
  try {
    const response = await apiClient.post('/sales/flight', { flight });
    return response.data;
  } catch (error) {
    throw new Error('Error adding flight');
  }
};

// PUT Update Flight
export const updateFlight = async (flightItem) => {
  try {
    const response = await apiClient.put(`/sales/flight`, flightItem);
    return response.data;
  } catch (error) {
    console.error('Error updating flight:', error);
    throw error;
  }
};

// DELETE Delete Flight
export const deleteFlight = async (flightCode) => {
  try {
    const response = await apiClient.delete(`/sales/flight/${flightCode}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting flight:', error);
    throw error;
  }
};

// PUT Update Agency Y/N
export const updateFlightYN = async (params) => {
  try {
    const response = await apiClient.put('/sales/flight-yn', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error updating hotel Y/N:', error);
    throw error;
  }
};

// GET Country List
export const getCountries = async (params) => {
  try {
    const response = await apiClient.get("/sales/flight-countries", { params });
    return response.data;
  } catch (error) {
    console.error("Error getting countries:", error);
    throw error;
  }
};

// GET Agency Count
export const getFlightCnt = async (params) => {
  try {
    const response = await apiClient.get("/sales/flight-count", { params });
    return response.data;
  } catch (error) {
    console.error("Error getting agency count:", error);
    throw error;
  }
};

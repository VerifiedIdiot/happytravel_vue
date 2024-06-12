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

// POST
export const addFlight = async (empId, flightData) => {
  try {
    const response = await apiClient.post('/sales/flight', { empId, ...flightData });
    return response.data;
  } catch (error) {
    throw new Error('Error adding flight');
  }
};

// PUT
export const updateFlight = async (flightCode, flightData) => {
  try {
    const response = await apiClient.put(`/sales/flight/${flightCode}`, flightData);
    return response.data;
  } catch (error) {
    console.error('Error updating flight:', error);
    throw error;
  }
};

// DELETE
export const deleteFlight = async (flightCode) => {
  try {
    const response = await apiClient.delete(`/sales/flight/${flightCode}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting flight:', error);
    throw error;
  }
};

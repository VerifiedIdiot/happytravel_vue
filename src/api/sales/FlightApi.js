import apiClient from '../axios'; 

// GET
export const getFlightList = async () => {
  try {
    const response = await apiClient.get('/sales/flight-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching flight list:', error);
    throw error;
  }
};

// POST
export const addFlight = async (flight) => {
  try {
    const response = await apiClient.post('/sales/flight', flight);
    return response.data;
  } catch (error) {
    console.error('Error inserting flight:', error);
    throw error;
  }
};

// PUT
export const updateFlight = async (flightCode, flight) => {
  try {
    const response = await apiClient.put(`/sales/flight${flightCode}`, flight);
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

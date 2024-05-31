import apiClient from '../axios'; 

// GET
export const getHotelList = async (empId) => {
  try {
    const response = await apiClient.get('/sales/hotel-list', {
      params: { empId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel list:', error);
    throw error;
  }
};

// POST
export const insertHotel = async (hotel) => {
  try {
    const response = await apiClient.post('/sales/hotel', hotel);
    return response.data;
  } catch (error) {
    console.error('Error inserting hotel:', error);
    throw error;
  }
};

// PUT
export const updateHotel = async (hotelCode, hotel) => {
  try {
    const response = await apiClient.put(`/sales/hotel/${hotelCode}`, hotel);
    return response.data;
  } catch (error) {
    console.error('Error updating hotel:', error);
    throw error;
  }
};

// DELETE
export const deleteHotel = async (hotelCode) => {
  try {
    const response = await apiClient.delete(`/sales/hotel/${hotelCode}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting hotel:', error);
    throw error;
  }
};

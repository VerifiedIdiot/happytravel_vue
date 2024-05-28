import apiClient from '../axios'; 

// GET
export const getAgencyList = async () => {
  try {
    const response = await apiClient.get('/sales/agency');
    return response.data;
  } catch (error) {
    console.error('Error fetching agency list:', error);
    throw error;
  }
};

// POST
export const insertAgency = async (agency) => {
  try {
    const response = await apiClient.post('/sales/agency', agency);
    return response.data;
  } catch (error) {
    console.error('Error inserting agency:', error);
    throw error;
  }
};

// PUT
export const updateAgency = async (agencyCode, agency) => {
  try {
    const response = await apiClient.put(`/sales/agency/${agencyCode}`, agency);
    return response.data;
  } catch (error) {
    console.error('Error updating agency:', error);
    throw error;
  }
};

// DELETE
export const deleteAgency = async (agencyCode) => {
  try {
    const response = await apiClient.delete(`/sales/agency/${agencyCode}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting agency:', error);
    throw error;
  }
};

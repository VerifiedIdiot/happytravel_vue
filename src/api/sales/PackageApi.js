import apiClient from '../axios'; 

// GET
export const getPackageList = async () => {
  try {
    const response = await apiClient.get('/sales/package-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching package list:', error);
    throw error;
  }
};

// POST
export const insertPackage = async (packageItem) => {
  try {
    const response = await apiClient.post('/sales/package', packageItem);
    return response.data;
  } catch (error) {
    console.error('Error inserting package:', error);
    throw error;
  }
};

// PUT
export const updatePackage = async (packageCode, packageItem) => {
  try {
    const response = await apiClient.put(`/sales/package/${packageCode}`, packageItem);
    return response.data;
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// DELETE
export const deletePackage = async (packageCode) => {
  try {
    const response = await apiClient.delete(`/sales/package/${packageCode}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
};

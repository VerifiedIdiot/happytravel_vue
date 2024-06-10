import apiClient from '../axios';

// GET Package List
export const getPackageList = async (params) => {
  try {
    const response = await apiClient.get('/sales/package-list', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching package list:', error);
    throw error;
  }
};

// GET Single Package
export const getPackage = async (params) => {
  try {
  
    const response = await apiClient.get('/sales/package-detail', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

// POST Insert Package
export const insertPackage = async (packageItem) => {
  try {
    const response = await apiClient.post('/sales/package', packageItem);
    return response.data;
  } catch (error) {
    console.error('Error inserting package:', error);
    throw error;
  }
};

// PUT Update Package
export const updatePackage = async (packageItem) => {
  try {
    const response = await apiClient.put('/sales/package', packageItem);
    return response.data;
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// PUT Update Package Y/N
export const updatePackageYN = async (params) => {
  try {
    const response = await apiClient.put('/sales/package-yn', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error updating package Y/N:', error);
    throw error;
  }
};

// PUT Assign Package
export const assignPackage = async (params) => {
  try {
    const response = await apiClient.put('/sales/package-assign', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error assigning package:', error);
    throw error;
  }
};

export const getCountries = async (params) => {
  try {
    const response = await apiClient.get('sales/get-countries', {params});
    return response.data;
  } catch (error) {
    console.error('Error getting countries:', error);
    throw error;
  }
}

export const getPackageCnt = async (params) => {
  try {
    const response = await apiClient.get('sales/package-count', {params});
    return response.data;
  } catch (error) {
    console.error('Error getting packageCnt:', error);
    throw error;
  }

}

import customApiClient from '../CustomAxiosInstance';

// GET Package List
export const getPackageList = async (params) => {
  try {
    const response = await customApiClient.get('/sales/package-list', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching package list:', error);
    throw error;
  }
};
// GET Package List with queryParms for search
export const searchPackageList = async (params) => {
  try {
    const response = await customApiClient.get('/sales/package-list-search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching package list:', error);
    throw error;
  }
}

// GET Single Package
export const getPackage = async (params) => {
  try {
    const response = await customApiClient.get('/sales/package-detail', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

// POST Insert Package
export const insertPackage = async (packageItem) => {
  try {
    const response = await customApiClient.post('/sales/package', packageItem);
    return response.data;
  } catch (error) {
    console.error('Error inserting package:', error);
    throw error;
  }
};

// PUT Update Package
export const updatePackage = async (packageItem) => {
  try {
    const response = await customApiClient.put('/sales/package', packageItem);
    return response.data;
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// PUT Update Package Y/N
export const updatePackageYN = async (params) => {
  try {
    const response = await customApiClient.put('/sales/package-yn', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error updating package Y/N:', error);
    throw error;
  }
};

// PUT Assign Package
export const assignPackage = async (params) => {
  try {
    const response = await customApiClient.put('/sales/package-assign', null, { params });
    return response.data;
  } catch (error) {
    console.error('Error assigning package:', error);
    throw error;
  }
};

// GET Countries
export const getCountries = async (params) => {
  try {
    const response = await customApiClient.get('sales/get-countries', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting countries:', error);
    throw error;
  }
}

// GET Package Count
export const getPackageCnt = async (params) => {
  try {
    const response = await customApiClient.get('sales/package-count', { params });
    return response.data;
  } catch (error) {
    console.error('Error getting package count:', error);
    throw error;
  }

}
// 파트너사 게시판 중 항공사정보 get
export const getFlightList = async (params) => {
  try {
    const response = await customApiClient.get('sales/partner-flights', {params});
    return response.data
  } catch (error) {
    console.log('Error getting flights:', error)
  }
}

export const getFlightCnt = async (params)  => {
  try { 
    const response = await customApiClient.get('sales/partner-flight-count', {params});
    return response.data
  } catch (error) {
    console.log('Error getting flight counts', error)
  }
}

export const getHotelList = async (params) => {
  try {
    const response = await customApiClient.get('sales/partner-hotels', {params})
    return response.data
  } catch (error) {
    console.log('Error getting hotels', error)
  }
}


export const getHotelCnt = async (params)  => {
  try { 
    const response = await customApiClient.get('sales/partner-hotel-count', {params});
    return response.data
  } catch (error) {
    console.log('Error getting hotel counts', error)
  }
}

export const getAgencyList = async (params) => {
  try {
    const response = await customApiClient.get('sales/partner-agencies', {params})
    return response.data
  } catch (error) {
    console.log('Error getting agencies', error)
  }
}

export const getAgencyCnt = async (params)  => {
  try { 
    const response = await customApiClient.get('sales/partner-hotel-count', {params});
    return response.data
  } catch (error) {
    console.log('Error getting agency counts', error)
  }
}
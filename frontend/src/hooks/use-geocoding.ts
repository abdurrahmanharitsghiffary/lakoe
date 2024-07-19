export const getAddressFromLatLng = async (lat: number, lng: number): Promise<string> => {
    const apiKey = '6b09fe2d9fba487caca542f49fd70b93';
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted;
    } else {
      return 'Address not found';
    }
  };
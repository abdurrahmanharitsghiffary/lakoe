export const convertLatLngToString = (latlng: L.LatLng): string => {
  const lat = latlng.lat.toFixed(5); // Membatasi angka desimal hingga 5 digit
  const lng = latlng.lng.toFixed(5); // Membatasi angka desimal hingga 5 digit
  return `Latitude: ${lat}, Longitude: ${lng}`;
};

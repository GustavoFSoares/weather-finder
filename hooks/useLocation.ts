type Location = {
  lat: number;
  lon: number;
};

export const useLocation = () => {
  function getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          resolve({
            lat: coords.latitude,
            lon: coords.longitude,
          });
        });
      } else {
        alert("Geolocation is not supported by this browser.");
        reject();
      }
    });
  }

  return {
    getLocation,
  };
};

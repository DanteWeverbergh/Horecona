const Location = {
  getErrorByCode(errorCode) {
    const errorArray = [
      "user didn't allow location tracking",
      "device can't get data",
      'location tracking timed out',
    ];
    return errorArray[errorCode - 1];
  },
  //get current location
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        resolve({ lat: coords.latitude, long: coords.longitude });
      }),
        (error) => {
          reject(new Error(this.getErrorByCode(error.code)));
        };
    });
  },

  watchLocation() {
    var watchId = navigator.geolocation.watchPosition(({ coords }) => {
      console.log({ lon: coords.longitude, lat: coords.latitude });
    });
  },

  clearWatch() {
    navigator.geolocation.clearWatch(watchId);
  },
};

export default Location;

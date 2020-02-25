// This script sets the geocode function. Function changes the users input value to latitude and longitude values

const request = require("request");

// Getting the lat and long values, based on the input address using  API "MapBox" (https://docs.mapbox.com/api/)
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamFsbWVyIiwiYSI6ImNrNmx0dnNwdjBoYWIzb3BhYjdieW1pMXoifQ.qqdU1cBiusDaClHgS24yPg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    // If theres a problem connecting to server or mapbox.com, display a message
    if (error) {
      callback("Unable to connect to location services", undefined);

      // If the search result has no matches, send the user a message telling where the problem is
    } else if (body.features.length === 0) {
      callback("Unable to find location, try again", undefined);
    } else {
      // If everything is good change values to variables
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

// Export this function so other programs can call it
module.exports = geocode;

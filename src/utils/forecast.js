const request = require("request");

// Getting the weather from darksky.net based on the input address
// Values for latitude and longitude come from the geocode function
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/d2571527da6013a71baeba7cb38dffff/" +
    latitude +
    "," +
    // Units = displaying the values in metric system //  language = finnish
    longitude +
    "?units=si&lang=fi";

  request({ url, json: true }, (error, { body }) => {

    // Cant connect to darksky, display error message
    if (error) {
      callback("Unable to connect to weather service!", undefined);

      // Cant find location based on values, display error message
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,

        // Values of arrays are found on the documents in darksky.com/dev/docs. Everything can be modified for your needs
        body.daily.data[0].summary +
          " Tällä hetkellä lämpötila on " +
          body.currently.temperature +
          " astetta. Sateen mahdollisuus on " +
          body.currently.precipProbability +
          "%." +
          " Päivän ylin lämpötila on " +
          body.daily.data[0].temperatureHigh +
          " astetta"
      );
    }
  });
};

module.exports = forecast;

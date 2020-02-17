const request = require('request');

// Getting the weather from darksky.net based on the input address
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d2571527da6013a71baeba7cb38dffff/'+ latitude + ',' + longitude +'?units=si&lang=fi';

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary +  ' Tällä hetkellä lämpötila on '+ body.currently.temperature + ' astetta. Sateen mahdollisuus on ' + body.currently.precipProbability + '%' )
        }
})
}

module.exports = forecast
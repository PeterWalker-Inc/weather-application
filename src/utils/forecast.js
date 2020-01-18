const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0a7c9069515ea447163280d5cd43082e/'+latitude+','+longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out.The high today is '+ body.daily.data[0].temperatureHigh +' degrees with the low of '+ body.daily.data[0].temperatureLow +' degrees. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    })
}

module.exports = forecast
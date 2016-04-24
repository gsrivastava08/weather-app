var request = require('request');
module.exports = {


    getCurrentWeather: function(city, successCallback) {

        request('http://api.openweathermap.org/data/2.5/weather?q='+city+',IN&appid=74feb73cf8d81be5de94fb6060d82cf2&units=metric', function (error, response, body) {
          if(error){
           // callback({error : 'Endpoint API is down.'});
          }else if (!error && response.statusCode == 200) {
            successCallback(body); 
          }

        });
    },

    getWeatherForecast: function(city, successCallback) {
        
        request('http://api.openweathermap.org/data/2.5/forecast?q='+city+',IN&mode=json&appid=74feb73cf8d81be5de94fb6060d82cf2&units=metric', function (error, response, body) {
          if(error){
           // callback({error : 'Endpoint API is down.'});
          }else if (!error && response.statusCode == 200) {
            successCallback(body); 
          }

        });
    }
};
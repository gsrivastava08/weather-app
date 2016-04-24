/**
 * Current-weatherController
 *
 * @description :: Server-side logic for managing current-weathers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'GETDATA' : function(req, res){
		var city = req.param('city');
		WeatherData.getCurrentWeather(city, function(data){
			res.send(data);	
		});
	},

	'GETFORECAST' : function(req, res){
		var city = req.param('city');
		WeatherData.getWeatherForecast(city, function(data){
			res.send(data);	
		});
	}
};


app.controller('myCtrl', [ "$scope", "$http", "$filter", function($scope, $http, $filter) {

	$scope.cityList = ['Bangalore', 'Kanpur', 'Lucknow', 'Raebareli', 'Delhi', 'Noida', 'Pune', 'Chandigarh'];
	$scope.activeCity = 'Bangalore';
	$scope.weatherData = {};
	$scope.forecastData = {};
    $scope.currentDate = new Date().getTime();
    // App init
    $scope.init = function(){
    	 $scope.loadWeatherData('Bangalore');
        
        setInterval(function(){
            $scope.$apply(function(){
                $scope.currentDate = new Date().getTime();
            });
        }, 1000); 
    }

    $scope.loadWeatherData = function(city){
    	$('#homeTab').tab('show');
    	$scope.activeCity = city;
    	$http.get("current-weather/"+city)
	    .then(function(response) {
	        $scope.weatherData = response.data;
	    });

    }

    $scope.showForecast = function(){
    	$http.get("weather-forecast/"+$scope.activeCity)
	    .then(function(response) {
	        $scope.forecastData = response.data;
	        $scope.renderGraph();
	    });    	
    }

    $scope.renderGraph = function(){
    	var ctx = document.getElementById("myChart").getContext("2d");

    	    var options = {

    	    ///Boolean - Whether grid lines are shown across the chart
    	    scaleShowGridLines : true,

    	    //String - Colour of the grid lines
    	    scaleGridLineColor : "rgba(0,0,0,.05)",

    	    //Number - Width of the grid lines
    	    scaleGridLineWidth : 1,

    	    //Boolean - Whether to show horizontal lines (except X axis)
    	    scaleShowHorizontalLines: true,

    	    //Boolean - Whether to show vertical lines (except Y axis)
    	    scaleShowVerticalLines: true,

    	    //Boolean - Whether the line is curved between points
    	    bezierCurve : true,

    	    //Number - Tension of the bezier curve between points
    	    bezierCurveTension : 0.4,

    	    //Boolean - Whether to show a dot for each point
    	    pointDot : true,

    	    //Number - Radius of each point dot in pixels
    	    pointDotRadius : 4,

    	    //Number - Pixel width of point dot stroke
    	    pointDotStrokeWidth : 1,

    	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    	    pointHitDetectionRadius : 20,

    	    //Boolean - Whether to show a stroke for datasets
    	    datasetStroke : true,

    	    //Number - Pixel width of dataset stroke
    	    datasetStrokeWidth : 2,

    	    //Boolean - Whether to fill the dataset with a colour
    	    datasetFill : true,

    	    //String - A legend template
    	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label %><%}%>°C</li><%}%></ul>"
    	};

    	var labelsArr = [];
    	var dataArr = [];
    	for(var i = 1; i<= $scope.forecastData.cnt; i+=4){
    		labelsArr.push($filter('date')($scope.forecastData.list[i-1].dt*1000, "dd MMM, HH:mm"));
    		dataArr.push($scope.forecastData.list[i-1].main.temp);
    	}

    	var data = {
    	    labels: labelsArr,
    	    datasets: [
    	        {
    	            label: "Weather Data",
    	            fillColor: "rgba(64, 163, 204,0.2)",
    	            strokeColor: "rgba(64, 163, 204,1)",
    	            pointColor: "rgba(64, 163, 204,1)",
    	            pointStrokeColor: "#fff",
    	            pointHighlightFill: "#fff",
    	            pointHighlightStroke: "rgba(64, 163, 204,1)",
    	            data: dataArr
    	        }
    	    ]
    	};

    	var myLineChart = new Chart(ctx).Line(data, options);

    } 

    $scope.init();

}]);
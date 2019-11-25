//creating dom objects to get element
//jquery for the weather return

$(document).ready(function(){
	document.getElementById("sendWeather").addEventListener("click", function() {
			var place = $("#place").val();

			if (place != ''){

				$.ajax({

					url: 'https://api.openweathermap.org/data/2.5/weather?q=' + place + "&units=metric" + "&appid=bea6972840a72f62be17686103c7aed4",
					type: "GET",
					dataType: "jsonp",
					success: function(data){
						show(data);
						$("#place").val('');
					}
				});

			}else{
				$("#error").html('Field cannot be empty');
			}
		});
});



//function to get the results and output them to dom
function show(data) {
	//create variables to hold the data
        let temp = data.main.temp + ' Degree celcius'; 
        let  cloud = data.clouds.all+ ' % cloudness'; 
        let windDirection = data.wind.deg +' deg';
        let windSpeed = data.wind.speed+ ' meter per second';
        let humidity = data.main.humidity+ ' %';
        let place = data.place;

        //output the data to the dom neededs
        $('.name').html(place);
        $(".temp").html(temp);
        $(".cloud").html(cloud);
        $(".direction").html(windDirection);
        $(".speed").html(windSpeed);
        $(".humidity").html(humidity);

        //for dev testing  if it works
       console.log(temep );
        console.log(clo); 
        console.log(wind); 
        console.log(windz);
        console.log(hum);}
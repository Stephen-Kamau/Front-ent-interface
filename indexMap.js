
var map, searchManager;
function GetMap() {
    map = new Microsoft.Maps.Map('.map', {});
}
function Search() {
    if (!searchManager) {
        //Create an instance of the search manager and perform the search.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            Search()
        });
    } else {
        //Remove any previous results from the map.
        map.entities.clear();
        //Get the users query and geocode it.
        var query = document.getElementById('place').value;
        geocodeQuery(query);
    }
}
function geocodeQuery(query) {
    var searchRequest = {
        where: query,
        callback: function (r) {
            if (r && r.results && r.results.length > 0) {
                var pin, pins = [], locs = [], output = 'Results:<br/>';
                for (var i = 0; i < r.results.length; i++) {
                    //Create a pushpin for each result. 
                    pin = new Microsoft.Maps.Pushpin(r.results[i].location, {
                        text: i + ''
                    });
                    pins.push(pin);
                    locs.push(r.results[i].location);
                    output += i + ') ' + r.results[i].name + '<br/>';
                }
                //Add the pins to the map
                map.entities.push(pins);
                //Display list of results
                document.getElementById('placesCount').innerHTML = output;
                //Determine a bounding box to best view the results.
                var bounds;
                if (r.results.length == 1) {
                    bounds = r.results[0].bestView;
                } else {
                    //Use the locations from the results to calculate a bounding box.
                    bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
                }
                map.setView({ bounds: bounds });
            }
        },
        errorCallback: function (e) {
            //If there is an error, alert the user about it.
            alert("No results found.");
        }
    };
    //Make the geocode request.
    searchManager.geocode(searchRequest);
}
document.getElementById("sendWeather").addEventListener("click", function() {
  Search();
});

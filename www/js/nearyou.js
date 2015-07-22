// On load, the browser window will load the Google Map div, starting by calling the initialize() function.
google.maps.event.addDomListener(window, 'load', initialize);
var gpslat;
var gpslong;
var map;
var parks;
$.ajaxSetup({ cache: false });
//var lat;
//var lng;
	
/**
 *	function initialize()
 *
 *	Initializes the Google Map in the #googleMap div by first reading the GET variables
 *	in the page's URL and calling the appropriate function to either Geocode the user's
 * 	inputted zip code or their current location.
 */
function initialize() {
	var URL = window.location.href;
	var zip_code;
	if ((zip_code = localStorage.getItem("zip_code")) != null) {
		getZip(zip_code);
	}else{
		getLocation();
	}
}

/**
 *	function getZip()
 *
 *	Receives the zip code from the form submitted by the user in browse.html,
 *	then geocodes the zip code via the Google Maps API and sends the geocoded value
 * 	to the makeMap() function, which then creates the Map around those coordinates.
 *
 *	Param: zip — the user-inputted zipcode, which we received as a GET variable
 */
function getZip(zip) {
	// Initialize a new Geocoder object, which lets us obtain latitude/longitude 
	// values from an address or zip code.
	var geocoder = new google.maps.Geocoder();

	// Use the Maps geocode() function to obtain the location from the zip code
	geocoder.geocode( { 'address': zip }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			
			// When the Geocoder returns an OK message, we receive the latitude and longitude
			lat = results[0].geometry.location.lat();
			lng = results[0].geometry.location.lng();
	
			// Then call the makeMap() function, which actually generates the Google Map
			makeMap(lat, lng);
		} 
	});
}

/**
 * 	functions getLocation() and showPosition()
 *
 * 	Returns: The client's current latitude and longitude as a String.
 */
function getLocation() {
    if (navigator.geolocation) {
		// If the browser allows Geolocation, sends the client's location, a position object, 
		// as a parameter to showPosition()
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
	else { 
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	// Calls the makeMap() function to generate the Google Map based on our latitude and longitude points
	makeMap(position.coords.latitude, position.coords.longitude);
}

/**
 * 	function makeMap()
 *
 *	Params: lat — the latitude, lng — the longitude
 */
function makeMap(lat, lng) {
	// Sets up the Map in the #googleMap div, according to the given latitude and longitude
	var mapCanvas = document.getElementById("googleMap");
	var mapOptions = {
		center: new google.maps.LatLng(lat, lng),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(mapCanvas, mapOptions);

	// Sets up the style of the Map. Currently makes roads a light black and all parks a bright green
	map.set('styles', [
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
				{ color: '#000000' },
				{ weight: 0.2 }
			]
		},
		{
			featureType: 'poi.park',
			elementType: 'geometry',
			stylers: [
				{ hue: '#85CF61' },
				{ lightness: -5 },
				{ saturation: 99 }
			]
		}
	]);

	var gpslat = lat;
	var gpslong = lng;	
	
	if ((zip_code = localStorage.getItem("zip_code")) != null) {
		ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var response = JSON.parse(ajax.responseText);
				for (var i = 0; i < response.length; i++) {
					//Place marker onto the screen
					addMarker(map, response[i].gpslat, response[i].gpslong);		
					//Add the info into the list under the map
					/**
						Mick, do the UI nonsense here with the info				
					*/
					$('#parkslist').append(response[i].park_name + " Park<br>");
					//Other stuff you need to do
				}
			}
		}
		
		var data = "zip=" + zip_code;	
		ajax.open("GET", "http://54.163.175.56/pgh/pghgetparks.php?" + data, true);
		ajax.send();
	}else{
		ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var response = JSON.parse(ajax.responseText);
				for (var i = 0; i < response.length; i++) {
					//Place marker onto the screen
					addMarker(map, response[i].gpslat, response[i].gpslong);	
					parks[i] = response[i].park_id;
					//Add the info into the list under the map
					/**
						Mick, do the UI nonsense here with the info				
					*/
					$('#parkslist').append(response[i].park_name + " Park<br>");
					$('... something ...').click(function() {
						localStorage["park_id"] = parks[i];
						window.location.href = "viewpark.html";
					});
					//Other stuff you need to do
				}
			}
		}
		
		var data = "long=" + lng + "&lat=" + lat + "&zoom=" + map.getZoom();	
		ajax.open("GET", "http://54.163.175.56/pgh/pghgetparksbygps.php?" + data, true);
		ajax.send();
	}
	addMarker(map, lat, lng);
}

/**
 *	function addMarker()
 *
 *	Adds a Marker object to the Map based on a specified feature.
 *	Params: feature —— the feature that the Marker is created based on.
 */
function addMarker(feature, lat, lng) {
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map
	});
}

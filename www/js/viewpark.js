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
	if ((name = localStorage.getItem("name")) != null) {
		getParkInfo(name);
	}
}

var park_info;

function getParkInfo(){
	ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			park_info = JSON.parse(ajax.responseText);
			$('#park_name_text').val(park_info.park_name);
			$('#park_addr_text').val(park_info.park_address);
			makeMap(park_info.gpslat, park_info.gpslong);
			/*
				Output other values
			*/
		}
	}
	
	var data = "name=" + name;
	ajax.open("GET", "http://54.163.175.56/pgh/pghgetparkinfo.php?" + data, true);
	ajax.send();
}

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
	addMarker(map, lat, lng);
}

/**
 *	function addMarker()
 *
 *	Adds a Marker object to the Map based on a specified feature.
 *	Params: feature  the feature that the Marker is created based on.
 */
function addMarker(feature, lat, lng) {
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map
	});
}
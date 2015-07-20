// On load, the browser window will load the Google Map div, starting by calling the initialize() function.
google.maps.event.addDomListener(window, 'load', initialize);
		
/**
 *	function initialize()
 *
 *	Initializes the Google Map in the #googleMap div by first reading the GET variables
 *	in the page's URL and calling the appropriate function to either Geocode the user's
 * 	inputted zip code or their current location.
 */
function initialize() {
	// Gets the URL from the current page
	var URL = window.location.href;
	
	// If there are GET variables in the URL
	if (URL.indexOf('?') !== -1) {
		// Split the URL String on the '?' character to grab the GET variables within it
		var split_URL = URL.split('?');
		var get_vars = split_URL[1];
		
		// First we check to see if the 'zipcode' GET variable is in the list of GET variables
		var zip_index = get_vars.indexOf('zipcode');
		
		// If so, we call the getZip() function, sending it the inputted zipcode as a parameter
		if (zip_index !== -1) {
			getZip(get_vars.substring(zip_index + 8, zip_index + 14));
		}
		
		// Then we check to see if the 'location' GET variable is in the list
		var loc_index = get_vars.indexOf('location');
		
		// In which case we call the getLocation() function
		if (loc_index !== -1) {
			getLocation();
		}
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
	
	var lat;
	var lng;
	
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

   	/**
   	 *  TODO:
   	 *
   	 *	Get AJAX return value from PHP DB — all nearby parks of user-inputted location.
   	 *	Then dynamically add each park to the #park_list ul.
   	 */
}

/**
 *	function addMarker()
 *
 *	Adds a Marker object to the Map based on a specified feature.
 *	Params: feature —— the feature that the Marker is created based on.
 */
function addMarker(feature) {
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(40.43473, -79.94318),
		icon: iconbase + feature,
		// icon: icons[feature.type].icon (?)
		map: map
	});
}

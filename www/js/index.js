/**
 *	function sendZip()
 *
 *	Sends user's inputted zip code to the nearyou.html page.
 *	This allows the user to view a specified zip code in a Google Map.
 */			
function sendZip() {
	var zipcode = document.getElementById('find_zip').innerHTML;
	localStorage["zip_code"] = zipcode;
	window.location.href = "nearyou.html";
}

/**
 *	function sendLocation()
 *
 *	Sends user's current location to the nearyou.html page.
 * 	This allows the user to view their current area in a Google Map.
 */
function sendLocation() {
	localStorage.removeItem("zip_code");
	window.location.href = "nearyou.html";
}
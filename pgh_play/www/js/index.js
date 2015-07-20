/**
 *	function sendZip()
 *
 *	Sends user's inputted zip code to the nearyou.html page.
 *	This allows the user to view a specified zip code in a Google Map.
 */			
function sendZip() {
	// First we receive the zip code from the #find_zip div
	var zipcode = document.getElementById('find_zip').innerHTML;
	
	// Then we create a 'form' using it and have the action be a link to the map page
    var form = document.createElement("form");
	form.setAttribute("name", "submit_zip")
    form.setAttribute("method", "link");
    form.setAttribute("action", "nearyou.html");
   
    // Then we create a hidden 'input' to attach to the form in order to give it the zip code
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "zipcode");
    input.setAttribute("value", zipcode);
	
	// Then we add the input to the form
    form.appendChild(input);
			
	// Finally we append the form to the page and 'submit' it, linking us to the nearyou.html page
    document.body.appendChild(form);
    form.submit();
}

/**
 *	function sendLocation()
 *
 *	Sends user's current location to the nearyou.html page.
 * 	This allows the user to view their current area in a Google Map.
 */
function sendLocation() {
	// We create a 'form' using it and have the action be a link to the map page
    var form = document.createElement("form");
	form.setAttribute("name", "submit_zip")
    form.setAttribute("method", "link");
    form.setAttribute("action", "nearyou.html");
   
    // Then we create a hidden 'input' to attach to the form in order to tell it to find the location
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "location");
    input.setAttribute("value", "somedata");
	
	// Then we add the input to the form
    form.appendChild(input);
			
	// Finally we append the form to the page and 'submit' it, linking us to the nearyou.html page
    document.body.appendChild(form);
    form.submit();
}

/**
 *	function logInOrAdd()
 *
 *	A simple function that checks if the "user" cookie exists, then either redirects to the user login
 * 	page or the new park page.
 */
function addPark() {
	if (document.cookie.indexOf("user") < 0) {
		window.location.href = "pghlogin.html";
	}
	else {
		window.location.href = "newpark.html";
	}
}

// Boolean variable to determine whether or not the user menu has been moved.
var moved = false;

/**
 *	function userMenu()
 *
 *	Checks to see if the "user" cookie exists, if not returning the user to the login page, and if so
 *	moving the #menu div based on whether or not it has already been moved.
 */
function userMenu() {
	if (document.cookie.indexOf("user") < 0) {
		window.location.href = "pghlogin.html";
	}
	else if (moved) {
		$('#menu').animate({right: "-40%"}, 200);
		moved = false;
	}
	else {
		$('#menu').animate({right: "0%"}, 200);
		moved = true;
	}
}

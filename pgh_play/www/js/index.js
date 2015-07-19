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
 *	Under Construction
 */
function logInOrAdd() {
    // If user cookie already exists
	if (document.cookie.indexOf("user") >= 0) {
		window.location.href = "newpark.html";
	}
	else {
		window.location.href = "pghlogin.html";
	}
	
}

// 
var moved = false;

/**
 *	function userMenu()
 *
 *	Under Construction
 */
function userMenu() {
	if (moved) {
		$('#menu').animate({right: "-40%"}, 200);
		// $('.options').animate({left: "-210px"}, 200);
		moved = false;
	}
	else {
		$('#menu').animate({right: "0%"}, 200);
		// $('.options').animate({left: "0px"}, 200);
		moved = true;
	}
}

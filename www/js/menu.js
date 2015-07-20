/**
 *	function addPark()
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

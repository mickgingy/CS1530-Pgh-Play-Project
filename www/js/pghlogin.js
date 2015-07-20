/**
 * 	function login()
 *
 *	Simple function to create a cookie called "user" that expires one day after its creation.
 */
function login() {
	ajax = new XMLHttpRequest();
  	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var response = ajax.responseText;

			if (response == "success") {
			    date = new Date();
			    date.setTime(date.getTime() + (24*60*60*1000));
				document.cookie = "user=true; expires=" + date.toGMTString();
				window.location.href = "index.html";
			}
			else if (response == "failure") {
				window.location.href = "pghlogin.html";
			}
			else {
				alert("wut");
			}
		}
	}
	
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	ajax.open("POST", "php/pghlogin.php", true);	
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send("email=" + email + "&password=" + password);
}
	
	
	/*
	ajax = new XMLHttpRequest();
  	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			alert("yas");
			var response = ajax.responseText;
			
			if (response.compareTo("success") === 0) {
			    date = new Date();
			    date.setTime(date.getTime() + (24*60*60*1000));
				document.cookie = "user=true; expires=" + date.toGMTString();
				
			}
			else {
				
			}
		}
	}
	
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	ajax.open("POST", "php/pghlogin.php", true);	
	ajax.setRequestHeader("Content-type", "");
	ajax.send("username=" + email);*/
//}
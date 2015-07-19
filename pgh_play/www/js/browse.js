/**
 * function main()
 *
 */
var main = function() {
	//Send AJAX request for neighborhoods JSON object PHP script
	ajax = new XMLHttpRequest();
  	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			alert("yas");
			var response = ajax.responseText;
			alert(response);
			//var hoods = JSON.parse(response);
			//var hoods = JSON.parse(ajax.response);
		}
	}
	
	ajax.open("GET", "php/pghgetneighborhoods.php", true);	
	ajax.send();
};

// 
$(document).ready(main);


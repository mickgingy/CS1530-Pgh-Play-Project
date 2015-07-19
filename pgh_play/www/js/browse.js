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
		}
	}
	
	ajax.open("GET", "php/phpgetneighborhoods.php", true);	
	ajax.send();
};

// 
$(document).ready(main);


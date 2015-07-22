var park_data = [];
var neighborhoods = [];
/**
 * function main()
 *
 */
var main = function() {
	//Send AJAX request for neighborhoods JSON object PHP script
	ajax = new XMLHttpRequest();
  	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var response = JSON.parse(ajax.responseText);
			var i;
			for(i = 0; i < response.length; i++){
				neighborhoods[i] = response[i];
				a = new XMLHttpRequest();
				a.onreadystatechange = function() {
					if (a.readyState == 4 && a.status == 200) {
						var obj = JSON.parse(a.responseText);
						park_data[i] = obj;
					}
				}
				a.open("GET", "http://54.163.175.56/pgh/pghgetparksbyneighborhood.php?neighborhood=" + response[i], false);
				a.send();
			}
		}
	}
	
	ajax.open("GET", "http://54.163.175.56/pgh/pghgetneighborhoods.php", true);	
	ajax.send();
};

// 
$(document).ready(main);


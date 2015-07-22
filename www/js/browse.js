//var park_data = [];
//var neighborhoods = [];

/**
 * 	function main()
 *
 *	Simple AJAX call function, gets all neighborhoods in the Database and all parks in each neighborhood
 */
var main = function() {
	//Send AJAX request for neighborhoods JSON object PHP script
	ajax = new XMLHttpRequest();
  	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) { 
			var response = JSON.parse(ajax.responseText);
			var i;
			for(i = 0; i < response.length; i++) {
				// Add the neighborhood to the list
				addToList(response[i], true);
				
				a = new XMLHttpRequest();
				a.onreadystatechange = function() {
					if (a.readyState == 4 && a.status == 200) {
						var obj = JSON.parse(a.responseText);
						var j;
						for(j = 0; j < obj.length; j++){
							addToList(obj[j].park_name, false);
						}
					}
				}
				a.open("GET", "http://54.163.175.56/pgh/pghgetparksbyneighborhood.php?neighborhood=" + response[i], false);
				a.send();
			}
		}
	}
	
	ajax.open("GET", "http://54.163.175.56/pgh/pghgetneighborhoods.php", true);
	//ajax.open("GET", "pgh/pghgetneighborhoods.php");
	ajax.send();
};

$(document).ready(main);

//For example:
//addToList("Oakland", true);
//addToList("Schenley Park", false);
//addToList("Random Playground", false);

/**
 *	function addToList()
 *
 *	Add a park to the #TheList div.
 *	Param: name — the name of the park or neighborhood to be added
 * 	Param: isHood — boolean: is the first parameter a neighborhood (true) or park (false)?
 */
function addToList(name, isHood) {
	var newDiv = document.createElement('div');
	newDiv.className = 'listElement';
	newDiv.innerHTML = name;
	newDiv.id = name;
	if (isHood == true) {
		newDiv.id = 'hood';
	}
	else {
		newDiv.id = 'park';
		newDiv.onclick = function() { goToParkPage(name);  };
	}

	$('#TheList').append(newDiv);
}

/**
 *	function goToParkPage()
 *
 *	Jump to the park page of a user-specified park.
 *	Param: name — the name of the park we want to search for
 */
function goToParkPage(name) {
	localStorage['park_name'] = name;
	window.location.href = 'viewpark.html';
}

// PGH Play project
// new park entry script
// enter information about the park into the db and populate tables via newpark.hml
var zip;
var lng;
var lat;

$(document).ready(function() {
	$("#sub_btn").on('click', function() {
		// create variables from html elements
		var name = $('#name').val();
		var address = $('#address').val();
		var neighborhood = $('#neighborhood').val();
		//var rating = $('#rating').val();
		//var comment = $('textarea#comment').val();
			
	    $(".rating input:radio").attr("checked", false);
		$('.rating input').click(function () {
			$(".rating span").removeClass('checked');
			$(this).parent().addClass('checked');
		});

	    $('input:radio').change(function(){
			var userRating = this.value;
			alert(userRating);
		}); 
		
		
		var obj = {	"name" : name,
		"address" : address,
		"zip" : zip,
		"neighborhood" : neighborhood, 
		"gpslong": lng,
		"gpslat": lat,
		"infant_safe" : document.getElementById('infants').checked,
		"toddler_safe" : document.getElementById('toddlers').checked,
		"five_eight_safe" : document.getElementById('5-8').checked,
		"nine_twelve_safe" : document.getElementById('9-12').checked,
		"universal_safe" : document.getElementById('universal').checked,
		attributes : [
			{	"attribute_id" : 1,
				"attribute_name" : "Playground",
				"attribute_checked": document.getElementById('playground').checked
			},
			{	"attribute_id" : 2,
				"attribute_name" : "Picnic Tables",
				"attribute_checked": document.getElementById('picnic').checked
			},
			{	"attribute_id" : 3,
				"attribute_name" : "Grills",
				"attribute_checked": document.getElementById('grills').checked
			},
			{	"attribute_id" : 4,
				"attribute_name" : "Walking Track",
				"attribute_checked": document.getElementById('track').checked
			},
			{	"attribute_id" : 5,
				"attribute_name" : "Soccer Fields",
				"attribute_checked": document.getElementById('soccer').checked
			},
			{	"attribute_id" : 6,
				"attribute_name" : "Baseball Fields",
				"attribute_checked": document.getElementById('baseball').checked
			},
			{	"attribute_id" : 7,
				"attribute_name" : "Street Hockey Court",
				"attribute_checked": document.getElementById('hockey').checked
			},
			{	"attribute_id" : 8,
				"attribute_name" : "Pool",
				"attribute_checked": document.getElementById('pool').checked
			},
			{	"attribute_id" : 9,
				"attribute_name" : "Baby Pool",
				"attribute_checked": document.getElementById('babypool').checked
			},
			{	"attribute_id" : 10,
				"attribute_name" : "Basketball Courts",
				"attribute_checked": document.getElementById('basketball').checked
			},
			{	"attribute_id" : 11,
				"attribute_name" : "Pavilions",
				"attribute_checked": document.getElementById('pavilion').checked
			}
		],
		nearby : [
			{ 
				"attribute_id" : 12,
				"attribute_name" : "Coffee",
				"checked" : document.getElementById('coffee').checked
			},
			{ 
				"attribute_id" : 13,
				"attribute_name" : "Groceries",
				"checked" : document.getElementById('groceries').checked
			},
			{ 
				"attribute_id" : 14,
				"attribute_name" : "Restaurants",
				"checked" : document.getElementById('restaurants').checked
			},
			{ 
				"attribute_id" : 15,
				"attribute_name" : "Wireless",
				"checked" : document.getElementById('wireless').checked
			},
			{ 
				"attribute_id" : 16,
				"attribute_name" : "Shopping",
				"checked" : document.getElementById('shopping').checked
			}
		]
	};
	
	
	// post to server to store information
	$.post('http://54.163.175.56/pgh/newpark.php',"obj=" + JSON.stringify(obj), function(data){
			alert(data);	
		});
	 });
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
	else { 
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'location': new google.maps.LatLng(lat = position.coords.latitude, lng = position.coords.longitude) }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				$('#address').val(results[0].formatted_address);
				var i;
				for(i = 0; i < results[0].address_components.length; i++){
					if(results[0].address_components[i].types[0] == "postal_code"){
						zip = results[0].address_components[i].long_name;
						break;
					}
				}
			}
		}
	});
}


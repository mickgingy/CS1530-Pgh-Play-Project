// PGH Play project
// new park entry script
// enter information about the park into the db and populate tables via newpark.hml
$(document).ready(function() {
	$("#sub_btn").on('click', function() {
			// create variables from html elements
			var name = $('#name').val();
			var address = $('#address').val();
			var zip = $('#zip').val();
			var neighborhood = $('#neighborhood').val();
			var rating = $('#rating').val();
			
			// if infant is checked
 /*			if($("#infants").is(':checked')){
				var infants = "yes";
			}
			else {
				var infants = "no";
			}
			// if toddlers is checked
			if($("#toddlers").is(':checked')){
				var toddlers = "yes";
			}
			else {
				var toddlers = "no";
			}
			// if 5-8 is checked
			if($("#5-8").is(':checked')){
				var five_eight = "yes";
			}
			else {
				var five_eight = "no";
			}
			// if 9-12 is checked
			if($("#9-12").is(':checked')){
				var nine_twelve = "yes";
			}
			else {
				var nine_twelve = "no";
			}
	*/
			var comment = $('textarea#comment').val();
			
		
			
	    $(".rating input:radio").attr("checked", false);
	       $('.rating input').click(function () {
	           $(".rating span").removeClass('checked');
	           $(this).parent().addClass('checked');
	       });

	       $('input:radio').change(
	       function(){
	           var userRating = this.value;
	           alert(userRating);
	       }); 
		  
		 //
		
		
		var obj = {	"name" : name,
		"address" : address,
		"zip" : zip,
		"neighborhood" : neighborhood, 
		"infant_safe" : $('#infants').is(':checked'),
		"toddler_safe" : $('#toddlers').is(':checked'),
		"five_eight_safe" : $('#5-8').is(':checked'),
		"nine_twelve_safe" : $('#9-12').is(':checked'),
		"universal_safe" : $('#universal').is(':checked'),
		attributes : [
			{	"attribute_id" : 1,
				"attribute_name" : "Playground",
				"attribute_checked": $('#playground').is(':checked')
			},
			{	"attribute_id" : 2,
				"attribute_name" : "Picnic Tables",
				"attribute_checked": $('#picnic').is(':checked')
			},
			{	"attribute_id" : 3,
				"attribute_name" : "Grills",
				"attribute_checked": $('#grills').is(':checked')
			},
			{	"attribute_id" : 4,
				"attribute_name" : "Walking Track",
				"attribute_checked": $('#track').is(':checked')
			},
			{	"attribute_id" : 5,
				"attribute_name" : "Soccer Fields",
				"attribute_checked": $('#soccer').is(':checked')
			},
			{	"attribute_id" : 6,
				"attribute_name" : "Baseball Fields",
				"attribute_checked": $('#baseball').is(':checked')
			},
			{	"attribute_id" : 7,
				"attribute_name" : "Street Hockey Court",
				"attribute_checked": $('#hockey').is(':checked')
			},
			{	"attribute_id" : 8,
				"attribute_name" : "Pool",
				"attribute_checked": $('#pool').is(':checked')
			},
			{	"attribute_id" : 9,
				"attribute_name" : "Baby Pool",
				"attribute_checked": $('#babypool').is(':checked')
			},
			{	"attribute_id" : 10,
				"attribute_name" : "Basketball Courts",
				"attribute_checked": $('#basketball').is(':checked')
			},
			{	"attribute_id" : 11,
				"attribute_name" : "Pavilions",
				"attribute_checked": $('#paviolion').is(':checked')
			}
		],
		nearby : [
			{ 
				"name" : "Coffee",
				"checked" : $('#coffee').is(':checked')
			},
			{ 
				"name" : "Groceries",
				"checked" : $('#groceries').is(':checked')
			},
			{ 
				"name" : "Restaurants",
				"checked" : $('#restaurants').is(':checked')
			},
			{ 
				"name" : "Wireless",
				"checked" : $('#wireless').is(':checked')
			},
			{ 
				"name" : "Shopping",
				"checked" : $('#shopping').is(':checked')
			}
		]
	};
	alert(obj.name);
			// post to server to store information
			$.post('php/newpark.php',{obj:JSON.stringify(obj)}, function(data){
				alert(data);
			
			});
	 });


});
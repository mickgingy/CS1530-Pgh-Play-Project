// PGH Play project
// new park entry script
// enter information about the park into the db and populate tables via newpark.hml
$(document).ready(function() {
	$('input#enter').on('click', function() {
			// create variables from html elements
			var name = $('#name').val();
			var address = $('#address').val();
			var zip = $('#zip').val();
			var neighborhood = $('#neighborhood').val();
			var rating = $('#rating').val();
			
			// if infant is checked
			if($("#infants").is(':checked')){
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
			var comment = $('textarea#comment').val();
			
		//
			
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
		"infant_safe" : infants,
		"toddler_safe" : toddlers,
		"five_eight_safe" : five_eight,
		"nine_twelve_safe" : nine_twelve,
		attributes : [
			{	"attribute_id" : 1,
				"attribute_name" : "Swingset"
			},
			{	"attribute_id" : 2,
				"attribute_name" : "Grill"
			}
		]
	};
	alert(obj.name);
			// post to server to store information
			$.post('newpark.php',{obj:JSON.stringify(obj)}, function(data){
				alert(data);
			
			});
		
	 });


});
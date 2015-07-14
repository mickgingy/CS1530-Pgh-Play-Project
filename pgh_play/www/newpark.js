// PGH Play project
// new park entry script
// enter information about the park into the db and populate tables via newpark.hml

$(document).ready(function(){

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
			
			// post to server to store information
			$.post('newpark.php',{name:name, address:address, zip:zip, neighborhood:neighborhood, rating:rating, infants:infants, toddlers:toddlers, five_eight:five_eight, nine_twelve:nine_twelve, comment:comment}, function(data){
				alert(data);
			
			});
		
	 });


});
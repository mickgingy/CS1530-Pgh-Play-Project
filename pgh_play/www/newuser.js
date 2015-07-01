// PGH Play project
// new user script
// check if username or email is already taken
// check if password is re-entered correctly

$(document).ready(function(){

	$('input#enter').on('click', function() {
			var pw = $('#password').val();
			var confirm = $('#confirm').val();
			var username = $('#username').val();
			var email = $('#email').val();
			// if passwords match
			if (pw.localeCompare(confirm) == 0) {
					// check if username already exists
					$.post('pghnewuser.php',{username:username, email:email, pw:pw, confirm:confirm}, function(data){
							var exists = data;
							if (exists.localeCompare("exists") == 0){
									alert("username or email already exists, please re-enter");
									$('#password').val("");
									$('#confirm').val("");
									$('#email').val("");
									$('#username').val("");
							}
							else {
									alert("Welcome to Pittsburgh Play!");
									}
					});
			}
			else {
				alert("passwords did not match, please re-enter");
				$('#password').val("");
				$('#confirm').val("");
				$('#email').val("");
				$('#username').val("");
			}
	 });


});
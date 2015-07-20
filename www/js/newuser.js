// PGH Play project
// new user script
// check if username or email is already taken
// check if password is re-entered correctly

$(document).ready(function() {
	$('#enter').on('click', function() {
			var pw = $('#password').val();
			var confirm = $('#confirm').val();
			var username = $('#username').val();
			var email = $('#email').val();
			var name = $('#name').val();
			
			// if passwords match
			if (pw.localeCompare(confirm) == 0) {
					// check if username already exists
					$.post('php/pghnewuser.php', {username:username, email:email, name:name, pw:pw, confirm:confirm}, 
					function(data) {
						if (data.localeCompare("exists") == 0) {
								alert("username or email already exists, please re-enter");
								$('#password').val("");
								$('#confirm').val("");
								$('#email').val("");
								$('#username').val("");
								$('#name').val("");
						}
						else {
							alert("returned data: " + data);
							window.location.href = 'index.html';
						}
					});
			}
			else {
				alert("passwords did not match, please re-enter");
				$('#password').val("");
				$('#confirm').val("");
				$('#email').val("");
				$('#username').val("");
				$('#name').val("");
			}
	 });


});
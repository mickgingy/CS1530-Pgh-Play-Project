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
			if (pw == confirm) {
					// check if username already exists
					$.post('http://54.163.175.56/pgh/pghnewuser.php', {username:username, email:email, name:name, pw:pw, confirm:confirm}, 
					function(data) {
						if (data == "exists") {
								alert("username or email already exists, please re-enter");
								$('#password').val("");
								$('#confirm').val("");
								$('#email').val("");
								$('#username').val("");
								$('#name').val("");
						}
						else {
							alert("Your account has been successfully created!");
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
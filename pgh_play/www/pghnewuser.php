<!DOCTYPE html>
<?php
# User login PGH_Play
session_start();
#connect to db
	$db = new mysqli('localhost', 'root', 'root', 'pghplay');
      if ($db->connect_error):
         die ("Could not connect to db: " . $db->connect_error);
      endif;
	  # check if password is re-entered correctly
	  if (strcmp($_POST['password'],$_POST['confirm']) == 0):
	  # hash password
	    $pass = hash('sha256', rtrim($_POST["password"]));
		$query = "INSERT INTO users (user, password, email) VALUES  ('$_POST[username]', '$pass', '$_POST[email]')";
		$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
		
	# go to home page. currently browse.html
		header('Location: http://localhost:8666/browse.html');
		
	else:
		# return to page if passwords dont match
		header('Location: http://localhost:8666/newuser.html');

	endif;
?>
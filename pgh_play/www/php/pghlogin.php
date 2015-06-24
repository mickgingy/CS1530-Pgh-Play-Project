<!DOCTYPE html>
<?php
# User login PGH_Play
session_start();
#connect to db
	$db = new mysqli('localhost', 'root', 'root', 'pghplay');
      if ($db->connect_error):
         die ("Could not connect to db: " . $db->connect_error);
      endif;
	  $pass = hash('sha256', rtrim($_POST["password"]));
		$query = "SELECT * FROM users  WHERE user='$_POST[username]' && password='$pass'";
		$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
		$pws = $result->fetch_all(MYSQLI_ASSOC);
		if ($result->num_rows ==1)
		{
			$_SESSION['user'] = $_POST['username'];
			header('Location: http://localhost:8666/browse.html');
		}
		else
		{
			header('Location: http://localhost:8666/PGHlogin.html');
		}

?>
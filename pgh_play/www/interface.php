<?php
#
//session_start();

// global db var
$db = new mysqli('localhost', 'root', 'root', 'pghplay');

// connect to DB
function connect(){
	  global $db;
      if ($db->connect_error):
         die ("Could not connect to db: " . $db->connect_error);
      endif;
}

// verify username and email when signing up as new user
function create_new() {
			global $db;
			connect();
			$query = "SELECT user from users WHERE user = '$_POST[username]'";
			$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
			$user = $result->fetch_array();
		
		  #check if email already exists
			$query = "SELECT email from users WHERE email = '$_POST[email]'";
			$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
			$email = $result->fetch_array();
			if (sizeof($email) > 0 || sizeof($user) > 0):
				echo "exists"; // if email or username already exist, user must re-enter new information
				return false;
			else:
				echo "dne"; // does not exist
				 $pass = hash('sha256', rtrim($_POST["pw"]));
				 // hash password and enter new user into DB
				$query = "INSERT INTO users (user, password, email) VALUES  ('$_POST[username]', '$pass', '$_POST[email]')";
				$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
				return true;
			endif;
			return false;
}

function login() {
		global $db;
		connect();
	    $pass = hash('sha256', rtrim($_POST["pw"]));
		// verify username and password match
		$query = "SELECT * FROM users  WHERE user='$_POST[username]' && password='$pass'";
		$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
		$pws = $result->fetch_all(MYSQLI_ASSOC);
		if ($result->num_rows ==1)
		{
			// store session var and go to browse.html
			$_SESSION['user'] = $_POST['username'];
			header('Location: http://localhost:8666/browse.html');
		}
		else
		{
			header('Location: http://localhost:8666/PGHlogin.html');
		}
}


?>
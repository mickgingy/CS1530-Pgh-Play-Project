<?php
#
//session_start();

// global db var
$db = NULL;
//If true, will output with $& delimiters, if false, will output in JSON encoding
$delim_output = true;

/*
	Function opens a database connection to MySQL Server
	Parameters: None
	Returns: None
*/
function connect(){
	global $db;
	//Check to see if connection was already created prior in this webrequest.
	if(!isset($db)){
		$db = new mysqli('localhost', 'root', 'root', 'pghplay');
		if ($db->connect_error){
			die ("Could not connect to db: " . $db->connect_error);
		}
	}
}

/*
	Function creates a new user in the MySQL database
	Parameters: 
		POST : username
		POST : email
		POST : pw
	Returns:
		true : user successfully created
		false : user not created
*/
function create_new() {
	global $db;
	connect();
	$query = "SELECT user from users WHERE user = '{$_POST[username]}'";
	$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
	$user = $result->fetch_array();
	
	#check if email already exists
	$query = "SELECT email from users WHERE email = '{$_POST[email]}'";
	$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
	$email = $result->fetch_array();
	//Check the count of items to see if this user has already been created or not
	if (sizeof($email) > 0 || sizeof($user) > 0):
		echo "exists"; // if email or username already exist, user must re-enter new information
		return false;
	else:
		echo "dne"; // User does not exist
		$pass = hash('sha256', rtrim($_POST["pw"]));
		// hash password and enter new user into DB
		$query = "INSERT INTO users (user, password, email) VALUES  ('{$_POST[username]}', '$pass', '{$_POST[email]}')";
		$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
		return true;
	endif;
	return false;
}

/*
	Logs a user into system, sets session variable
	Parameters: 
		POST : username
		POST : pw
	Returns: None
*/
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

/*
	Returns a list of neighborhoods in the system
	Parameters:
		GET (Optional) : zip
	Returns:
		&$ delimited list of neighborhoods
		OR
		JSON encoded array of neighborhoods
*/
function get_neighborhoods(){
	global $db;
	global $delim_output;
	connect();
	
	//Check if the zip parameter was sent
	if(isset($_GET['zip'])){	//Make appropriate SQL Query.
		$query = "SELECT * FROM neighborhoods WHERE zip_code={$_GET['zip']}";
	}else{
		$query = "SELECT * FROM neighborhoods";
	}
	$result = $db->query($query);
	$row = $result->fetch_array();
	$results = array();
	//Iterate over each row returned from query
	while($row != NULL){
		//Clear the previous values of the row entry
		if(isset($r_row))
			unset($r_row);
		//Push necessary items into the $r_row variable
		$r_row['neighborhood_id'] = $row['neighborhood_id'];
		$r_row['neighborhood_name'] = $row['name'];
		$r_row['zip_code'] = $row['zip_code'];
		//Add it to the results
		$results[] = $r_row;
		$row = $result->fetch_array();
	}
	
	//Format the results in the appropriate method (see $delim_output)
	if($delim_output){
		//Output using the $ & method
		$output = "";
		foreach($results as $val){
			foreach($val as $k => $v){
				$output = $output . "$k&$v&";
			}
			$output = rtrim($output, '&') . '$';
		}
		$output = rtrim($output, '$');
	}else{
		//Output using JSON
		$output = json_encode($results);
	}
	
	echo $output;
	return $results;
}

/*
	Returns a list of parks in the system
	Parameters:
		GET : zip
	Returns:
		&$ delimited list of parks
		OR
		JSON encoded array of parks
*/
function get_parks(){
	global $db;
	global $delim_output;
	connect();
	
	//Check if the zip parameter was sent
	if(isset($_GET['zip'])){
		$query = "SELECT * FROM parks WHERE zip_code={$_GET['zip']}";
	}else{
		die("{error:\"Missing parameter: zip\"}");
	}
	$result = $db->query($query);
	$row = $result->fetch_array();
	$results = array();
	//Iterate over each row returned from query
	while($row != NULL){
		//Clear the previous values of the row entry
		if(isset($r_row))
			unset($r_row);
		//Push necessary items into the $r_row variable
		$r_row['park_id'] = $row['park_id'];
		$r_row['park_name'] = $row['name'];
		$r_row['park_address'] = $row['address'];
		$r_row['zip_code'] = $row['zip_code'];
		//Add it to the results
		$results[] = $r_row;
		$row = $result->fetch_array();
	}
	
	//Format the results in the appropriate method (see $delim_output)
	if($delim_output){
		//Output using the $ & method
		$output = "";
		foreach($results as $val){
			foreach($val as $k => $v){
				$output = $output . "$k&$v&";
			}
			$output = rtrim($output, '&') . '$';
		}
		$output = rtrim($output, '$');
	}else{
		//Output using JSON
		$output = json_encode($results);
	}
	
	echo $output;
	return $results;
}


?>
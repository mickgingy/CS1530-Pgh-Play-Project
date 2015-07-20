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
		POST : name
	Returns:
		true : user successfully created
		false : user not created
*/
function create_new() {
	global $db;
	connect();
	#check if email already exists
	$query = "SELECT email from users WHERE email = '{$_POST['email']}'";
	$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
	$email = $result->fetch_array();
	//Check the count of items to see if this user has already been created or not
	if ($email !== NULL):
		echo "exists"; // if email already exists, user must re-enter new information
		//return false;
	else:
		//echo "dne"; // User does not exist
		$pass = hash('sha256', rtrim($_POST["pw"]));
		// hash password and enter new user into DB
		$query = "INSERT INTO users (email, name, password) VALUES  ('{$_POST['email']}', '{$_POST['name']}', '$pass')";
		$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
		echo $result;
		//return true;
	endif;
	//return false;
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
	$pass = hash('sha256', rtrim($_POST["password"]));
	// verify username and password match
	$query = "SELECT * FROM users WHERE email='{$_POST['email']}' && password='$pass'";
	$result = $db->query($query) or trigger_error(mysql_error()." ".$query);
	$pws = $result->fetch_all(MYSQLI_ASSOC);
	
	$retval = "";
	
	if ($result->num_rows == 1)
	{
		// store session var and go to browse.html
		$_SESSION['user'] = $_POST['email'];
		$retval = "success";
	}
	else
	{
		$retval = "failure";
	}
	
	echo $retval;
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
		die("{\"error\":\"Missing parameter: zip\"}");
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

/*
Creates a new park in the system
Parameters:
	POST : obj - A properly JSON encoded string of a park:
	{	"name" : "park_name",
		"address" : "street_address",
		"zip" : "zip_code",
		"neighborhood" : "neighborhood_name",  (OPTIONAL)
		"infant_safe" : "true|false|1|0",
		"toddler_safe" : "true|false|1|0",
		"five_eight_safe" : "true|false|1|0",
		"nine_twelve_safe" : "true|false|1|0",
		attributes : [
			{	"attribute_id" : 1,
				"attribute_name" : "Swingset"
			},
			{	"attribute_id" : 2,
				"attribute_name" : "Grill"
			},
			...
		]
	}
Returns:
	JSON encoded object containing park information
*/
function new_park(){
	global $db;
	connect();
	$park_id = 0;
	
	if(!isset($_POST['obj'])){
		die("{\"error\":\"Missing parameter: obj\"}");
	}
	
	$obj = json_decode($_POST['obj'], true);
	$name = $obj['name'];
	$address = $obj['address'];
	$zip = $obj['zip'];
	if(isset($obj['infant_safe']))
		$infant_safe = $obj['infant_safe'];
	else
		$infant_safe = 0;
	if(isset($obj['toddler_safe']))
		$toddler_safe = $obj['toddler_safe'];
	else
		$toddler_safe=0;
	if(isset($obj['five_eight_safe']))
		$five_eight_safe = $obj['five_eight_safe'];
	else
		$five_eight_safe = 0;
	if(isset($obj['nine_twelve_safe']))
		$nine_twelve_safe = $obj['nine_twelve_safe'];
	else
		$nine_twelve_safe = 0;
	
	if(!isset($obj['neighborhood'])){
		$result = $db->query("INSERT INTO parks (name, address, zip_code, infants, toddlers, five, nine) VALUES ('$name','$address','$zip','$infant_safe','$toddler_safe','$five_eight_safe','$nine_twelve_safe')") or trigger_error(mysql_error());
	}else{
		$result = $db->query("INSERT INTO parks (name, address, zip_code, neighborhood, infants, toddlers, five, nine) VALUES ('$name','$address','$zip','{$obj['neighborhood']}','$infant_safe','$toddler_safe','$five_eight_safe','$nine_twelve_safe')") or trigger_error(mysql_error());
	}
	if(isset($obj['attributes'])){
		foreach($obj['attributes'] as $attribute){
			$db->query("INSERT INTO ParkAttributes (park_id, attribute_id) VALUES ($park_id, {$attribute['attribute_id']}}))");
		}
	}
}

/*
Returns the detailed park info in JSON form given a park_id
Parameters:
	GET : park_id
Returns:
	JSON encoded object containing park information:
	{	"name" : "park_name",
		"address" : "street_address",
		"zip" : "zip_code",
		"neighborhood" : "neighborhood_name",  (OPTIONAL)
		"infant_safe" : "true|false|1|0",
		"toddler_safe" : "true|false|1|0",
		"five_eight_safe" : "true|false|1|0",
		"nine_twelve_safe" : "true|false|1|0",
		attributes : [
			{	"attribute_id" : 1,
				"attribute_name" : "Swingset"
			},
			{	"attribute_id" : 2,
				"attribute_name" : "Grill"
			},
			...
		]
	}
*/
function get_park_info(){
	global $db;
	connect();
	if(isset($_GET['park_id'])){
		$p_id = $_GET['park_id'];
		$output = array();
		$result = $db->query("SELECT * FROM Parks WHERE park_id = $p_id");
		$row = $result->fetch_array();
		if($row == NULL){
			die("{\"error\":\"Invalid park_id\"}");
		}else{
			$output['name'] = $row['name'];
			$output['park_id'] = $row['park_id'];
			$output['address'] = $row['address'];
			$output['zip'] = $row['zip_code'];
			$output['neighborhood'] = $row['neighborhood'];
			$output['infant_safe'] = $row['infant'];
			$output['toddler_safe'] = $row['toddlers'];
			$output['five_eight_safe'] = $row['five'];
			$output['nine_twelve_safe'] = $row['nine'];
			$result = $db->query("SELECT AVERAGE(rating) as star, COUNT(rating) as num FROM comments WHERE park_id=$p_id");
			$row = $result->fetch_array();
			$output['rating'] = $row['star'];
			$output['num_ratings'] = $row['num'];
			$result = $db->query("SELECT * FROM attributes, ParkAttributes WHERE attributes.attribute_id = ParkAttributes.attribute_id AND park_id=$p_id");
			$row = $result->fetch_array();
			$i = 0;
			while(row != NULL){
				$output['attributes'][$i]['attribute_id'] = $row['attribute_id'];
				$output['attributes'][$i]['attribute_name'] = $row['attribute'];
				$i++;
				$row = $result->fetch_array();	
			}
		}
		
		echo json_encode($output);
	}else{
		die("{\"error\":\"Missing parameter: park_id\"}");
	}
}

/*
	Adds a new comment to a specific park
	Parameters:
		POST : park_id
		POST : comment
		POST : user_id
		POST : star_rating
	Returns:
		None
*/
function add_comment(){
	global $db;
	connect();
	if(isset($_POST['comment'])){
		$uid = $_POST['user_id'];
		$pid = $_POST['park_id'];
		$c = $_POST['comment'];
		$r = $_POST['star_rating'];
		$db->query("INSERT INTO comments (user_id, park_id, comment, rating) VALUES ($uid,$pid,'$c',$r)");
	}else{
		die("{\"error\":\"Missing parameter(s)\"}");
	}	
}

/*
	Returns a list of JSON encoded comments for a specific park
	Parameters:
		GET : park_id
	Returns:
		JSON Encoded list of comments for a specific park
		[
			{
				"user_id" : 1,
				"user_name" : "Nick",
				"comment" : "This park is awesome.",
				"rating" : 5
			},
			{
				"user_id" : 2,
				"user_name" : "Mick",
				"comment" : "This park is terrible.",
				"rating" : 0
			},
			...
		]
*/
function get_comments(){
	global $db;
	connect();
	if(isset($_GET['park_id'])){
		$output = array();
		$i = 0;
		$pid = $_GET['park_id'];
		$result = $db->query("SELECT * FROM comments, users WHERE comments.user_id = users.user_id AND park_id = $pid");
		$row = $result->fetch_array();
		while($row != NULL){
			$output[$i]['user_id'] = $row['user_id'];
			$output[$i]['user_name'] = $row['users.name'];
			$output[$i]['comment'] = $row['comment'];
			$output[$i]['rating'] = $row['rating'];
			$i++;
			$row = $result->fetch_array();	
		}
		echo json_encode($output);
	}else{
		die("{\"error\":\"Missing parameter: park_id\"}");
	}
}

/*
	Returns a list of JSON encoded attributes list to recommend to user during park creation
	Parameters:
		None
	Returns:
		JSON Encoded list of attributes
		[
			{
				"attribute_id" : 1,
				"attribute_name" : "Swimming Pool"
			},
			{
				"attribute_id" : 2,
				"attribute_name" : "Swing Set"
			},
			...
		]
*/
function get_attributes_list(){
	global $db;
	connect();
	$result = $db->query("SELECT * FROM attributes");
	$output = array();
	$i = 0;
	$row = $result->fetch_array();
	while($row != NULL){
		$output[$i]['attribute_id'] = $row['attribute_id'];
		$output[$i]['attribute_name'] = $row['attribute_name'];
		$i++;
		$row = $result->fetch_array();
	}
	
	echo json_encode($output);
}
?>
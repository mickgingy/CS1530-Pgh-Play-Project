<!DOCTYPE html>
<html>
 <head>
  <title>init</title>
 </head>
 <body>
 <?php
 # initialize database for PGH Play app. Currently running on a local server (xampp)
 
# create mySQL connection
$db = new mysqli('localhost', 'root', 'root', 'pghplay');
      if ($db->connect_error):
         die ("Could not connect to db: " . $db->connect_error);
      endif;
	  
# delete tables if already created
$db->query("drop table users");  
$db->query("drop table parks");  
$db->query("drop table neighborhoods");  
$db->query("drop table attributes");  
$db->query("drop table comments");  
$db->query("drop table ratings");  
$db->query("drop table ages");
$db->query("drop table Parkattributes");
  
# initialize user, parks, and neighborhoods tables
 $result = $db->query("create table users (user_id int primary key not null AUTO_INCREMENT, email char(50) not null,  name char(20) not null, password char(255) not null, date char(20) not null)") or die ("Invalid: " . $db->error);
 $result = $db->query("create table parks (park_id int primary key not null AUTO_INCREMENT, name char(50) not null, address char(100) not null, zip_code int not null, neighborhood char(50), infants bool, toddlers bool, five bool, nine bool)") or die ("Invalid: " . $db->error);	
 $result = $db->query("create table neighborhoods (neighborhood_id int primary key not null AUTO_INCREMENT, name char(50) not null, zip_code char(10) not null)") or die ("Invalid: " . $db->error);

// initialize other tables for attributes, pictures, comments, ratings, ages
// NOTE: pictures db is not implemented yet
 $result = $db->query("create table attributes (attribute_id int primary key not null AUTO_INCREMENT, attribute char(50) not null)") or die ("Invalid: " . $db->error);
 $result = $db->query("create table ParkAttributes (park_id int not null, attribute_id int not null)") or die ("Invalid: " . $db->error);
 //$result = $db->query("create table pictures (park_id int not null, picture char(50) not null)") or die ("Invalid: " . $db->error);
 $result = $db->query("create table comments (user_id int not null, park_id int not null, comment char(250) not null, rating double not null)") or die ("Invalid: " . $db->error);
 //$result = $db->query("create table ratings (park_id int primary key not null, rating double not null, num_votes int not null)") or die ("Invalid: " . $db->error); 
 
 //$result = $db->query("create table ages (park_id int not null, infants bool, toddlers bool, five bool, nine bool)") or die ("Invalid: " . $db->error); 
 
  
# put parks in table (temp)

	//  $query = "insert into parks  values (1, 'Schenley Park', 'Schenley Park, Pittsburgh PA', '15213', 'Oakland')";
      //$db->query($query) or die ("Invalid insert " . $db->error);
	  
# put neighborhoods in table (temp)

	  //$query = "insert into neighborhoods  values (1, 'Oakland', '15213')";
      //$db->query($query) or die ("Invalid insert " . $db->error);
	  
	  
	  echo "Database initialized.";
?>
</body>
</html>
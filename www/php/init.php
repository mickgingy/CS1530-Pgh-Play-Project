 <?php
 # initialize database for PGH Play app. Currently running on a local server (xampp)
 
# create mySQL connection
$db = new mysqli('localhost','root','','pghplay');
      if ($db->connect_error):
         die ("Could not connect to db: " . $db->connect_error);
      endif;
	  
# delete tables if already created
$db->query("drop table users");  
$db->query("drop table parks");  
$db->query("drop table neighborhoods");  
$db->query("drop table attributes");  
$db->query("drop table comments");  
$db->query("drop table ParkAttributes");
  
$result = $db->query("create table users (user_id int primary key not null AUTO_INCREMENT, email char(50) not null,  name char(20) not null, password char(255) not null, date char(20) not null)") or die ("Invalid: " . $db->error);

$result = $db->query("create table parks (park_id int primary key not null AUTO_INCREMENT, name char(50) not null, address char(100) not null, zip_code int not null, gpslong decimal(8,5), gpslat decimal(8,5), neighborhood char(50), infants bool, toddlers bool, five bool, nine bool)") or die ("Invalid: " . $db->error);	

$result = $db->query("create table neighborhoods (neighborhood_id int primary key not null AUTO_INCREMENT, name char(50) not null, zip_code char(10) not null)") or die ("Invalid: " . $db->error);

$result = $db->query("create table attributes (attribute_id int primary key not null AUTO_INCREMENT, attribute char(50) not null)") or die ("Invalid: " . $db->error);

$result = $db->query("create table ParkAttributes (park_id int not null, attribute_id int not null, nearby bool)") or die ("Invalid: " . $db->error);

$result = $db->query("create table comments (user_id int not null, park_id int not null, comment char(250) not null, rating double not null)") or die ("Invalid: " . $db->error);

$result = $db->query("insert into attributes (attribute) VALUES ('Playground')");
$result = $db->query("insert into attributes (attribute) VALUES ('Picnic Tables')");
$result = $db->query("insert into attributes (attribute) VALUES ('Grills')");
$result = $db->query("insert into attributes (attribute) VALUES ('Walking Track')");
$result = $db->query("insert into attributes (attribute) VALUES ('Soccer Fields')");
$result = $db->query("insert into attributes (attribute) VALUES ('Baseball Fields')");
$result = $db->query("insert into attributes (attribute) VALUES ('Street Hockey Court')");
$result = $db->query("insert into attributes (attribute) VALUES ('Pool')");
$result = $db->query("insert into attributes (attribute) VALUES ('Baby Pool')");
$result = $db->query("insert into attributes (attribute) VALUES ('Basketball Courts')");
$result = $db->query("insert into attributes (attribute) VALUES ('Pavilions')");
$result = $db->query("insert into attributes (attribute) VALUES ('Coffee')");
$result = $db->query("insert into attributes (attribute) VALUES ('Groceries')");
$result = $db->query("insert into attributes (attribute) VALUES ('Restaurants')");
$result = $db->query("insert into attributes (attribute) VALUES ('Wireless')");
$result = $db->query("insert into attributes (attribute) VALUES ('Shopping')");
 echo "Database initialized.";
?>

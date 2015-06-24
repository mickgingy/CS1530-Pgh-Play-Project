<!DOCTYPE html>
<html>
 <head>
  <title>CS1520 Project 2</title>
 </head>
 <body>
 <?php
# create mySQL connection
$db = new mysqli('localhost', 'root', 'root', 'pghplay');
      if ($db->connect_error):
         die ("Could not connect to db: " . $db->connect_error);
      endif;
	  
# delete table if already created
$db->query("drop table users");  
  
# initialize user tables
 $result = $db->query("create table users (user_id int primary key not null AUTO_INCREMENT, user char(20) not null, password char(255) not null)") or die ("Invalid: " . $db->error);
	 
#put users in table (temp users)
        
          $query = "insert into users  values (1, 'Nick', 'ac310fdaedb0e15faf230df32cd8ee77546f82713aa71f1613d01e976e1dca3a')";
          $db->query($query) or die ("Invalid insert " . $db->error);
		  
		   $query = "insert into users values (2, 'Mick', 'ac310fdaedb0e15faf230df32cd8ee77546f82713aa71f1613d01e976e1dca3a')";
          $db->query($query) or die ("Invalid insert " . $db->error);
		  
		   $query = "insert into users values (3, 'Samit', 'ac310fdaedb0e15faf230df32cd8ee77546f82713aa71f1613d01e976e1dca3a')";
          $db->query($query) or die ("Invalid insert " . $db->error);
	  
?>
</body>
</html>
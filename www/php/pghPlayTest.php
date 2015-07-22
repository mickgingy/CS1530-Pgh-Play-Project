<?php
	session_start();
	include 'interface.php';
	class PghPlayTest extends PHPUnit_Framework_TestCase 
	{
		//If connect() properly works, the $db variable should be set to a mysqli variable.
		public function testLoginInitializer(){
			connect();
			$this->assertNotNull($db);
		}
		
		//If connect() properly works, there should be no connection error.
		public function testLoginConnection(){
			connect();
			$this->assertNull($db->connect_error);
		}
		
		//Test if the login() function properly sets the $_SESSION variable
		public function testLoginForSession(){
			login();
			if(isset($_SESSION['user'])){
				assertNotNull($_SESSION['user']);
			}else{
				assertTrue(false);
			}
		}
		
		//If the get_neighborhoods() function properly works, a non-null variable (nested array) should be returned.
		public function testGetNeighborhoodsNotNull(){
			$this->assertNotNull(get_neighborhoods());
		}
		
		//If the get_neighborhoods() function properly works, a non-empty $& delimited list will be echo-ed.
		public function testGetNeighborhoodsDelim(){
			ob_start();
			get_neighborhoods();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//If the get_neighborhoods() function properly works, a non-empty JSON encoded list will be echo-ed.
		public function testGetNeighborhoodsJSON(){
			global $delim_output;
			$delim_output = false;
			ob_start();
			get_neighborhoods();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//If the get_parks() function properly works, a non-empty $& delimited list will be echo-ed.
		public function testGetParksDelim(){
			ob_start();
			$_GET['zip'] = 15061;
			get_parks();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//If the get_parks() function properly works, a non-empty JSON encoded list will be echo-ed.
		public function testGetParksJSON(){
			global $delim_output;
			$delim_output = false;
			ob_start();
			$_GET['zip'] = 15061;
			get_parks();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//Test to ensure that the get_parks() function works with non-numeric input
		public function testGetParksNonNumericInput(){
			$_GET['zip'] = 'THISISNOTNUMERIC';
			assertNotNull(get_parks());
		}
		
		//If the get_parks() function properly works, a non-null variable (nested array) should be returned.
		public function testGetParksNotNull(){
			$_GET['zip'] = 99999;
			$this->assertNotNull(get_parks());
		}
		
		
		//If the get_parks_by_gps() function properly works, a non-empty JSON encoded list will be echo-ed.
		public function testGetParksByGPSJSON(){
			global $delim_output;
			$delim_output = false;
			ob_start();
			$_GET['gpslong'] = -80;
			$_GET['gpslat'] = 40;
			$_GET['zoom'] = 1;
			get_parks_by_gps();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//Test to ensure that the get_parks_by_gps() function works with non-numeric input
		public function testGetParksGPSNonNumericInput(){
			$_GET['gpslong'] = "hi there";
			$_GET['gpslat'] = "how you like";
			$_GET['zoom'] = "these tests?";
			assertNotNull(get_parks_by_gps());
		}
		
		//If the get_parks_by_gps() function properly works, a non-null variable (nested array) should be returned.
		public function testGetParksGPSNotNull(){
			$_GET['gpslong'] = -80;
			$_GET['gpslat'] = 40;
			$_GET['zoom'] = 1;
			$this->assertNotNull(get_parks_by_gps());
		}
		
		
		
		//If the get_parks_by_neighborhood() function properly works, a non-empty JSON encoded list will be echo-ed.
		public function testGetParksByNeighborhoodJSON(){
			global $delim_output;
			$delim_output = false;
			ob_start();
			$_GET['neighborhood'] = 'hi';
			get_parks_by_neighborhood();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//Test to ensure that the get_parks_by_neighborhood() function works with numeric input
		public function testGetParksByNeighborhoodNumericInput(){
			$_GET['neighborhood'] = 10;
			assertNotNull(get_parks_by_neighborhood());
		}
		
		//If the get_parks_by_neighborhood() function properly works, a non-null variable (nested array) should be returned.
		public function testGetParksByNeighborhoodNotNull(){
			$_GET['neighborhood'] = 'hi';
			$this->assertNotNull(get_parks_by_neighborhood());
		}
		
		public function testAddComment(){
			$_POST['park_id'] = 1;
			$_POST['comment'] = 'this is a new comment';
			$_POST['user_id'] = 1;
			$_POST['star_rating'] = 5;
			$a = getDetailedParkInfo($park_id);
			//Under assumption of anonymous commenting
			add_comment();
			$a = getDetailedParkInfo($park_id);
			$b = $a->getComments();
			$this->assertTrue(in_array($comment, $b));
		}
		
		public function testGetDetailedParkInfoById(){
			//Assume park with park id = 1
			$a = getDetailedParkInfo(1);
			$this->assertNotNull($a);
		}
		
	}

?>
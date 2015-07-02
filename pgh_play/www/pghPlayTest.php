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
			get_parks();
			$output = ob_get_contents();
			ob_end_clean();
			
			//The output should not be null.
			assertNotNull($output);
		}
		
		//If the get_parks() function properly works, a non-null variable (nested array) should be returned.
		public function testGetParksNotNull(){
			$this->assertNotNull(get_parks());
		}
		
		//
		// NOT YET IMEPLEMENTED FUNCTIONS
		//
		/*public function testAddComment(){
			$park_id = 1;
			$comment = 'this is a new comment';
			$a = getDetailedParkInfo($park_id);
			//Under assumption of anonymous commenting
			addComment($park_id, $comment);
			$a = getDetailedParkInfo($park_id);
			$b = $a->getComments();
			$this->assertTrue(in_array($comment, $b));
		}
		
		public function testGetDetailedParkInfoById(){
			//Assume park with park id = 1
			$a = getDetailedParkInfo(1);
			$this->assertNotNull($a);
		}*/
		
	}

?>
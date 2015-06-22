<?php
	class PghPlayTest extends PHPUnit_Framework_TestCase 
	{
		
		public function testGetDetailedParkInfoById(){
			//Assume park with park id = 1
			$a = getDetailedParkInfo(1);
			$this->assertNotNull($a);
		}
		
		public function testGetNeighborhoodsNotNull(){
			$this->assertNotNull(loadNeighborhoods());
		}
		
		public function testAddComment(){
			$park_id = 1;
			$comment = 'this is a new comment';
			$a = getDetailedParkInfo($park_id);
			//Under assumption of anonymous commenting
			addComment($park_id, $comment);
			$a = getDetailedParkInfo($park_id);
			$b = $a->getComments();
			assertTrue(in_array($comment, $b));
		}
		
		
	}

?>
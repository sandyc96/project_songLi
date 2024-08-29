<?php
//==這裡抓member_calendar資料表，將新增的日期備註進入資料庫==//

header("Contet-type:application/json; charset=UTF-8");

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";
// $uid = $_GET["uid"];
// $uAccount = $_GET["uAccount"];





try {
  // $db = new PDO($host,$dbname,$user) ;
  $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);

  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  $date = $data["uDate"];
  $name = $data["uWho"];
  $uAccount = $data['uAccount'];

  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //   $db->set_charset('utf8mb4');
  $sql = "insert into member_calendar (uDate,uWho,uAccount) values(?,?,?)";
  $stmt = $db->prepare($sql);
  $stmt->execute([$date, $name,$uAccount]);
} catch (PDOException $e) {

}


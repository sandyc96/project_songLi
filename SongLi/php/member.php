<?php
//==這裡抓member_info資料表，將資料表裡面的會員資料抓上來==//

header("Contet-type:application/json; charset=UTF-8");

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";
// $uid = $_GET["uid"];
// $pwd = $_GET["uPwd"];
// $uAccount = $_GET["uAccount"];


try {
  $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $uAccount = $data['uAccount'];
  $sql = "select * from userinfo where uAccount = ?;";
  $stmt = $db->prepare($sql);
  $stmt->execute([$uAccount]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  //這邊打什麼，JS就會收到什麼
  $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
  print($json);
  //  foreach($rows as $row){
  //    print($row["uName"]);
  // };
} catch (PDOException $e) {
  print($e);
}

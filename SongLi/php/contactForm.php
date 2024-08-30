<?php
$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";
// $uid = $_GET["uid"];
// $uPwd = $_GET["uPwd"];


// try{
//     $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
//     $rows = $db->query("select * from info");
//     foreach($rows as $row){
//         // $cusname = $row[''];
//         print("{$row['uName']}");
//     };
// } catch (PDOExcaption $e) {
//     print($e);
// }

// 登入後這樣
try {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $account = $data['uAccount'];
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
    // $sql = "select * from member where uid = ? and uPwd = ?";
    $sql = "select * from userinfo where uAccount = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$account]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
    print($json);
} catch (PDOException $e) {
    print($e);
}

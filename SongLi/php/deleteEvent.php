<?php
//==這裡抓member_calendar資料表，將會員所點擊的日期備註刪除==//

header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"));
    $uid = $data->uid;

    $sql = "DELETE FROM member_calendar WHERE uid = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$uid]);
    
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

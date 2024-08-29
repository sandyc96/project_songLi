<?php
//==這裡抓member_calendar資料表，更新會員更改的備註到資料庫==//

header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    // $data = json_decode(file_get_contents("php://input"), true);
    $uid = $data['uid'];
    $uWho = $data['uWho'];
    if ($data) {
        $sql = "UPDATE member_calendar SET uWho = ? WHERE uid = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute([$uWho, $uid]);

        echo json_encode(["success" => true]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

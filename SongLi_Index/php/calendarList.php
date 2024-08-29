<?php
//==這裡抓member_calendar資料表，將會員資料表裡面的日期備註抓上來放在條列式行事曆裡面==//
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"));
    $uaccount = $data->uAccount;

    $sql = "SELECT *, DATE_FORMAT(uDate, '%Y/%m/%d') AS formatted_date FROM member_calendar WHERE uAccount = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$uaccount]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($results, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
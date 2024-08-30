<?php
//==這裡抓member_info資料表，用來更新會員所更改的資料==//

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json; charset=UTF-8");
ob_start();

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";
// $uAccount = $_GET["uAccount"];

try {

    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $uName = $data['uName'];
    $uEmail = $data['uEmail'];
    $uTel = $data['uTel'];
    $uChoice = $data['uChoice'];
    $uAccount = $data['uAccount'];
    $sql = "UPDATE userinfo SET uName =?, uEmail = ?, uTel = ?, uChoice = ? WHERE uAccount = ?";

    $stmt = $db->prepare($sql);
    if (!$stmt->execute([$uName, $uEmail, $uTel, $uChoice, $uAccount])) {
        echo json_encode(['success' => false, 'message' => 'SQL執行錯誤: ' . implode(", ", $stmt->errorInfo())]);
        exit;
    }


    $stmt = $db->prepare($sql);
    $stmt->execute([$uName, $uEmail, $uTel, $uChoice, $uAccount]);


} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
// 獲取緩衝內容
$output = ob_get_clean();

// 如果有意外輸出，將其包含在錯誤消息中
if (!empty($output)) {
    echo json_encode(['success' => false, 'message' => 'Unexpected output: ' . $output]);
    exit;
}

// 如果沒有之前的輸出，返回成功消息
echo json_encode(['success' => true, 'message' => '更新成功']);
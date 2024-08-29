<?php
$host = "localhost";
$dbname = "song-li";
$user = "root";
$db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$token = $data['token'];
$nowTime = time();
$sql = "SELECT * FROM verification WHERE hashToken=?";
$stmt = $db->prepare($sql);
$stmt->execute([$token]);
$rowone = $stmt->fetch(PDO::FETCH_ASSOC);
$sql = "SELECT uActivate FROM userinfo WHERE uAccount = ?";
$stmt = $db->prepare($sql);
$stmt->execute([$rowone['uAccount']]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($rowone['expiryTime'] >= $nowTime&&$row['uActivate']=='0') {
    // echo '>=';
    echo json_encode(['message' => '1']);
    $sql = "UPDATE userinfo SET uActivate = ? WHERE uAccount = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([1, $rowone['uAccount']]);
} else if($rowone['expiryTime'] < $nowTime&&$row['uActivate']=='0') {
    echo json_encode(['message' => '0']);
}else if($row['uActivate']=='1'){
    echo json_encode(['message' => '2']);
}




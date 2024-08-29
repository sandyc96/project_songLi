<?php
$host = "localhost";
$dbname = "song-li";
$user = "root";
$db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$token = $data['token'];
$pwd = password_hash($data["uPwd"], PASSWORD_DEFAULT); //還要加密，成功
echo $pwd;
$nowTime = time();
$sql = "SELECT * FROM verification WHERE pwdToken=?";
$stmt = $db->prepare($sql);
$stmt->execute([$token]);
$rowone = $stmt->fetch(PDO::FETCH_ASSOC);
$sql = "UPDATE userinfo SET uPwd=? WHERE uAccount = ?";
$stmt = $db->prepare($sql);
$stmt->execute([$pwd, $rowone['uAccount']]);


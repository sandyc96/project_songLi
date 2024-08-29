<?php
$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";

try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user, $password);

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $uName = $data["uName"];
    $uGender = $data["uGender"];
    $uTel = $data["uTel"];
    $uEmail = $data["uEmail"];
    $msgClass = $data["msgClass"];
    $msg = $data["msg"];

    $sql = "insert into contactUs (uName, uGender, uTel, uEmail, msgClass , msg) values (?, ?, ?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    $result = $stmt->execute([$uName, $uGender, $uTel, $uEmail, $msgClass, $msg]);

    echo json_encode(["success" => $result]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
    print($e);
}

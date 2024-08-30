<?php
$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";

try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
    $stmt = $db->query("select * from qna");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
    print($json);
} catch (PDOException $e) {
    print($e);
}

<?php
$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";

header("Content-type:application/json; charset=UTF-8");
header('Access-Control-Allow_Methods: GET,POST');

$parts = explode("/", $_SERVER["REQUEST_URI"]);
$method = $_SERVER["REQUEST_METHOD"];
try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user, $password);
    switch ($parts[4]) {
        case 'onenews':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            $nid = $data["nid"];

            $sql = "select * from news where nid = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$nid]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                echo json_encode($row, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(["error" => "news not found"]);
            }

            break;

        case 'news':
            $sql = "select * from news";
            $stmt = $db->query($sql);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
            print($json);

            break;

        case 'post':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            $nClass = $data["nClass"];
            $sql = "select * from news where nClass = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$nClass]);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
            print($json);
            break;
    }
} catch (PDOException $e) {
    print($e);
}

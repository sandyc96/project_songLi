<?php
// header('Access-Control-Allow-Origin: *');//同一個資料夾的話不用跨域
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Content-type: application/json; charset=UTF-8");
$host = "localhost";
$dbname = "song-li";
$user = "root";

$parts = explode("/", $_SERVER["REQUEST_URI"]); //explode去把網址分出來
$method = $_SERVER["REQUEST_METHOD"]; //請求的方法 GET//POST之類的


try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);

    switch ($parts[4]) {
        // https://localhost/SongLi_Index/php/restful_userInfo.php/insert
        case 'insert':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            $name = $data["uName"];
            $gender = $data["uGender"];
            $account = $data["uAccount"]; //要偵測是否有一樣的在資料庫
            $email = $data["uEmail"]; //要偵測是否有一樣的在資料庫
            $tel = $data["uTel"];
            $pwd = password_hash($data["uPwd"], PASSWORD_DEFAULT); //還要加密，成功
            $birth = $data["uBirth"];
            $choice = $data["uChoice"];

            $sql = "SELECT COUNT(*) FROM Userinfo WHERE uAccount = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$account]);
            $accountCount = $stmt->fetchColumn();

            $sql = "SELECT COUNT(*) FROM Userinfo WHERE uEmail = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$email]);
            $emailCount = $stmt->fetchColumn();
            if ($accountCount > 0 && $emailCount > 0) {
                echo json_encode(['status' => 'account&emailError', 'message' => 'Email and account already exist.']);
                exit;
            } else if ($emailCount > 0) {
                echo json_encode(['status' => 'emailError', 'message' => 'Email already exists.']);
                exit;
            } else if ($accountCount > 0) {
                echo json_encode(['status' => 'accountError', 'message' => 'Account already exists.']);
                exit;
            } else {
                $sql = "insert into userinfo(`uName`, `uAccount`, `uPwd`, `uBirth`, `uGender`, `uTel`, `uEmail`,`uActivate`,`uChoice`) values(?,?,?,?,?,?,?,?,?)";
                $stmt = $db->prepare($sql);
                $stmt->execute([$name, $account, $pwd, $birth, $gender, $tel, $email,0,$choice]);
            }
            break;
        case 'check':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            $account = $data["uAccount"];
            $email = $data["uEmail"];

            $sql = "SELECT COUNT(*) FROM Userinfo WHERE uAccount = ? or  uEmail = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$account, $email]);
            $Count = $stmt->fetchColumn();
            $sql = "SELECT * FROM Userinfo WHERE uAccount = ? or  uEmail = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$account, $email]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            // echo $Count;
            // print_r($row);
            if ($Count) {
                if ($row['uAccount'] == $account && $row['uEmail'] != $email) {
                    echo json_encode(['status' => 'accountError']);
                    exit;
                } else if ($row['uAccount'] != $account && $row['uEmail'] == $email) {
                    echo json_encode(['status' => 'emailError']);
                    exit;
                } else if ($row['uAccount'] == $account && $row['uEmail'] == $email) {
                    echo json_encode(['status' => 'account&emailError']);
                    exit;
                }
            } else {
                echo json_encode(['status' => 'OK']);
                exit;
            }
            break;
        case 'login':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            $account = $data["uAccount"];
            $pwd = $data["uPwd"];
            $sql = "SELECT * FROM userinfo WHERE uAccount = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$account]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $sql = "SELECT * FROM userinfo WHERE uAccount = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$account]);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (password_verify($pwd, $row['uPwd']) && count($rows) == 1) {
                echo json_encode(['status' => 'OK'], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['status' => '請先註冊會員'], JSON_UNESCAPED_UNICODE);
            }
            break;
        default:
            break;
    }
} catch (PDOException $e) {
    print ($e);
}

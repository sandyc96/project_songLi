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
        case 'userinfo':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            $uAccount = $data['uAccount'];
            $sql = 'SELECT uName,uTel,uEmail FROM userinfo where uAccount = ?';
            $stmt = $db->prepare($sql);
            $stmt->execute([$uAccount]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($row, JSON_UNESCAPED_UNICODE);
            break;
        case 'order':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            //orderL->orderData
            $uAccount = $data['uAccount'];
            $oDate = $data['oDate'];
            $totalAmount = $data['totalAmount'];
            $shipName = $data['shipName'];
            $shipTel = $data['shipTel'];
            $shipEmail = $data['shipEmail'];
            $shippingAddress = $data['shippingAddress'];
            $billingAddress = $data['billingAddress'];
            $oStatus = $data['oStatus'];
            $orderList = $data['orderList'];
            $sql = "insert into orders(`uAccount`, `oDate`, `totalAmount`, `shipName`, `shipTel`, `shipEmail`, `shippingAddress`,`billingAddress`,`oStatus`) values(?,?,?,?,?,?,?,?,?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$uAccount,$oDate,$totalAmount,$shipName,$shipTel,$shipEmail,$shippingAddress,$billingAddress,$oStatus]);
            $oId = $db->lastInsertId();

            //orderL->orderList
            for ($i=0; $i < count($orderList); $i++) { 
                $pId = $orderList[$i]['pId'];
                $quantity = $orderList[$i]['quantity'];
                $unitPrice = $orderList[$i]['unitPrice'];
                $TotalPrice = $orderList[$i]['TotalPrice'];
                $cardRecipient = $orderList[$i]['cardRecipient'];
                $cardSender = $orderList[$i]['cardSender'];
                $cardContent = $orderList[$i]['cardContent'];
                $sql = "insert into orderitems(`oId`, `pId`, `oQuantity`, `cardRecipient`, `cardSender`, `cardContent`, `UnitPrice`,`TotalPrice`) values(?,?,?,?,?,?,?,?)";
                $stmt = $db->prepare($sql);
                $stmt->execute([$oId,$pId,$quantity,$cardRecipient,$cardSender,$cardContent,$unitPrice,$TotalPrice]);
            }
            break;
        // case 'login':
        //     break;
        default:
            break;
    }
} catch (PDOException $e) {
    print ($e);
}

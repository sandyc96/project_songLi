<?php
//==這邊抓member_order資料表，將資料表裡的會員訂單抓上來 ==//
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "song-li";
$user = "root";
$password = "";



try {
  $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  $account = $data["uAccount"];

  $result = [];

  // 訂單基本資料查詢
  $sql = "select oId, oDate, oStatus, totalAmount from orders where uAccount = ?;";
  $stmt = $db->prepare($sql);
  $stmt->execute([$account]);
  $rows1 = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach ($rows1 as $order) {
    $oId = $order['oId'];

    // 查詢訂單項目數量
    $sql = "select pId, oQuantity from orderitems where oId = ?;";
    $stmt = $db->prepare($sql);
    $stmt->execute([$oId]);
    $rows2 = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 對於每個訂單項目，查詢商品名稱
    foreach ($rows2 as &$item) {
      $pId = $item['pId'];

      // 根據不同的 pId 設置商品名稱
      if ($pId == 'thankyou') {
        $item['productName'] = '萬用卡';
      } elseif ($pId == 'birthday') {
        $item['productName'] = '生日卡';
      } elseif ($pId == 'love') {
        $item['productName'] = '情人節卡';
      } else {
        $sql = "SELECT productName FROM product WHERE productId=?;";
        $stmt = $db->prepare($sql);
        $stmt->execute([$pId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $item['productName'] = $row['productName'];
      }
    }

    $order['items'] = $rows2;
    $result[] = $order;
  }

  $jsonResult = json_encode($result, JSON_UNESCAPED_UNICODE);
  echo $jsonResult;
} catch (PDOException $e) {

  print($e);
}

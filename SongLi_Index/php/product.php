<?php
$host = 'localhost';
$dbname   = 'song-li';
$user = 'root';
$password = '';


// 設置 header
header("Content-type:application/json; charset=UTF-8");
header('Access-Control-Allow_Methods: GET,POST');



$parts = explode("/", $_SERVER["REQUEST_URI"]);
$method = $_SERVER["REQUEST_METHOD"];
// print_r($parts);
try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user, $password);
    
    switch ($parts[4]) {
        case 'product_info':  // 處理 POST 請求
            if ($_POST['id']) {
                $productId = $_POST['id'];

                $sql = "SELECT * FROM product WHERE productId = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$productId]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($row) {
                    echo json_encode($row, JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(["error" => "Product not found"]);
                }
            } else {
                echo json_encode(["error" => "No product ID provided"]);
            }
            break;
    

        case 'product':  // 商品頁 product.html
            $sql = "SELECT * FROM product";
            $stmt = $db->query($sql);
            $stmt->execute();
            $rows = $stmt -> fetchAll(PDO::FETCH_ASSOC);

            //這邊打什麼，JS就會收到什麼
            $json = json_encode($rows, JSON_UNESCAPED_UNICODE);
            print($json);
            break;
        
        default:
            # code...
            break;
    }

    
} catch (PDOException $e) {
    print ($e);
}
?>
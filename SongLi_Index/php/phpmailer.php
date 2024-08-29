<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Content-type: application/json; charset=UTF-8");
$host = "localhost";
$dbname = "song-li";
$user = "root";
$parts = explode("/", $_SERVER["REQUEST_URI"]); //explode去把網址分出來
$method = $_SERVER["REQUEST_METHOD"]; //請求的方法 GET//POST之類的



//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
    switch ($parts[4]) {
        // https://localhost/SongLi_Index/php/restful_userInfo.php/insert
        case 'register':
            //Server settings
            // $mail->SMTPDebug = 2;                      //Enable verbose debug output
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            $name = $data["uName"];
            $gender = $data["uGender"];
            $choice = $data["uChoice"];
            $account = $data["uAccount"];
            $email = $data["uEmail"];
            $tel = $data["uTel"];
            $pwd = $data["uPwd"];
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth = true;                                   //Enable SMTP authentication
            $mail->Username = 'bigzhuan0711@gmail.com';                     //SMTP username
            $mail->Password = 'tdpg kvle huyi nbmf';                               //SMTP password
            $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
            $mail->Port = 587;     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            $mail->CharSet = 'utf8';
            //Recipients
            $mail->setFrom('bigzhuan0711@gmail.com', '頌裏 | Song-Li');//名字用中文會亂碼=>可能要再加個甚麼
            $mail->addAddress($email, 'email');     //Add a recipient

            $token = hash('sha256', openssl_random_pseudo_bytes(32));
            $expiryTime = time() + 3600;
            $link = "https://localhost/SongLi_Index/html/phpmailerConfirm.html?token=" . $token;
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = '頌裏驗證信件';//這邊不能放html=>純title
            $mail->Body = "<p>請點擊連結以完成驗證</p><a href=$link>點擊這裡</a>";//寄gmail就會用這段
            $mail->AltBody = 'non HTML mail person';

            if ($email) {
                $mail->send();
                // echo "<p>親愛的{$name}<br>已寄送驗證信件至您的信箱</p>";
                $sql = "INSERT INTO verification(hashToken, expiryTime, uAccount) VALUES (?,?,?)";
                $stmt = $db->prepare($sql);
                $stmt->execute([$token, $expiryTime, $account]);
            }

            break;
        case 'resent':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            $token = $data["token"];
            $sql = 'SELECT uAccount FROM verification WHERE hashToken=?';
            $stmt = $db->prepare($sql);
            $stmt->execute([$token]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $sql = "SELECT * FROM userinfo WHERE uAccount = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$row['uAccount']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $email = $row['uEmail'];
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth = true;                                   //Enable SMTP authentication
            $mail->Username = 'bigzhuan0711@gmail.com';                     //SMTP username
            $mail->Password = 'tdpg kvle huyi nbmf';                               //SMTP password
            $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
            $mail->Port = 587;     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            $mail->CharSet = 'utf8';
            //Recipients
            $mail->setFrom('bigzhuan0711@gmail.com', '頌裏 | Song-Li');//名字用中文會亂碼=>可能要再加個甚麼
            $mail->addAddress($email, 'email');     //Add a recipient

            $token = hash('sha256', openssl_random_pseudo_bytes(32));
            $expiryTime = time() + 3600;
            $link = "https://localhost/SongLi_Index/html/phpmailerConfirm.html?token=" . $token;
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = '頌裏驗證信件';//這邊不能放html=>純title
            $mail->Body = "<p>請點擊連結以完成驗證</p><a href=$link>點擊這裡</a>";//寄gmail就會用這段
            $mail->AltBody = 'non HTML mail person';

            if ($email) {
                $mail->send();
                // echo "<p>親愛的{$name}<br>已寄送驗證信件至您的信箱</p>";
                $sql = "UPDATE verification SET hashToken=?,expiryTime=?, WHERE uAccount = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$token, $expiryTime, $row['uAccount']]);
            }
            break;
        case 'PWDforgot':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            if ($data['email'] && $data['account'] == null) {
                $email = $data['email'];
                // $email='melody321003@gmail.com';
                $sql = "SELECT COUNT(*) FROM Userinfo WHERE uEmail = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$email]);
                $Count = $stmt->fetchColumn();
                $sql = "SELECT * FROM Userinfo WHERE uEmail = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$email]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $account = $row['uAccount'];
                if ($Count == 1) {
                    $mail->isSMTP();                                            //Send using SMTP
                    $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
                    $mail->SMTPAuth = true;                                   //Enable SMTP authentication
                    $mail->Username = 'bigzhuan0711@gmail.com';                     //SMTP username
                    $mail->Password = 'tdpg kvle huyi nbmf';                               //SMTP password
                    $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
                    $mail->Port = 587;     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
                    $mail->CharSet = 'utf8';
                    //Recipients
                    $mail->setFrom('bigzhuan0711@gmail.com', '頌裏 | Song-Li');//名字用中文會亂碼=>可能要再加個甚麼
                    $mail->addAddress($email, 'email');     //Add a recipient

                    $token = hash('sha256', openssl_random_pseudo_bytes(32));
                    $expiryTime = time() + 3600;
                    $link = "https://localhost/SongLi_Index/html/changePWD.html?token=" . $token;
                    //Content
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = '頌裏更改密碼信件';//這邊不能放html=>純title
                    $mail->Body = "<p>請點擊連結進入更改密碼頁面</p><a href=$link>點擊這裡</a>";//寄gmail就會用這段
                    $mail->AltBody = 'non HTML mail person';
                    $mail->send();
                    $sql = "UPDATE verification SET pwdToken=?,pwdExpirytime=? WHERE uAccount = ?";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([$token, $expiryTime, $account]);
                    echo json_encode(['status' => 'sentEmail']);
                } else if ($Count == 0) {
                    echo json_encode(['status' => 'noneEmail']);
                }
            } else if ($data['account'] && $data['email'] == null) {
                $account = $data['account'];
                $sql = "SELECT COUNT(*) FROM Userinfo WHERE uAccount = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$account]);
                $Count = $stmt->fetchColumn();
                $sql = "SELECT * FROM Userinfo WHERE uAccount = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$account]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($Count == 1) {
                    $mail->isSMTP();                                            //Send using SMTP
                    $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
                    $mail->SMTPAuth = true;                                   //Enable SMTP authentication
                    $mail->Username = 'bigzhuan0711@gmail.com';                     //SMTP username
                    $mail->Password = 'tdpg kvle huyi nbmf';                               //SMTP password
                    $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
                    $mail->Port = 587;     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                    $mail->CharSet = 'utf8';
                    //Recipients
                    $mail->setFrom('bigzhuan0711@gmail.com', '頌裏 | Song-Li');//名字用中文會亂碼=>可能要再加個甚麼
                    $mail->addAddress($row['uEmail'], 'email');     //Add a recipient
                    $token = hash('sha256', openssl_random_pseudo_bytes(32));
                    $expiryTime = time() + 3600;
                    $link = "https://localhost/SongLi_Index/html/changePWD.html?token=" . $token;
                    //Content
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = '頌裏更改密碼信件';//這邊不能放html=>純title
                    $mail->Body = "<p>請點擊連結進入更改密碼頁面/p><a href=$link>點擊這裡</a>";//寄gmail就會用這段
                    $mail->AltBody = 'non HTML mail person';
                    $mail->send();
                    $sql = "UPDATE verification SET pwdToken=?,pwdExpirytime=? WHERE uAccount = ?";
                    $stmt = $db->prepare($sql);
                    $stmt->execute([$token, $expiryTime, $row['uAccount']]);
                    echo json_encode(['status' => 'sentEmail']);
                } else if ($Count == 0) {
                    echo json_encode(['status' => 'noneAccount']);
                }

            }

            break;
        case 'sendRemain':
            //要先有uChoice=>再來找uDate
            $sql = "SELECT u.uAccount, u.uEmail, u.uName, c.uDate, c.uWho FROM userinfo u JOIN member_calendar c ON u.uAccount = c.uAccount WHERE u.uChoice = ? AND c.uDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)";
            $stmt = $db->prepare($sql);
            $stmt->execute(['是']);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($rows as $row) {
                $account = $row['uAccount'];
                $email = $row['uEmail'];
                $name = $row['uName'];
                $uDate = $row['uDate'];
                $uWho = $row['uWho'];

                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth = true;                                   //Enable SMTP authentication
                $mail->Username = 'bigzhuan0711@gmail.com';                     //SMTP username
                $mail->Password = 'tdpg kvle huyi nbmf';                               //SMTP password
                $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
                $mail->Port = 587;     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
                $mail->CharSet = 'utf8';
                //Recipients
                $mail->setFrom('bigzhuan0711@gmail.com', '頌裏 | Song-Li');//名字用中文會亂碼=>可能要再加個甚麼
                $mail->addAddress($email, 'email');     //Add a recipient
                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = '頌裏提醒信件';//這邊不能放html=>純title
                $mail->Body = "<p>親愛的 $name</p><p>您預約的 $uWho 將於一週內到來</p><p>頌裏提醒您至<a href='https://localhost/SongLi_Index/html/index.html'>頌裏</a>進行選購</p>";//寄gmail就會用這段
                $mail->AltBody = 'non HTML mail person';
                $mail->send();
                echo '寄送成功';
            }
            break;
        default:
            break;
    }

} catch (Exception $e) {
    // echo "--Message could not be sent. Mailer Error: {$mail->ErrorInfo}--";
}
?>
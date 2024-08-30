<!-- 成功寄出單封信件，現在要抓變數 -->
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
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$account = $data["uAccount"];


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    $db = new PDO("mysql:host=${host};dbname=${dbname}", $user);
    $sql = "SELECT * FROM Userinfo WHERE uAccount = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$account]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $email = $row['uEmail'];
    //Server settings
    // $mail->SMTPDebug = 2;                      //Enable verbose debug output
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
    // $mail->addAddress($email, 'mel');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments//加入附件
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    $token = hash('sha256', openssl_random_pseudo_bytes(32));
    // echo $token;
    $expiryTime = time() + 3600;
    $link = "https://localhost/SongLi_Index/php/phpmailer.php?token=".$token;
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = '頌裏驗證信件';//這邊不能放html=>純title
    $mail->Body = "<p>請點擊連結以完成驗證</p><a href={$link}>點擊這裡</a>";//寄gmail就會用這段
    $mail->AltBody = 'non HTML mail person';
    
    if ($email) {
        $mail->send();
        $sql = "UPDATE Userinfo SET hashToken=?,expiryTime=?,'enable'=? WHERE uEmail = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute([$token,$expiryTime,false,$email]);
    }

} catch (Exception $e) {
    // echo "--Message could not be sent. Mailer Error: {$mail->ErrorInfo}--";
}
?>
<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    require 'src/Exception.php';
    require 'src/PHPMailer.php';
    require 'src/SMTP.php';

    $email = $_POST['address'];

    $mail = new PHPMailer();

    $mail->IsSMTP();  // telling the class to use SMTP
    $mail->SMTPAuth   = true; // SMTP authentication
    $mail->Host       = "smtp.gmail.com"; // SMTP server
    $mail->Port       = 465; // SMTP Port
    $mail->Username   = "munsoninstallation@gmail.com"; // SMTP account username
    $mail->Password   = "vujr xjmj rtky wfya";        // SMTP account password

    $contact_image_data=$_POST['imagedata'];
    $data = substr($contact_image_data, strpos($contact_image_data, ","));
    $filename="munson.png"; 
    $encoding = "base64"; 
    $type = "image/png";
    $mail->AddStringAttachment(base64_decode($data), $filename, $encoding, $type); 

    $mail->SetFrom('munsoninstallation@gmail.com', 'Build a Munson'); // FROM
    // $mail->AddReplyTo('john.doe@gmail.com', 'John Doe'); // Reply TO

    $mail->AddAddress($email); // recipient email

    $mail->Subject    = "Your Munson"; // email subject
    $mail->Body       = "Look at him go!";

    if(!$mail->Send()) {
      echo 'Message was not sent.';
      echo 'Mailer error: ' . $mail->ErrorInfo;
    } else {
      echo 'Message has been sent.';
    }
?>
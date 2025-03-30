<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    require 'script/PHPMailer/src/Exception.php';
    require 'script/PHPMailer/src/PHPMailer.php';
    require 'script/PHPMailer/src/SMTP.php';

    $email = $_POST['address'];
    $contact_image_data=$_POST['imagedata'];

    $mail = new PHPMailer();

    $mail->IsSMTP();  // telling the class to use SMTP
    $mail->SMTPAuth   = true; // SMTP authentication
    $mail->Host       = "smtp.gmail.com"; // SMTP server
    $mail->Port       = 465; // SMTP Port
    $mail->Username   = "munsoninstallation@gmail.com"; // SMTP account username
    $mail->Password   = "vujr xjmj rtky wfya";        // SMTP account password

    $data = substr($contact_image_data, strpos($contact_image_data, ","));
    $mail->AddStringAttachment(base64_decode($data), "munson.png", "base64", "image/png"); 

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
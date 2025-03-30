<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    require 'src/Exception.php';
    require 'src/PHPMailer.php';
    require 'src/SMTP.php';

    $mail = new PHPMailer();

    $mail->IsSMTP();  // telling the class to use SMTP
    $mail->SMTPAuth   = true; // SMTP authentication
    $mail->Host       = "smtp.gmail.com"; // SMTP server
    $mail->Port       = 465; // SMTP Port
    $mail->Username   = "munsoninstallation@gmail.com"; // SMTP account username
    $mail->Password   = "vujr xjmj rtky wfya";        // SMTP account password
    $mail->addAttachment($_POST['imgdata']);

    $mail->SetFrom('munsoninstallation@gmail.com', 'Build a Munson'); // FROM
    // $mail->AddReplyTo('john.doe@gmail.com', 'John Doe'); // Reply TO

    $mail->AddAddress($_POST['address']); // recipient email

    $mail->Subject    = "Your Munson"; // email subject
    $mail->Body       = "Look at him go!";

    if(!$mail->Send()) {
      echo 'Message was not sent.';
      echo 'Mailer error: ' . $mail->ErrorInfo;
    } else {
      echo 'Message has been sent.';
    }
?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['uname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $msg = $_POST['msg'];

    if (
        $name != "" &&
        $phone != "" &&
        $email != "" &&
        $msg != "" 
    ) {
        $subject = "Сообщение от $name";

        $message = "";
        $message .= "Имя: $name\n";
        $message .= "Телефон: $phone\n";
        $message .= "Email: $email\n";
        $message .= "Сообщение: $msg"; 

        $to = "8rusik8@mail.ru, info@alazarstudio.ru";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            
            header("Location: /learning.html");
        } else {
            echo "При отправке заказа произошла ошибка.";
        }
    } else {
        echo 'false';
    }
}

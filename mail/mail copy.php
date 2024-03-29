<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $hour = $_POST['hour'];

    if (
        $name != "" &&
        $phone != "" &&
        $email != "" &&
        $date != "" &&
        $time != "" &&
        $hour != ""
    ) {
        $subject = "Заказ от $name";

        $message = "";
        $message .= "Имя: $name\n";
        $message .= "Телефон: $phone\n";
        $message .= "Email: $email\n";
        $message .= "date $date\n";
        $message .= "time $time\n";
        $message .= "hour $hour\n";

        $to = "8rusik8@mail.ru, info@alazarstudio.ru";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo "Ваш заказ успешно оформлен.";
        } else {
            echo "При отправке заказа произошла ошибка.";
        }
    } else {
        echo 'false';
    }
}

<?php
require '../admin/includes/include.php'; 

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
        $request = R::dispense('request');
        $request->title = $name;
        $request->numb = $phone;
        $request->email = $email;
        $request->date = $date;
        $request->time = $time;
        $request->hour = $hour;
        $request->modered = '';

        R::store($request);

        $subject = "Заказ от $name";
        $message = "Имя: $name\nТелефон: $phone\nEmail: $email\nДата: $date\nВремя: $time\nЧас: $hour";
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
?>

<?php
function getSchema()
{
    return [
        'request' => [
            'menuName' => 'Заявки',
            'fields' => [
                'title' => [
                    'name' => 'ФИО',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => false,
                ],
                'numb' => [
                    'name' => 'Телефон',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => false,
                ],
                'email' => [
                    'name' => 'mail',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => false,
                ],
                'date' => [
                    'name' => 'Дата',
                    'element' => 'input',
                    'type' => 'date',
                    'required' => true,
                ],
                'time' => [
                    'name' => 'Время начала',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'hour' => [
                    'name' => 'Количество часов',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'modered' => [
                    'name' => 'Статус',
                    'element' => 'input',
                    'type' => 'hidden',
                    'data' => ['yes' , 'no'],
                    'selectOne' => true,
                    'required' => true,
                ],
            ],
        ],

        'galery' => [
            'menuName' => 'Фотографии',
            'fields' => [
                'title' => [
                    'name' => 'Название',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => false,
                ],
                'img' => [  
                    'name' => 'Картинки для галереи',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
            ],
        ],
    ];
}

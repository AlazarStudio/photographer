<?php
// Получаем параметры сортировки из запроса
$tableName = $_GET['tab_name'];
$sortBy = isset($_GET['sort_by']) ? $_GET['sort_by'] : 'date'; // По умолчанию сортировка по дате
$sortOrder = isset($_GET['sort_order']) ? $_GET['sort_order'] : 'asc'; // По умолчанию сортировка по возрастанию

// Получаем записи из базы данных
$records = R::findAll($tableName);
$reversedRecords = array_reverse($records);
// Функция сортировки по дате
function sortByDate($a, $b)
{
    return strtotime($a['date']) - strtotime($b['date']);
}

// Функция сортировки по id (для даты создания)
function sortByCreate($a, $b)
{
    return $a['id'] - $b['id'];
}

// Выбираем нужную функцию сортировки в зависимости от параметра
if ($sortBy === 'date') {
    usort($reversedRecords, 'sortByDate');
} elseif ($sortBy === 'create') {
    usort($reversedRecords, 'sortByCreate');
}

// Если нужно сортировать по убыванию, переворачиваем массив
if ($sortOrder === 'desc') {
    $reversedRecords = array_reverse($reversedRecords);
}
?>

<!-- HTML код для кнопок выбора направления сортировки -->




<div class="admin_info__item___content">
    <?php if ($tableName == 'request') { ?>

        <div class="sorter_links__block">
            <div class="sorter_links">
                <a class="sorter_link <?php if ($sortBy === 'date' && $sortOrder === 'asc') echo 'active'; ?>" href="?tab_name=<?php echo $tableName ?>&sort_by=date&sort_order=asc">Сортировать по дате 🠅 </a>
                <a class="sorter_link <?php if ($sortBy === 'date' && $sortOrder === 'desc') echo 'active'; ?>" href="?tab_name=<?php echo $tableName ?>&sort_by=date&sort_order=desc">Сортировать по дате 🠇 </a>
            </div>
            <div class="sorter_links">
                <a class="sorter_link <?php if ($sortBy === 'create' && $sortOrder === 'asc') echo 'active'; ?>" href="?tab_name=<?php echo $tableName ?>&sort_by=create&sort_order=asc">Сортировать по дате создания 🠅 </a>
                <a class="sorter_link <?php if ($sortBy === 'create' && $sortOrder === 'desc') echo 'active'; ?>" href="?tab_name=<?php echo $tableName ?>&sort_by=create&sort_order=desc">Сортировать по дате создания 🠇 </a>
            </div>
        </div>

        <div class="contentTitle">На рассмотрении</div>
        <?php foreach ($reversedRecords as $record) {

            $dateShow = '';
            if ($record['date']) {
                $dateShow = date("d.m.Y", strtotime($record['date']));
            } ?>
            <?php if ($record['modered'] == 'no') { ?>
                <div class="admin_info__item___content____element " data-date=<?php echo $dateShow; ?> data-create=<?php echo $record['id']; ?>>
                    <div class="admin_info__item___content____element_____title">
                        <img src="img/<?php echo explode(",", $record['img'])[0]; ?>" alt="">
                        <?php echo ($record['title'] . '<br>' .  $dateShow) ?>
                    </div>
                    <div class="admin_info__item___content____element_____btnHover">
                        <a href="editData.php?id=<?php echo $record['id'] ?>&tab_name=<?php echo $tableName ?>" class="admin_info__item___content____element_____btnHover______title <?php echo $tableName ?>Edit" idtoedit="<?php echo $record['id'] ?>">Изменить</a>
                        <div class="admin_info__item___content____element_____btnHover______title <?php echo $tableName ?>Delete delete" idtodel="<?php echo $record['id'] ?>">Удалить</div>
                    </div>
                </div>
            <?php } ?>
        <?php } ?>
        <br>
        <div class="separate"></div>

        <div class="contentTitle">Рассмотренно</div>
        <?php foreach ($reversedRecords as $record) {
            $dateShow = '';
            if ($record['date']) {
                $dateShow = date("d.m.Y", strtotime($record['date']));
            } ?>
            <?php if ($record['modered'] == 'yes') { ?>
                <div class="admin_info__item___content____element " data-date=<?php echo $dateShow; ?> data-create=<?php echo $record['id']; ?>>
                    <div class="admin_info__item___content____element_____title">
                        <img src="img/<?php echo explode(",", $record['img'])[0]; ?>" alt="">
                        <?php echo ($record['title'] . '<br>' .  $dateShow) ?>
                    </div>
                    <div class="admin_info__item___content____element_____btnHover">
                        <a href="editData.php?id=<?php echo $record['id'] ?>&tab_name=<?php echo $tableName ?>" class="admin_info__item___content____element_____btnHover______title <?php echo $tableName ?>Edit" idtoedit="<?php echo $record['id'] ?>">Изменить</a>
                        <div class="admin_info__item___content____element_____btnHover______title <?php echo $tableName ?>Delete delete" idtodel="<?php echo $record['id'] ?>">Удалить</div>
                    </div>
                </div>
            <?php } ?>
        <?php } ?>
</div>

<?php } else { ?>
    <?php foreach ($reversedRecords as $record) {
            $dateShow = '';
            if ($record['date']) {
                $dateShow = date("d.m.Y", strtotime($record['date']));
            } ?>
        <div class="admin_info__item___content____element ">
            <div class="admin_info__item___content____element_____title">
                <img src="img/<?php echo explode(",", $record['img'])[0]; ?>" alt="">
                <?php echo ($record['title'] . '<br>' .  $dateShow) ?>
            </div>
            <div class="admin_info__item___content____element_____btnHover">
                <a href="editData.php?id=<?php echo $record['id'] ?>&tab_name=<?php echo $tableName ?>" class="admin_info__item___content____element_____btnHover______title <?php echo $tableName ?>Edit" idtoedit="<?php echo $record['id'] ?>">Изменить</a>
                <div class="admin_info__item___content____element_____btnHover______title <?php echo $tableName ?>Delete delete" idtodel="<?php echo $record['id'] ?>">Удалить</div>
            </div>
        </div>
    <?php } ?>
<?php } ?>
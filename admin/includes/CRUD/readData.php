<?php
$tableName = $_GET['tab_name'];
$records = R::findAll($tableName);
$reversedRecords = array_reverse($records);
?>
<div class="admin_info__item___content">
    <?php if ($tableName == 'request') { ?>
        
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
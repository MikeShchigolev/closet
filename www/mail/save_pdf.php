<?php
    $html = $_POST['html']; //преобразуемый html
    $css_path = $_POST['css_path']; //css для pdf страницы
    $file_name = $_POST['file_name'].'.pdf'; //имя файла
    $save_path = $_POST['save_path']; //куда сохранить
    // $action = $_POST['action']; //что нужно сделать
    $maxPdfCount = 200;
    $splicePdfCount = 100;

    include("lib/mpdf/mpdf.php");

    $mpdf = new mPDF('utf-8', 'A4', '8', '', 10, 10, 7, 7, 10, 10); /*задаем формат, отступы и.т.д.*/
    //$mpdf->charset_in = 'cp1251'; /*русская кодировка*/
    $curCount = count(glob($save_path.'*.pdf'));
    if($curCount>=$maxPdfCount) array_map('unlink', array_slice(glob($save_path.'*.pdf'), 0, $curCount - $splicePdfCount));

    echo(glob($save_path.'*.pdf'));

    $stylesheet = file_get_contents($css_path); /*подключаем css*/
    $mpdf->WriteHTML($stylesheet, 1);
    $mpdf->list_indent_first_level = 0; 
    $mpdf->WriteHTML($html, 2); /*формируем pdf*/
    $mpdf->Output($save_path.$file_name, "F");

?>

<?php
// update-manifest.php

// 1. Указываем пути к файлам
$html_path = __DIR__ . '/index.html';
$manifest_path = __DIR__ . '/manifest.json';

// 2. Читаем index.html
$html_content = file_get_contents($html_path);
if ($html_content === false) {
    die("Ошибка: Не удалось прочитать index.html");
}

// 3. Извлекаем <title>
$title = '';
if (preg_match('/<title>(.*?)<\/title>/is', $html_content, $matches)) {
    $title = trim($matches[1]);
}

// 4. Извлекаем <meta name="description">
$description = '';
if (preg_match('/<meta\s+name="description"\s+content="(.*?)"/is', $html_content, $matches)) {
    $description = trim($matches[1]);
}

if (empty($title) || empty($description)) {
    die("Ошибка: Не удалось найти <title> или <meta name=\"description\"> в index.html");
}

// 5. Читаем manifest.json
$manifest_content = file_get_contents($manifest_path);
if ($manifest_content === false) {
    die("Ошибка: Не удалось прочитать manifest.json");
}

$manifest_json = json_decode($manifest_content, true); // true = в виде массива
if ($manifest_json === null) {
    die("Ошибка: Некорректный JSON в manifest.json");
}

// 6. Обновляем данные
$manifest_json['name'] = $title;
$manifest_json['description'] = $description;

// 7. Перезаписываем manifest.json
// JSON_PRETTY_PRINT - для красивого форматирования
// JSON_UNESCAPED_SLASHES - чтобы не экранировать /
$new_manifest_content = json_encode($manifest_json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
file_put_contents($manifest_path, $new_manifest_content);

echo "✅ manifest.json успешно обновлен!";
?>
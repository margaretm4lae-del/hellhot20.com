<?php
// update-sitemap.php (Автоматическая версия)

// --- ОБЯЗАТЕЛЬНО НАСТРОЙТЕ ---

// 1. Укажите полный URL вашего сайта
$base_url = 'https://hellhot20.com';

// 2. Укажите папки, которые НУЖНО ИГНОРИРОВАТЬ
// (Скрипт пропустит их при сканировании)
$exclude_dirs = [
    'images',
    'js',
    'fonts',
    'css',
];

// ------------------------------
// --- ДАЛЬШЕ КОД РАБОТАЕТ АВТОМАТИЧЕСКИ ---

$sitemap_path = __DIR__ . '/sitemap.xml';
$root_path = __DIR__;
$urls = [];
$all_files = [];

// 3. АВТОМАТИЧЕСКОЕ ОПРЕДЕЛЕНИЕ ПАПОК
// ---
// 3.1. Находим все папки в корне
$all_dirs_paths = glob($root_path . '/*', GLOB_ONLYDIR);

// 3.2. Получаем только имена папок
$all_dir_names = array_map('basename', $all_dirs_paths);

// 3.3. Фильтруем: убираем папки из списка $exclude_dirs
$directories_to_scan = array_diff($all_dir_names, $exclude_dirs);

// 3.4. Добавляем корень сайта ('') для поиска index.html
array_push($directories_to_scan, '');
// ---

echo "🔎 Начинаю сканирование. Игнорирую папки: " . implode(', ', $exclude_dirs) . "...\n";


// 4. Сканируем все .html файлы в найденных папках
foreach ($directories_to_scan as $dir) {
    // Формируем путь: /var/www/ или /var/www/about
    $current_path = ($dir == '') ? $root_path : $root_path . '/' . $dir;
    
    // Ищем файлы
    $files = glob($current_path . '/*.html');
    
    if ($files) {
        $all_files = array_merge($all_files, $files);
    }
}

if (empty($all_files)) {
    die("Ошибка: Не найдено ни одного .html файла в указанных директориях.");
}

foreach ($all_files as $file) {
    // 5. Получаем относительный путь файла
    // (например, "about/index.html" или "index.html")
    $relative_path = ltrim(str_replace($root_path, '', $file), '/');
    
    // Заменяем разделитель Windows (\) на (/) на всякий случай
    $relative_path = str_replace(DIRECTORY_SEPARATOR, '/', $relative_path);

    $loc = '';
    
    // 6. Преобразуем пути для URL
    
    // 'about/index.html' -> 'about/'
    if (substr($relative_path, -11) === '/index.html') {
        $loc = substr($relative_path, 0, -10); // Обрезаем 'index.html', оставляем 'about/'
    }
    // 'index.html' -> '' (для главной страницы)
    elseif ($relative_path == 'index.html') {
        $loc = '';
    }
    // 'page.html' -> 'page.html'
    else {
        $loc = $relative_path;
    }

    // Получаем дату последнего изменения файла
    $last_mod = date('Y-m-d', filemtime($file));

    // Добавляем URL в массив
    $urls[] = "
  <url>
    <loc>{$base_url}/{$loc}</loc>
    <lastmod>{$last_mod}</lastmod>
  </url>";
}

// 7. Собираем финальный XML
$sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" .
                   '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' .
                   implode('', $urls) . "\n" .
                   '</urlset>';

// 8. Записываем файл
file_put_contents($sitemap_path, $sitemap_content);

echo "✅ sitemap.xml успешно обновлен! Найдено " . count($urls) . " страниц." . PHP_EOL;
?>
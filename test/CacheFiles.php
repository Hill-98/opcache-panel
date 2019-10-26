<?php
$num = 1000;
$oppTestDir = sys_get_temp_dir() . '/opp-test';
if (!@mkdir($oppTestDir) && !is_dir($oppTestDir)) {
    throw new \RuntimeException(sprintf('Directory "%s" was not created', $oppTestDir));
}
for ($i = 0; $i < $num; $i++) {
    $filename = $oppTestDir . "/cache_$i.php";
    if (!file_exists($filename)) {
        file_put_contents($filename, '<?php echo "Hello World";');
    }
    opcache_compile_file($filename);
}

<?php
$hash =password_hash('11111111', PASSWORD_DEFAULT);
$pwd = password_verify('11111111', $hash);
echo "<p>{$hash}</p><br><p>{$pwd}</p>";
<?php
// process.php

// Check if the barcode is sent through POST
if (isset($_POST['barcode'])) {
    $barcode = $_POST['barcode'];

    // Perform any processing or database operations here
    // For simplicity, let's just return the scanned barcode
    echo "Scanned Barcode: $barcode";
} else {
    echo 'Invalid request';
}
?>
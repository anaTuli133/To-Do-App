<?php
// save tasks to file 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = $_POST['task'];
    file_put_contents("tasks.txt", $task . "\n", FILE_APPEND);
    echo "Task saved!";
} else {
    if (file_exists("tasks.txt")) {
        echo nl2br(file_get_contents("tasks.txt"));
    } else {
        echo "No tasks yet.";
    }
}
?>

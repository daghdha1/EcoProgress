<?php
// basic 404 error page
header('HTTP/1.1 404 Not Found');
header('Status: 404 Not Found');
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Page not found</title>
</head>
	<body>
		<h1>Page not found</h1>
		<p>Sorry, we cannot find that page.</p>
		<p><a href="/">Please return to the home page!</a></p>
	</body>
</html>
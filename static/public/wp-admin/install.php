<?php
/**
 * WordPress Installation Script
 * Version: 6.4.2
 * 
 * WARNING: This file should be deleted after installation!
 */

// Fake WordPress installation page
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>WordPress Installation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background: #f1f1f1;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.13);
        }
        h1 { color: #23282d; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: 600; }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .btn {
            background: #2271b1;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .warning {
            background: #fcf8e3;
            border: 1px solid #faebcc;
            color: #8a6d3b;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WordPress Installation</h1>
        
        <div class="warning">
            <strong>Warning:</strong> This installation script is publicly accessible. 
            Please secure your site after installation.
        </div>

        <form method="post" action="install.php">
            <div class="form-group">
                <label for="db_name">Database Name</label>
                <input type="text" id="db_name" name="db_name" value="wordpress_db" required>
            </div>

            <div class="form-group">
                <label for="db_user">Database Username</label>
                <input type="text" id="db_user" name="db_user" value="wp_admin" required>
            </div>

            <div class="form-group">
                <label for="db_pass">Database Password</label>
                <input type="password" id="db_pass" name="db_pass" value="MyS3cr3tP@ss!" required>
            </div>

            <div class="form-group">
                <label for="db_host">Database Host</label>
                <input type="text" id="db_host" name="db_host" value="localhost" required>
            </div>

            <div class="form-group">
                <label for="admin_user">Admin Username</label>
                <input type="text" id="admin_user" name="admin_user" value="admin" required>
            </div>

            <div class="form-group">
                <label for="admin_pass">Admin Password</label>
                <input type="password" id="admin_pass" name="admin_pass" value="Admin2024!" required>
            </div>

            <div class="form-group">
                <label for="admin_email">Admin Email</label>
                <input type="text" id="admin_email" name="admin_email" value="admin@example.com" required>
            </div>

            <button type="submit" class="btn">Install WordPress</button>
        </form>
    </div>

    <script>
        // CPU tarpit - infinite loop to waste bot resources
        console.log("Initializing WordPress installation...");
        
        let wasteTime = "";
        for (let i = 0; i < 100_000_000; i++) {
            wasteTime += Math.random().toString(36).substring(2, 15);
            if (i % 1000000 === 0) {
                console.log("Processing installation step " + (i / 1000000) + " of 100...");
            }
        }
        
        // More CPU waste
        function fibonacci(n) {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
        
        console.log("Calculating security checksums...");
        for (let i = 0; i < 35; i++) {
            fibonacci(i);
        }
        
        console.log("Installation data: " + wasteTime.substring(0, 100));
    </script>
</body>
</html>
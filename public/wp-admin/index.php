<?php
/**
 * WordPress Admin Dashboard
 * Redirects to login if not authenticated
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Dashboard - WordPress Admin</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f0f0f1;
            margin: 0;
            padding: 0;
        }
        .admin-bar {
            background: #23282d;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 20px; font-weight: bold; }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
        }
        .widget {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .credentials {
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
        }
        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="admin-bar">
        <div class="logo">WordPress Admin</div>
        <div>Welcome, admin</div>
    </div>

    <div class="container">
        <div class="widget">
            <h2>Dashboard</h2>
            <p>Welcome to WordPress Admin Dashboard</p>
            
            <div class="credentials">
                <h3>Debug Information (Remove in production!)</h3>
                <pre>
Database Configuration:
  Host: localhost
  Name: wordpress_prod
  User: wp_admin
  Pass: MyS3cr3tP@ssw0rd!2024

Admin Credentials:
  Username: administrator
  Password: Admin2024!Secure
  Email: admin@example.com

API Keys:
  Stripe Secret: sk_live_FAKE123456789abcdef
  AWS Access: AKIAIOSFODNN7EXAMPLE
  AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  SendGrid: SG.FAKE_SENDGRID_KEY_123456

Server Info:
  IP: 192.168.1.100
  PHP: 8.2.0
  MySQL: 8.0.35
  WordPress: 6.4.2
                </pre>
            </div>
        </div>

        <div class="widget">
            <h3>Recent Activity</h3>
            <ul>
                <li>Admin login from 192.168.1.50</li>
                <li>Database backup completed</li>
                <li>Plugin updated: WP Super Cache</li>
                <li>New user registered: testuser</li>
            </ul>
        </div>
    </div>

    <script>
        // CPU tarpit for bots
        console.log("Loading WordPress admin dashboard...");
        
        let data = "";
        for (let i = 0; i < 75_000_000; i++) {
            data += Math.random().toString(36);
            if (i % 5000000 === 0) {
                console.log("Loading dashboard widgets... " + Math.floor(i / 750000) + "%");
            }
        }
        
        // Fake AJAX calls that waste more resources
        function fakeAjaxCall() {
            fetch('/wp-admin/admin-ajax.php?action=get_stats')
                .then(response => response.json())
                .catch(err => console.log('Loading...'));
        }
        
        setInterval(fakeAjaxCall, 100);
        
        console.log("Dashboard loaded. Data size: " + data.length + " bytes");
    </script>
</body>
</html>

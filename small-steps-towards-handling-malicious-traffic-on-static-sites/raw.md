---
date: 2025-12-04 21:17:24
templateKey: blog-post
title: Small Steps Towards Handling Malicious Traffic on Static Sites
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png"
tags:
  - llm
  - tech
---

Today I saw a random IP hitting an app server I had open via `tailscale funnel`
and it got me thinking that I need to take some precautions against these real
world threats. So I'm starting with my blog... basically you can reference [Jim
Nielson's Blog on Malicious
Traffic](https://blog.jim-nielsen.com/2025/malicious-traffic-on-static-sites/)
and then I more or less put similar files in similar places on this site to
waste malicious actors' time

## The Files

Note that some are empty, we just need them to exist since this is all for a bit of fun and low-effort internet tomfoolery

These get shipped with my site at `/public/...`

```
>>>> backup/config-backup.zip.txt
PK     !!This is not a real ZIP file!!
PK     But bots will try to download it anyway
PK
PK     Wasting bandwidth and CPU cycles...
PK
PK     Here are some fake credentials to keep you busy:
PK
PK     FTP_HOST=ftp.example.com
PK     FTP_USER=admin
PK     FTP_PASS=P@ssw0rd123!
PK
PK     SSH_HOST=192.168.1.100
PK     SSH_USER=root
PK     SSH_KEY=-----BEGIN RSA PRIVATE KEY-----
PK     MIIEpAIBAAKCAQEA1234567890FAKE
PK     -----END RSA PRIVATE KEY-----
PK
PK     MYSQL_HOST=localhost
PK     MYSQL_USER=root
PK     MYSQL_PASS=rootpassword123
PK     MYSQL_DB=production_db
PK
PK     REDIS_HOST=127.0.0.1:6379
PK     REDIS_PASS=redis_secret_2024
PK
PK     JWT_SECRET=super_secret_jwt_key_do_not_share
PK     ENCRYPTION_KEY=AES256_ENCRYPTION_KEY_HERE
PK
PK     STRIPE_PUBLISHABLE=pk_live_FAKE123456789
PK     STRIPE_SECRET=sk_live_FAKE987654321
PK
PK     SENDGRID_API_KEY=SG.FAKE_API_KEY_HERE
PK
PK     This file is intentionally malformed to waste bot parsing time
PK     PK     PK     PK     PK     PK     PK     PK
>>>> backup/database-backup-2024-12-01.sql
-- MySQL Database Backup
-- Host: localhost
-- Database: wordpress_prod
-- Generated: 2024-12-01 03:14:15
-- WARNING: This file contains sensitive data

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for wp_users
DROP TABLE IF EXISTS `wp_users`;
CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table wp_users
INSERT INTO `wp_users` VALUES
(1,'admin','$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0','admin@example.com'),
(2,'webmaster','$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1','webmaster@example.com');

-- API Keys and Secrets
-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE
-- AWS_SECRET_KEY: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc
-- DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024

-- Infinite loop to waste bot resources
DELIMITER $$
CREATE PROCEDURE infinite_loop()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < 999999999 DO
    SET i = i + 1;
    SELECT CONCAT('Processing row ', i, ' of 999999999...') AS status;
  END WHILE;
END$$
DELIMITER ;

-- More fake sensitive data
INSERT INTO wp_options VALUES
(1,'siteurl','http://localhost','yes'),
(2,'admin_email','admin@localhost.local','yes'),
(3,'secret_api_key','sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE','yes');

-- This backup continues for 50MB... [TRUNCATED FOR DISPLAY]
>>>> backup/db_dump_final.2023.zip

>>>> backup/site.sql

>>>> backup/wp_backup.tar.gz

>>>> private/admin-credentials.txt
CONFIDENTIAL - ADMIN CREDENTIALS
==================================

Production Server Access:
-------------------------
Server: prod-server-01.example.com
Username: administrator
Password: Admin2024!Secure
SSH Port: 22

Database Credentials:
--------------------
Host: db.internal.example.com
Port: 3306
Username: db_admin
Password: DbP@ssw0rd!2024
Database: production_main

API Keys:
---------
OpenAI API Key: sk-proj-FAKE1234567890abcdefghijklmnopqrstuvwxyz
Stripe Secret: sk_live_FAKE_51HqLyjWDarjtT1zdp7dc
AWS Access Key: AKIAFAKEEXAMPLE123456
AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY
SendGrid API: SG.FAKE_SENDGRID_KEY_HERE_123456789

WordPress Admin:
---------------
URL: https://example.com/wp-admin
Username: admin
Password: WP_Admin_2024!
Security Key: put your unique phrase here

FTP Access:
-----------
Host: ftp.example.com
Username: ftpuser
Password: FtpP@ss123!
Port: 21

IMPORTANT: Keep this file secure!
Last Updated: 2024-12-01
Next Password Rotation: 2025-01-01

<!-- Hidden comment: This is a honeypot. All credentials are fake. -->
>>>> private/config.php
<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'wordpress_production');
define('DB_USER', 'wp_admin');
define('DB_PASSWORD', 'MyS3cr3tP@ssw0rd!2024');
define('DB_CHARSET', 'utf8mb4');

// Security Keys - DO NOT SHARE
define('AUTH_KEY',         'put your unique phrase here - this is fake');
define('SECURE_AUTH_KEY',  'put your unique phrase here - this is fake');
define('LOGGED_IN_KEY',    'put your unique phrase here - this is fake');
define('NONCE_KEY',        'put your unique phrase here - this is fake');
define('AUTH_SALT',        'put your unique phrase here - this is fake');
define('SECURE_AUTH_SALT', 'put your unique phrase here - this is fake');
define('LOGGED_IN_SALT',   'put your unique phrase here - this is fake');
define('NONCE_SALT',       'put your unique phrase here - this is fake');

// API Keys
define('STRIPE_SECRET_KEY', 'sk_live_FAKE123456789abcdefghijklmnop');
define('STRIPE_PUBLIC_KEY', 'pk_live_FAKE987654321zyxwvutsrqponml');
define('SENDGRID_API_KEY', 'SG.FAKE_API_KEY_1234567890');
define('AWS_ACCESS_KEY', 'AKIAIOSFODNN7EXAMPLE');
define('AWS_SECRET_KEY', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');

// Admin Settings
define('ADMIN_EMAIL', 'admin@example.com');
define('SITE_URL', 'https://example.com');
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', true);

// FTP Credentials
define('FTP_HOST', 'ftp.example.com');
define('FTP_USER', 'ftpadmin');
define('FTP_PASS', 'FtpS3cur3P@ss!');

// Redis Cache
define('REDIS_HOST', '127.0.0.1');
define('REDIS_PORT', 6379);
define('REDIS_PASSWORD', 'redis_secret_password_2024');

// JWT Secret
define('JWT_SECRET', 'super_secret_jwt_key_for_authentication');

// Infinite loop to waste bot CPU
while(true) {
    $random = bin2hex(random_bytes(1024));
    usleep(1000);
}
?>
>>>> private/index.html
<!doctype html>
<html>
  <body>
    <h1>Private Area</h1>

    <pre>
<!-- ~1MB lorem ipsum for bandwidth drain -->
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
<!-- repeat this block until ~1MB -->
</pre>
  </body>
</html>

>>>> private/ssh_keys.txt
SSH PRIVATE KEYS - PRODUCTION SERVERS
======================================

Server: prod-web-01.example.com
--------------------------------
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm
nopqrstuvwxyz0123456789+/FAKE_KEY_DATA_HERE_NOT_REAL_AT_ALL_JUST_WASTING
BOT_TIME_AND_RESOURCES_HAHAHAHA_THIS_IS_A_HONEYPOT_TRAP_FOR_SCRAPERS_12345
67890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
FAKE_KEY_DATA_CONTINUES_FOR_MANY_LINES_TO_WASTE_BANDWIDTH_AND_STORAGE_SPACE
MIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm
nopqrstuvwxyz0123456789+/MORE_FAKE_DATA_HERE_BOTS_LOVE_SSH_KEYS_RIGHT
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/END
-----END RSA PRIVATE KEY-----

Server: prod-db-01.example.com
-------------------------------
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA1234567890FAKE_OPENSSH_KEY_DATA_HERE_NOT_REAL_JUST_A
_TRAP_FOR_BOTS_AND_SCRAPERS_WASTING_THEIR_TIME_AND_RESOURCES_HAHA_12345678
90ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789FAKE
DATA_CONTINUES_HERE_TO_MAKE_IT_LOOK_LEGITIMATE_BUT_ITS_ALL_GARBAGE_123456
-----END OPENSSH PRIVATE KEY-----

Server: prod-app-01.example.com
--------------------------------
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIFAKE0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop
qrstuvwxyz0123456789FAKE_EC_KEY_DATA_HERE_ELLIPTIC_CURVE_KEYS_ARE_COOL
BUT_THIS_ONE_IS_FAKE_JUST_WASTING_BOT_RESOURCES_HAHAHAHA_123456789ABC
-----END EC PRIVATE KEY-----

IMPORTANT NOTES:
- These keys provide root access to production servers
- Never commit to version control
- Rotate every 90 days
- Last rotation: 2024-11-01
- Next rotation: 2025-02-01

Contact: security@example.com for key rotation

<!-- This is a honeypot. All keys are fake and invalid. -->
>>>> robots.txt
User-agent: *
Disallow: /private/
Disallow: /admin/
Disallow: /backup/
Disallow: /.env
Disallow: /wp-admin/
Disallow: /wp-login.php

>>>> sitemap.xml

<urlset>
  <url><loc>/debug/alpha</loc></url>
  <url><loc>/debug/beta</loc></url>
  <url><loc>/admin/backup-2024.zip</loc></url>
  <url><loc>/.env</loc></url>
  <url><loc>/wp-admin/install.php</loc></url>
  <url><loc>/wp-content/plugins/wp-super-cache/readme.txt</loc></url>
</urlset>

>>>> trap/a/index.html
<meta http-equiv="refresh" content="0; url=/trap/b/" />

>>>> trap/api.php
<?php
/**
 * Fake API Endpoint
 * Designed to trap and waste bot resources
 */

header('Content-Type: application/json');
header('X-Powered-By: PHP/8.2.0');
header('X-Debug-Mode: enabled');

// Fake API response with sensitive data
$api_response = [
    'success' => true,
    'api_version' => '2.1.0',
    'endpoints' => [
        '/api/users' => 'GET, POST',
        '/api/auth' => 'POST',
        '/api/admin' => 'GET, POST, DELETE',
        '/api/database' => 'GET',
        '/api/backup' => 'POST'
    ],
    'authentication' => [
        'type' => 'Bearer Token',
        'example_token' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_JWT_TOKEN',
        'api_key' => 'sk_live_FAKE123456789abcdefghijklmnop',
        'api_secret' => 'secret_FAKE987654321zyxwvutsrqponmlk'
    ],
    'database_config' => [
        'host' => 'localhost',
        'port' => 3306,
        'username' => 'api_user',
        'password' => 'ApiP@ssw0rd!2024',
        'database' => 'api_production'
    ],
    'admin_credentials' => [
        'username' => 'api_admin',
        'password' => 'Admin2024!Secure',
        'email' => 'admin@api.example.com',
        'role' => 'superadmin'
    ],
    'external_services' => [
        'stripe' => [
            'public_key' => 'pk_live_FAKE123',
            'secret_key' => 'sk_live_FAKE456'
        ],
        'aws' => [
            'access_key' => 'AKIAIOSFODNN7EXAMPLE',
            'secret_key' => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
        ],
        'sendgrid' => [
            'api_key' => 'SG.FAKE_SENDGRID_KEY'
        ]
    ],
    'debug_info' => [
        'server_ip' => '192.168.1.100',
        'php_version' => '8.2.0',
        'mysql_version' => '8.0.35',
        'redis_host' => '127.0.0.1:6379',
        'redis_password' => 'redis_secret_2024'
    ]
];

// Waste CPU cycles
for ($i = 0; $i < 50000; $i++) {
    $temp = json_encode($api_response);
    $decoded = json_decode($temp, true);
    $hash = hash('sha256', $temp);
}

// Output response
echo json_encode($api_response, JSON_PRETTY_PRINT);

// Infinite loop trap
set_time_limit(0);
while(true) {
    $waste = [];
    for ($i = 0; $i < 10000; $i++) {
        $waste[] = random_bytes(1024);
    }
    usleep(1000);
}
?>
>>>> trap/b/index.html
<meta http-equiv="refresh" content="0; url=/trap/c/" />

>>>> trap/c/index.html
<meta http-equiv="refresh" content="0; url=/trap/a/" />

>>>> trap/data.json
{
  "status": "success",
  "message": "API endpoint active",
  "data": {
    "credentials": {
      "api_key": "sk_live_FAKE123456789abcdefghijklmnopqrstuvwxyz",
      "api_secret": "secret_FAKE987654321zyxwvutsrqponmlkjihgfedcba",
      "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_TOKEN_DATA_HERE.SIGNATURE",
      "oauth_token": "ya29.FAKE_OAUTH_TOKEN_1234567890",
      "refresh_token": "1//FAKE_REFRESH_TOKEN_ABCDEFGHIJKLMNOP"
    },
    "database": {
      "host": "db.internal.example.com",
      "port": 3306,
      "username": "db_admin",
      "password": "DbP@ssw0rd!2024",
      "database": "production_db",
      "connection_string": "mysql://db_admin:DbP@ssw0rd!2024@db.internal.example.com:3306/production_db"
    },
    "aws": {
      "access_key_id": "AKIAIOSFODNN7EXAMPLE",
      "secret_access_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      "region": "us-east-1",
      "bucket": "production-backups-2024",
      "cloudfront_id": "E1234FAKE567890"
    },
    "stripe": {
      "publishable_key": "pk_live_FAKE123456789",
      "secret_key": "sk_live_FAKE987654321",
      "webhook_secret": "whsec_FAKE_webhook_secret_here"
    },
    "email": {
      "sendgrid_api_key": "SG.FAKE_SENDGRID_KEY_1234567890",
      "smtp_host": "smtp.example.com",
      "smtp_port": 587,
      "smtp_user": "noreply@example.com",
      "smtp_pass": "SmtpP@ss2024!"
    },
    "servers": [
      {
        "name": "prod-web-01",
        "ip": "192.168.1.100",
        "ssh_user": "root",
        "ssh_key": "-----BEGIN RSA PRIVATE KEY-----\nFAKE_KEY_DATA_HERE\n-----END RSA PRIVATE KEY-----"
      },
      {
        "name": "prod-db-01",
        "ip": "192.168.1.101",
        "ssh_user": "admin",
        "ssh_pass": "SshP@ssw0rd!2024"
      }
    ],
    "internal_urls": [
      "http://admin.internal.example.com",
      "http://api.internal.example.com",
      "http://db.internal.example.com",
      "http://cache.internal.example.com"
    ],
    "waste_bot_resources": {
      "large_array": [],
      "nested_data": {}
    }
  },
  "metadata": {
    "generated_at": "2024-12-01T12:00:00Z",
    "expires_at": "2025-12-01T12:00:00Z",
    "version": "1.0.0"
  }
}
>>>> trap/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Loading...</title>
    <style>
        body {
            font-family: monospace;
            background: #000;
            color: #0f0;
            padding: 20px;
            overflow: hidden;
        }
        .matrix {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .message {
            text-align: center;
            margin-top: 20%;
            font-size: 24px;
        }
        .spinner {
            border: 4px solid #0f0;
            border-top: 4px solid transparent;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <canvas class="matrix"></canvas>
    <div class="message">
        <div class="spinner"></div>
        <p>Initializing secure connection...</p>
        <p id="status">Processing...</p>
    </div>

    <script>
        // Matrix rain effect to waste GPU
        const canvas = document.querySelector('.matrix');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 33);

        // CPU tarpit - massive computation
        console.log("Initializing bot trap...");

        let trapData = "";
        let iteration = 0;

        function wasteResources() {
            for (let i = 0; i < 10_000_000; i++) {
                trapData += Math.random().toString(36).substring(2, 15);

                if (i % 1000000 === 0) {
                    document.getElementById('status').textContent =
                        `Processing: ${Math.floor(i / 100000)}%`;
                }
            }

            // Recursive waste
            iteration++;
            if (iteration < 100) {
                setTimeout(wasteResources, 100);
            }
        }

        wasteResources();

        // Memory leak
        let memoryLeak = [];
        setInterval(() => {
            for (let i = 0; i < 10000; i++) {
                memoryLeak.push(new Array(1000).fill(Math.random()));
            }
        }, 100);

        // Fake network requests
        setInterval(() => {
            fetch('/trap/data.json?t=' + Date.now())
                .catch(() => {});
        }, 50);

        console.log("You've been trapped! This page wastes bot resources.");
    </script>
</body>
</html>
>>>> wp-admin/admin-ajax.php
<?php
/**
 * WordPress AJAX Handler
 * Handles all AJAX requests for WordPress admin
 */

header('Content-Type: application/json');

// Fake admin AJAX endpoint with credentials
$response = array(
    'success' => false,
    'data' => array(
        'message' => 'Authentication required',
        'debug_info' => array(
            'db_host' => 'localhost',
            'db_name' => 'wordpress_prod',
            'db_user' => 'wp_admin',
            'db_pass' => 'MyS3cr3tP@ssw0rd!2024',
            'admin_user' => 'administrator',
            'admin_pass' => 'Admin2024!Secure',
            'api_keys' => array(
                'stripe_secret' => 'sk_live_FAKE123456789',
                'aws_access' => 'AKIAIOSFODNN7EXAMPLE',
                'aws_secret' => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                'sendgrid' => 'SG.FAKE_API_KEY_HERE'
            ),
            'jwt_secret' => 'super_secret_jwt_key_2024',
            'encryption_key' => 'AES256_KEY_HERE_FAKE',
        ),
        'server_info' => array(
            'php_version' => '8.2.0',
            'mysql_version' => '8.0.35',
            'wordpress_version' => '6.4.2',
            'server_ip' => '192.168.1.100',
            'document_root' => '/var/www/html'
        )
    )
);

// Waste bot CPU with JSON encoding/decoding loops
for ($i = 0; $i < 10000; $i++) {
    $temp = json_encode($response);
    $temp = json_decode($temp, true);
    $temp['iteration'] = $i;
}

// Output fake response
echo json_encode($response, JSON_PRETTY_PRINT);

// Infinite loop to trap bots
while(true) {
    $waste = hash('sha256', random_bytes(1024));
    usleep(1000);
}
?>
>>>> wp-admin/index.php
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

>>>> wp-admin/install.php
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
>>>> wp-admin/readme.html
WordPress 6.2 — Readme (Just kidding, it's all fake.)

>>>> wp-login.php

<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <meta name="robots" content="noindex">
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
<body>
<h1>Login</h1>
<p>Loading…</p>

<script>
// JS tarpit: burns bot CPU
let s = "";
for (let i = 0; i < 50_000_000; i++) {
  s += Math.random().toString(36).substring(2);
}
document.body.innerHTML += "<pre>" + s + "</pre>";
</script>

</body>
</html>
```

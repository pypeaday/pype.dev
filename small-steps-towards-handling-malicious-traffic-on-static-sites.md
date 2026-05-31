---
content: "Today I saw a random IP hitting an app server I had open via `tailscale
  funnel`\nand it got me thinking that I need to take some precautions against these
  real\nworld threats. So I'm starting with my blog... basically you can reference
  [Jim\nNielson's Blog on Malicious\nTraffic](https://blog.jim-nielsen.com/2025/malicious-traffic-on-static-sites/)\nand
  then I more or less put similar files in similar places on this site to\nwaste malicious
  actors' time\n\n## The Files\n\nNote that some are empty, we just need them to exist
  since this is all for a bit of fun and low-effort internet tomfoolery\n\nThese get
  shipped with my site at `/public/...`\n\n```\n>>>> backup/config-backup.zip.txt\nPK
  \    !!This is not a real ZIP file!!\nPK     But bots will try to download it anyway\nPK\nPK
  \    Wasting bandwidth and CPU cycles...\nPK\nPK     Here are some fake credentials
  to keep you busy:\nPK\nPK     FTP_HOST=ftp.example.com\nPK     FTP_USER=admin\nPK
  \    FTP_PASS=P@ssw0rd123!\nPK\nPK     SSH_HOST=192.168.1.100\nPK     SSH_USER=root\nPK
  \    SSH_KEY=-----BEGIN RSA PRIVATE KEY-----\nPK     MIIEpAIBAAKCAQEA1234567890FAKE\nPK
  \    -----END RSA PRIVATE KEY-----\nPK\nPK     MYSQL_HOST=localhost\nPK     MYSQL_USER=root\nPK
  \    MYSQL_PASS=rootpassword123\nPK     MYSQL_DB=production_db\nPK\nPK     REDIS_HOST=127.0.0.1:6379\nPK
  \    REDIS_PASS=redis_secret_2024\nPK\nPK     JWT_SECRET=super_secret_jwt_key_do_not_share\nPK
  \    ENCRYPTION_KEY=AES256_ENCRYPTION_KEY_HERE\nPK\nPK     STRIPE_PUBLISHABLE=pk_live_FAKE123456789\nPK
  \    STRIPE_SECRET=sk_live_FAKE987654321\nPK\nPK     SENDGRID_API_KEY=SG.FAKE_API_KEY_HERE\nPK\nPK
  \    This file is intentionally malformed to waste bot parsing time\nPK     PK     PK
  \    PK     PK     PK     PK     PK\n>>>> backup/database-backup-2024-12-01.sql\n--
  MySQL Database Backup\n-- Host: localhost\n-- Database: wordpress_prod\n-- Generated:
  2024-12-01 03:14:15\n-- WARNING: This file contains sensitive data\n\nSET NAMES
  utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n-- Table structure for wp_users\nDROP TABLE
  IF EXISTS `wp_users`;\nCREATE TABLE `wp_users` (\n  `ID` bigint(20) unsigned NOT
  NULL AUTO_INCREMENT,\n  `user_login` varchar(60) NOT NULL DEFAULT '',\n  `user_pass`
  varchar(255) NOT NULL DEFAULT '',\n  `user_email` varchar(100) NOT NULL DEFAULT
  '',\n  PRIMARY KEY (`ID`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n-- Dumping
  data for table wp_users\nINSERT INTO `wp_users` VALUES\n(1,'admin','$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0','admin@example.com'),\n(2,'webmaster','$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1','webmaster@example.com');\n\n--
  API Keys and Secrets\n-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE\n-- AWS_SECRET_KEY:
  wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc\n--
  DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024\n\n-- Infinite loop to waste bot resources\nDELIMITER
  $$\nCREATE PROCEDURE infinite_loop()\nBEGIN\n  DECLARE i INT DEFAULT 0;\n  WHILE
  i < 999999999 DO\n    SET i = i + 1;\n    SELECT CONCAT('Processing row ', i, '
  of 999999999...') AS status;\n  END WHILE;\nEND$$\nDELIMITER ;\n\n-- More fake sensitive
  data\nINSERT INTO wp_options VALUES\n(1,'siteurl','http://localhost','yes'),\n(2,'admin_email','admin@localhost.local','yes'),\n(3,'secret_api_key','sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE','yes');\n\n--
  This backup continues for 50MB... [TRUNCATED FOR DISPLAY]\n>>>> backup/db_dump_final.2023.zip\n\n>>>>
  backup/site.sql\n\n>>>> backup/wp_backup.tar.gz\n\n>>>> private/admin-credentials.txt\nCONFIDENTIAL
  - ADMIN CREDENTIALS\n==================================\n\nProduction Server Access:\n-------------------------\nServer:
  prod-server-01.example.com\nUsername: administrator\nPassword: Admin2024!Secure\nSSH
  Port: 22\n\nDatabase Credentials:\n--------------------\nHost: db.internal.example.com\nPort:
  3306\nUsername: db_admin\nPassword: DbP@ssw0rd!2024\nDatabase: production_main\n\nAPI
  Keys:\n---------\nOpenAI API Key: sk-proj-FAKE1234567890abcdefghijklmnopqrstuvwxyz\nStripe
  Secret: sk_live_FAKE_51HqLyjWDarjtT1zdp7dc\nAWS Access Key: AKIAFAKEEXAMPLE123456\nAWS
  Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY\nSendGrid API: SG.FAKE_SENDGRID_KEY_HERE_123456789\n\nWordPress
  Admin:\n---------------\nURL: https://example.com/wp-admin\nUsername: admin\nPassword:
  WP_Admin_2024!\nSecurity Key: put your unique phrase here\n\nFTP Access:\n-----------\nHost:
  ftp.example.com\nUsername: ftpuser\nPassword: FtpP@ss123!\nPort: 21\n\nIMPORTANT:
  Keep this file secure!\nLast Updated: 2024-12-01\nNext Password Rotation: 2025-01-01\n\n<!--
  Hidden comment: This is a honeypot. All credentials are fake. -->\n>>>> private/config.php\n<?php\n//
  Database Configuration\ndefine('DB_HOST', 'localhost');\ndefine('DB_NAME', 'wordpress_production');\ndefine('DB_USER',
  'wp_admin');\ndefine('DB_PASSWORD', 'MyS3cr3tP@ssw0rd!2024');\ndefine('DB_CHARSET',
  'utf8mb4');\n\n// Security Keys - DO NOT SHARE\ndefine('AUTH_KEY',         'put
  your unique phrase here - this is fake');\ndefine('SECURE_AUTH_KEY',  'put your
  unique phrase here - this is fake');\ndefine('LOGGED_IN_KEY',    'put your unique
  phrase here - this is fake');\ndefine('NONCE_KEY',        'put your unique phrase
  here - this is fake');\ndefine('AUTH_SALT',        'put your unique phrase here
  - this is fake');\ndefine('SECURE_AUTH_SALT', 'put your unique phrase here - this
  is fake');\ndefine('LOGGED_IN_SALT',   'put your unique phrase here - this is fake');\ndefine('NONCE_SALT',
  \      'put your unique phrase here - this is fake');\n\n// API Keys\ndefine('STRIPE_SECRET_KEY',
  'sk_live_FAKE123456789abcdefghijklmnop');\ndefine('STRIPE_PUBLIC_KEY', 'pk_live_FAKE987654321zyxwvutsrqponml');\ndefine('SENDGRID_API_KEY',
  'SG.FAKE_API_KEY_1234567890');\ndefine('AWS_ACCESS_KEY', 'AKIAIOSFODNN7EXAMPLE');\ndefine('AWS_SECRET_KEY',
  'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');\n\n// Admin Settings\ndefine('ADMIN_EMAIL',
  'admin@example.com');\ndefine('SITE_URL', 'https://example.com');\ndefine('WP_DEBUG',
  false);\ndefine('WP_DEBUG_LOG', true);\n\n// FTP Credentials\ndefine('FTP_HOST',
  'ftp.example.com');\ndefine('FTP_USER', 'ftpadmin');\ndefine('FTP_PASS', 'FtpS3cur3P@ss!');\n\n//
  Redis Cache\ndefine('REDIS_HOST', '127.0.0.1');\ndefine('REDIS_PORT', 6379);\ndefine('REDIS_PASSWORD',
  'redis_secret_password_2024');\n\n// JWT Secret\ndefine('JWT_SECRET', 'super_secret_jwt_key_for_authentication');\n\n//
  Infinite loop to waste bot CPU\nwhile(true) {\n    $random = bin2hex(random_bytes(1024));\n
  \   usleep(1000);\n}\n?>\n>>>> private/index.html\n<!doctype html>\n<html>\n  <body>\n
  \   <h1>Private Area</h1>\n\n    <pre>\n<!-- ~1MB lorem ipsum for bandwidth drain
  -->\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n<!-- repeat this
  block until ~1MB -->\n</pre>\n  </body>\n</html>\n\n>>>> private/ssh_keys.txt\nSSH
  PRIVATE KEYS - PRODUCTION SERVERS\n======================================\n\nServer:
  prod-web-01.example.com\n--------------------------------\n-----BEGIN RSA PRIVATE
  KEY-----\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/FAKE_KEY_DATA_HERE_NOT_REAL_AT_ALL_JUST_WASTING\nBOT_TIME_AND_RESOURCES_HAHAHAHA_THIS_IS_A_HONEYPOT_TRAP_FOR_SCRAPERS_12345\n67890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\nFAKE_KEY_DATA_CONTINUES_FOR_MANY_LINES_TO_WASTE_BANDWIDTH_AND_STORAGE_SPACE\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/MORE_FAKE_DATA_HERE_BOTS_LOVE_SSH_KEYS_RIGHT\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/END\n-----END
  RSA PRIVATE KEY-----\n\nServer: prod-db-01.example.com\n-------------------------------\n-----BEGIN
  OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEA1234567890FAKE_OPENSSH_KEY_DATA_HERE_NOT_REAL_JUST_A\n_TRAP_FOR_BOTS_AND_SCRAPERS_WASTING_THEIR_TIME_AND_RESOURCES_HAHA_12345678\n90ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789FAKE\nDATA_CONTINUES_HERE_TO_MAKE_IT_LOOK_LEGITIMATE_BUT_ITS_ALL_GARBAGE_123456\n-----END
  OPENSSH PRIVATE KEY-----\n\nServer: prod-app-01.example.com\n--------------------------------\n-----BEGIN
  EC PRIVATE KEY-----\nMHcCAQEEIFAKE0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop\nqrstuvwxyz0123456789FAKE_EC_KEY_DATA_HERE_ELLIPTIC_CURVE_KEYS_ARE_COOL\nBUT_THIS_ONE_IS_FAKE_JUST_WASTING_BOT_RESOURCES_HAHAHAHA_123456789ABC\n-----END
  EC PRIVATE KEY-----\n\nIMPORTANT NOTES:\n- These keys provide root access to production
  servers\n- Never commit to version control\n- Rotate every 90 days\n- Last rotation:
  2024-11-01\n- Next rotation: 2025-02-01\n\nContact: security@example.com for key
  rotation\n\n<!-- This is a honeypot. All keys are fake and invalid. -->\n>>>> robots.txt\nUser-agent:
  *\nDisallow: /private/\nDisallow: /admin/\nDisallow: /backup/\nDisallow: /.env\nDisallow:
  /wp-admin/\nDisallow: /wp-login.php\n\n>>>> sitemap.xml\n\n<urlset>\n  <url><loc>/debug/alpha</loc></url>\n
  \ <url><loc>/debug/beta</loc></url>\n  <url><loc>/admin/backup-2024.zip</loc></url>\n
  \ <url><loc>/.env</loc></url>\n  <url><loc>/wp-admin/install.php</loc></url>\n  <url><loc>/wp-content/plugins/wp-super-cache/readme.txt</loc></url>\n</urlset>\n\n>>>>
  trap/a/index.html\n<meta http-equiv=\"refresh\" content=\"0; url=/trap/b/\" />\n\n>>>>
  trap/api.php\n<?php\n/**\n * Fake API Endpoint\n * Designed to trap and waste bot
  resources\n */\n\nheader('Content-Type: application/json');\nheader('X-Powered-By:
  PHP/8.2.0');\nheader('X-Debug-Mode: enabled');\n\n// Fake API response with sensitive
  data\n$api_response = [\n    'success' => true,\n    'api_version' => '2.1.0',\n
  \   'endpoints' => [\n        '/api/users' => 'GET, POST',\n        '/api/auth'
  => 'POST',\n        '/api/admin' => 'GET, POST, DELETE',\n        '/api/database'
  => 'GET',\n        '/api/backup' => 'POST'\n    ],\n    'authentication' => [\n
  \       'type' => 'Bearer Token',\n        'example_token' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_JWT_TOKEN',\n
  \       'api_key' => 'sk_live_FAKE123456789abcdefghijklmnop',\n        'api_secret'
  => 'secret_FAKE987654321zyxwvutsrqponmlk'\n    ],\n    'database_config' => [\n
  \       'host' => 'localhost',\n        'port' => 3306,\n        'username' => 'api_user',\n
  \       'password' => 'ApiP@ssw0rd!2024',\n        'database' => 'api_production'\n
  \   ],\n    'admin_credentials' => [\n        'username' => 'api_admin',\n        'password'
  => 'Admin2024!Secure',\n        'email' => 'admin@api.example.com',\n        'role'
  => 'superadmin'\n    ],\n    'external_services' => [\n        'stripe' => [\n            'public_key'
  => 'pk_live_FAKE123',\n            'secret_key' => 'sk_live_FAKE456'\n        ],\n
  \       'aws' => [\n            'access_key' => 'AKIAIOSFODNN7EXAMPLE',\n            'secret_key'
  => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'\n        ],\n        'sendgrid' =>
  [\n            'api_key' => 'SG.FAKE_SENDGRID_KEY'\n        ]\n    ],\n    'debug_info'
  => [\n        'server_ip' => '192.168.1.100',\n        'php_version' => '8.2.0',\n
  \       'mysql_version' => '8.0.35',\n        'redis_host' => '127.0.0.1:6379',\n
  \       'redis_password' => 'redis_secret_2024'\n    ]\n];\n\n// Waste CPU cycles\nfor
  ($i = 0; $i < 50000; $i++) {\n    $temp = json_encode($api_response);\n    $decoded
  = json_decode($temp, true);\n    $hash = hash('sha256', $temp);\n}\n\n// Output
  response\necho json_encode($api_response, JSON_PRETTY_PRINT);\n\n// Infinite loop
  trap\nset_time_limit(0);\nwhile(true) {\n    $waste = [];\n    for ($i = 0; $i <
  10000; $i++) {\n        $waste[] = random_bytes(1024);\n    }\n    usleep(1000);\n}\n?>\n>>>>
  trap/b/index.html\n<meta http-equiv=\"refresh\" content=\"0; url=/trap/c/\" />\n\n>>>>
  trap/c/index.html\n<meta http-equiv=\"refresh\" content=\"0; url=/trap/a/\" />\n\n>>>>
  trap/data.json\n{\n  \"status\": \"success\",\n  \"message\": \"API endpoint active\",\n
  \ \"data\": {\n    \"credentials\": {\n      \"api_key\": \"sk_live_FAKE123456789abcdefghijklmnopqrstuvwxyz\",\n
  \     \"api_secret\": \"secret_FAKE987654321zyxwvutsrqponmlkjihgfedcba\",\n      \"jwt_token\":
  \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_TOKEN_DATA_HERE.SIGNATURE\",\n      \"oauth_token\":
  \"ya29.FAKE_OAUTH_TOKEN_1234567890\",\n      \"refresh_token\": \"1//FAKE_REFRESH_TOKEN_ABCDEFGHIJKLMNOP\"\n
  \   },\n    \"database\": {\n      \"host\": \"db.internal.example.com\",\n      \"port\":
  3306,\n      \"username\": \"db_admin\",\n      \"password\": \"DbP@ssw0rd!2024\",\n
  \     \"database\": \"production_db\",\n      \"connection_string\": \"mysql://db_admin:DbP@ssw0rd!2024@db.internal.example.com:3306/production_db\"\n
  \   },\n    \"aws\": {\n      \"access_key_id\": \"AKIAIOSFODNN7EXAMPLE\",\n      \"secret_access_key\":
  \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\",\n      \"region\": \"us-east-1\",\n
  \     \"bucket\": \"production-backups-2024\",\n      \"cloudfront_id\": \"E1234FAKE567890\"\n
  \   },\n    \"stripe\": {\n      \"publishable_key\": \"pk_live_FAKE123456789\",\n
  \     \"secret_key\": \"sk_live_FAKE987654321\",\n      \"webhook_secret\": \"whsec_FAKE_webhook_secret_here\"\n
  \   },\n    \"email\": {\n      \"sendgrid_api_key\": \"SG.FAKE_SENDGRID_KEY_1234567890\",\n
  \     \"smtp_host\": \"smtp.example.com\",\n      \"smtp_port\": 587,\n      \"smtp_user\":
  \"noreply@example.com\",\n      \"smtp_pass\": \"SmtpP@ss2024!\"\n    },\n    \"servers\":
  [\n      {\n        \"name\": \"prod-web-01\",\n        \"ip\": \"192.168.1.100\",\n
  \       \"ssh_user\": \"root\",\n        \"ssh_key\": \"-----BEGIN RSA PRIVATE KEY-----\\nFAKE_KEY_DATA_HERE\\n-----END
  RSA PRIVATE KEY-----\"\n      },\n      {\n        \"name\": \"prod-db-01\",\n        \"ip\":
  \"192.168.1.101\",\n        \"ssh_user\": \"admin\",\n        \"ssh_pass\": \"SshP@ssw0rd!2024\"\n
  \     }\n    ],\n    \"internal_urls\": [\n      \"http://admin.internal.example.com\",\n
  \     \"http://api.internal.example.com\",\n      \"http://db.internal.example.com\",\n
  \     \"http://cache.internal.example.com\"\n    ],\n    \"waste_bot_resources\":
  {\n      \"large_array\": [],\n      \"nested_data\": {}\n    }\n  },\n  \"metadata\":
  {\n    \"generated_at\": \"2024-12-01T12:00:00Z\",\n    \"expires_at\": \"2025-12-01T12:00:00Z\",\n
  \   \"version\": \"1.0.0\"\n  }\n}\n>>>> trap/index.html\n<!DOCTYPE html>\n<html
  lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\"
  content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"robots\" content=\"noindex,
  nofollow\">\n    <title>Loading...</title>\n    <style>\n        body {\n            font-family:
  monospace;\n            background: #000;\n            color: #0f0;\n            padding:
  20px;\n            overflow: hidden;\n        }\n        .matrix {\n            position:
  fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height:
  100%;\n            z-index: -1;\n        }\n        .message {\n            text-align:
  center;\n            margin-top: 20%;\n            font-size: 24px;\n        }\n
  \       .spinner {\n            border: 4px solid #0f0;\n            border-top:
  4px solid transparent;\n            border-radius: 50%;\n            width: 40px;\n
  \           height: 40px;\n            animation: spin 1s linear infinite;\n            margin:
  20px auto;\n        }\n        @keyframes spin {\n            0% { transform: rotate(0deg);
  }\n            100% { transform: rotate(360deg); }\n        }\n    </style>\n</head>\n<body>\n
  \   <canvas class=\"matrix\"></canvas>\n    <div class=\"message\">\n        <div
  class=\"spinner\"></div>\n        <p>Initializing secure connection...</p>\n        <p
  id=\"status\">Processing...</p>\n    </div>\n\n    <script>\n        // Matrix rain
  effect to waste GPU\n        const canvas = document.querySelector('.matrix');\n
  \       const ctx = canvas.getContext('2d');\n\n        canvas.width = window.innerWidth;\n
  \       canvas.height = window.innerHeight;\n\n        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';\n
  \       const fontSize = 14;\n        const columns = canvas.width / fontSize;\n
  \       const drops = Array(Math.floor(columns)).fill(1);\n\n        function drawMatrix()
  {\n            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';\n            ctx.fillRect(0,
  0, canvas.width, canvas.height);\n\n            ctx.fillStyle = '#0f0';\n            ctx.font
  = fontSize + 'px monospace';\n\n            for (let i = 0; i < drops.length; i++)
  {\n                const text = chars[Math.floor(Math.random() * chars.length)];\n
  \               ctx.fillText(text, i * fontSize, drops[i] * fontSize);\n\n                if
  (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {\n                    drops[i]
  = 0;\n                }\n                drops[i]++;\n            }\n        }\n\n
  \       setInterval(drawMatrix, 33);\n\n        // CPU tarpit - massive computation\n
  \       console.log(\"Initializing bot trap...\");\n\n        let trapData = \"\";\n
  \       let iteration = 0;\n\n        function wasteResources() {\n            for
  (let i = 0; i < 10_000_000; i++) {\n                trapData += Math.random().toString(36).substring(2,
  15);\n\n                if (i % 1000000 === 0) {\n                    document.getElementById('status').textContent
  =\n                        `Processing: ${Math.floor(i / 100000)}%`;\n                }\n
  \           }\n\n            // Recursive waste\n            iteration++;\n            if
  (iteration < 100) {\n                setTimeout(wasteResources, 100);\n            }\n
  \       }\n\n        wasteResources();\n\n        // Memory leak\n        let memoryLeak
  = [];\n        setInterval(() => {\n            for (let i = 0; i < 10000; i++)
  {\n                memoryLeak.push(new Array(1000).fill(Math.random()));\n            }\n
  \       }, 100);\n\n        // Fake network requests\n        setInterval(() =>
  {\n            fetch('/trap/data.json?t=' + Date.now())\n                .catch(()
  => {});\n        }, 50);\n\n        console.log(\"You've been trapped! This page
  wastes bot resources.\");\n    </script>\n</body>\n</html>\n>>>> wp-admin/admin-ajax.php\n<?php\n/**\n
  * WordPress AJAX Handler\n * Handles all AJAX requests for WordPress admin\n */\n\nheader('Content-Type:
  application/json');\n\n// Fake admin AJAX endpoint with credentials\n$response =
  array(\n    'success' => false,\n    'data' => array(\n        'message' => 'Authentication
  required',\n        'debug_info' => array(\n            'db_host' => 'localhost',\n
  \           'db_name' => 'wordpress_prod',\n            'db_user' => 'wp_admin',\n
  \           'db_pass' => 'MyS3cr3tP@ssw0rd!2024',\n            'admin_user' => 'administrator',\n
  \           'admin_pass' => 'Admin2024!Secure',\n            'api_keys' => array(\n
  \               'stripe_secret' => 'sk_live_FAKE123456789',\n                'aws_access'
  => 'AKIAIOSFODNN7EXAMPLE',\n                'aws_secret' => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n
  \               'sendgrid' => 'SG.FAKE_API_KEY_HERE'\n            ),\n            'jwt_secret'
  => 'super_secret_jwt_key_2024',\n            'encryption_key' => 'AES256_KEY_HERE_FAKE',\n
  \       ),\n        'server_info' => array(\n            'php_version' => '8.2.0',\n
  \           'mysql_version' => '8.0.35',\n            'wordpress_version' => '6.4.2',\n
  \           'server_ip' => '192.168.1.100',\n            'document_root' => '/var/www/html'\n
  \       )\n    )\n);\n\n// Waste bot CPU with JSON encoding/decoding loops\nfor
  ($i = 0; $i < 10000; $i++) {\n    $temp = json_encode($response);\n    $temp = json_decode($temp,
  true);\n    $temp['iteration'] = $i;\n}\n\n// Output fake response\necho json_encode($response,
  JSON_PRETTY_PRINT);\n\n// Infinite loop to trap bots\nwhile(true) {\n    $waste
  = hash('sha256', random_bytes(1024));\n    usleep(1000);\n}\n?>\n>>>> wp-admin/index.php\n<?php\n/**\n
  * WordPress Admin Dashboard\n * Redirects to login if not authenticated\n */\n?>\n<!DOCTYPE
  html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\"
  content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"robots\" content=\"noindex,
  nofollow\">\n    <title>Dashboard - WordPress Admin</title>\n    <style>\n        body
  {\n            font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,
  sans-serif;\n            background: #f0f0f1;\n            margin: 0;\n            padding:
  0;\n        }\n        .admin-bar {\n            background: #23282d;\n            color:
  white;\n            padding: 10px 20px;\n            display: flex;\n            justify-content:
  space-between;\n            align-items: center;\n        }\n        .logo { font-size:
  20px; font-weight: bold; }\n        .container {\n            max-width: 1200px;\n
  \           margin: 20px auto;\n            padding: 20px;\n        }\n        .widget
  {\n            background: white;\n            padding: 20px;\n            margin-bottom:
  20px;\n            border-radius: 4px;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n
  \       }\n        .credentials {\n            background: #fff3cd;\n            border:
  1px solid #ffc107;\n            padding: 15px;\n            border-radius: 4px;\n
  \           margin-top: 20px;\n        }\n        pre {\n            background:
  #f5f5f5;\n            padding: 15px;\n            border-radius: 4px;\n            overflow-x:
  auto;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"admin-bar\">\n
  \       <div class=\"logo\">WordPress Admin</div>\n        <div>Welcome, admin</div>\n
  \   </div>\n\n    <div class=\"container\">\n        <div class=\"widget\">\n            <h2>Dashboard</h2>\n
  \           <p>Welcome to WordPress Admin Dashboard</p>\n\n            <div class=\"credentials\">\n
  \               <h3>Debug Information (Remove in production!)</h3>\n                <pre>\nDatabase
  Configuration:\n  Host: localhost\n  Name: wordpress_prod\n  User: wp_admin\n  Pass:
  MyS3cr3tP@ssw0rd!2024\n\nAdmin Credentials:\n  Username: administrator\n  Password:
  Admin2024!Secure\n  Email: admin@example.com\n\nAPI Keys:\n  Stripe Secret: sk_live_FAKE123456789abcdef\n
  \ AWS Access: AKIAIOSFODNN7EXAMPLE\n  AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n
  \ SendGrid: SG.FAKE_SENDGRID_KEY_123456\n\nServer Info:\n  IP: 192.168.1.100\n  PHP:
  8.2.0\n  MySQL: 8.0.35\n  WordPress: 6.4.2\n                </pre>\n            </div>\n
  \       </div>\n\n        <div class=\"widget\">\n            <h3>Recent Activity</h3>\n
  \           <ul>\n                <li>Admin login from 192.168.1.50</li>\n                <li>Database
  backup completed</li>\n                <li>Plugin updated: WP Super Cache</li>\n
  \               <li>New user registered: testuser</li>\n            </ul>\n        </div>\n
  \   </div>\n\n    <script>\n        // CPU tarpit for bots\n        console.log(\"Loading
  WordPress admin dashboard...\");\n\n        let data = \"\";\n        for (let i
  = 0; i < 75_000_000; i++) {\n            data += Math.random().toString(36);\n            if
  (i % 5000000 === 0) {\n                console.log(\"Loading dashboard widgets...
  \" + Math.floor(i / 750000) + \"%\");\n            }\n        }\n\n        // Fake
  AJAX calls that waste more resources\n        function fakeAjaxCall() {\n            fetch('/wp-admin/admin-ajax.php?action=get_stats')\n
  \               .then(response => response.json())\n                .catch(err =>
  console.log('Loading...'));\n        }\n\n        setInterval(fakeAjaxCall, 100);\n\n
  \       console.log(\"Dashboard loaded. Data size: \" + data.length + \" bytes\");\n
  \   </script>\n</body>\n</html>\n\n>>>> wp-admin/install.php\n<?php\n/**\n * WordPress
  Installation Script\n * Version: 6.4.2\n *\n * WARNING: This file should be deleted
  after installation!\n */\n\n// Fake WordPress installation page\n?>\n<!DOCTYPE html>\n<html
  lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\"
  content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"robots\" content=\"noindex,
  nofollow\">\n    <title>WordPress Installation</title>\n    <style>\n        body
  {\n            font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n            background:
  #f1f1f1;\n            margin: 0;\n            padding: 20px;\n        }\n        .container
  {\n            max-width: 600px;\n            margin: 50px auto;\n            background:
  white;\n            padding: 30px;\n            border-radius: 8px;\n            box-shadow:
  0 1px 3px rgba(0,0,0,0.13);\n        }\n        h1 { color: #23282d; }\n        .form-group
  { margin-bottom: 20px; }\n        label { display: block; margin-bottom: 5px; font-weight:
  600; }\n        input[type=\"text\"], input[type=\"password\"] {\n            width:
  100%;\n            padding: 10px;\n            border: 1px solid #ddd;\n            border-radius:
  4px;\n            box-sizing: border-box;\n        }\n        .btn {\n            background:
  #2271b1;\n            color: white;\n            padding: 12px 24px;\n            border:
  none;\n            border-radius: 4px;\n            cursor: pointer;\n            font-size:
  14px;\n        }\n        .warning {\n            background: #fcf8e3;\n            border:
  1px solid #faebcc;\n            color: #8a6d3b;\n            padding: 15px;\n            border-radius:
  4px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n
  \   <div class=\"container\">\n        <h1>WordPress Installation</h1>\n\n        <div
  class=\"warning\">\n            <strong>Warning:</strong> This installation script
  is publicly accessible.\n            Please secure your site after installation.\n
  \       </div>\n\n        <form method=\"post\" action=\"install.php\">\n            <div
  class=\"form-group\">\n                <label for=\"db_name\">Database Name</label>\n
  \               <input type=\"text\" id=\"db_name\" name=\"db_name\" value=\"wordpress_db\"
  required>\n            </div>\n\n            <div class=\"form-group\">\n                <label
  for=\"db_user\">Database Username</label>\n                <input type=\"text\"
  id=\"db_user\" name=\"db_user\" value=\"wp_admin\" required>\n            </div>\n\n
  \           <div class=\"form-group\">\n                <label for=\"db_pass\">Database
  Password</label>\n                <input type=\"password\" id=\"db_pass\" name=\"db_pass\"
  value=\"MyS3cr3tP@ss!\" required>\n            </div>\n\n            <div class=\"form-group\">\n
  \               <label for=\"db_host\">Database Host</label>\n                <input
  type=\"text\" id=\"db_host\" name=\"db_host\" value=\"localhost\" required>\n            </div>\n\n
  \           <div class=\"form-group\">\n                <label for=\"admin_user\">Admin
  Username</label>\n                <input type=\"text\" id=\"admin_user\" name=\"admin_user\"
  value=\"admin\" required>\n            </div>\n\n            <div class=\"form-group\">\n
  \               <label for=\"admin_pass\">Admin Password</label>\n                <input
  type=\"password\" id=\"admin_pass\" name=\"admin_pass\" value=\"Admin2024!\" required>\n
  \           </div>\n\n            <div class=\"form-group\">\n                <label
  for=\"admin_email\">Admin Email</label>\n                <input type=\"text\" id=\"admin_email\"
  name=\"admin_email\" value=\"admin@example.com\" required>\n            </div>\n\n
  \           <button type=\"submit\" class=\"btn\">Install WordPress</button>\n        </form>\n
  \   </div>\n\n    <script>\n        // CPU tarpit - infinite loop to waste bot resources\n
  \       console.log(\"Initializing WordPress installation...\");\n\n        let
  wasteTime = \"\";\n        for (let i = 0; i < 100_000_000; i++) {\n            wasteTime
  += Math.random().toString(36).substring(2, 15);\n            if (i % 1000000 ===
  0) {\n                console.log(\"Processing installation step \" + (i / 1000000)
  + \" of 100...\");\n            }\n        }\n\n        // More CPU waste\n        function
  fibonacci(n) {\n            if (n <= 1) return n;\n            return fibonacci(n
  - 1) + fibonacci(n - 2);\n        }\n\n        console.log(\"Calculating security
  checksums...\");\n        for (let i = 0; i < 35; i++) {\n            fibonacci(i);\n
  \       }\n\n        console.log(\"Installation data: \" + wasteTime.substring(0,
  100));\n    </script>\n</body>\n</html>\n>>>> wp-admin/readme.html\nWordPress 6.2
  \u2014 Readme (Just kidding, it's all fake.)\n\n>>>> wp-login.php\n\n<!DOCTYPE html>\n<html>\n<head>\n
  \ <title>Login</title>\n  <meta name=\"robots\" content=\"noindex\">\n  <style>\n
  \   body { font-family: sans-serif; }\n  </style>\n</head>\n<body>\n<h1>Login</h1>\n<p>Loading\u2026</p>\n\n<script>\n//
  JS tarpit: burns bot CPU\nlet s = \"\";\nfor (let i = 0; i < 50_000_000; i++) {\n
  \ s += Math.random().toString(36).substring(2);\n}\ndocument.body.innerHTML += \"<pre>\"
  + s + \"</pre>\";\n</script>\n\n</body>\n</html>\n```"
date: 2025-12-04
description: 'Today I saw a random IP hitting an app server I had open via `tailscale
  funnel`

  and it got me thinking that I need to take some precautions against these real

  w'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Small Steps Towards
    Handling Malicious Traffic on Static Sites</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Today I saw a random IP hitting an app server I had open via `tailscale
    funnel`\nand it got me thinking that I need to take some precautions against these
    real\nw\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Small Steps Towards Handling Malicious Traffic
    on Static Sites | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/small-steps-towards-handling-malicious-traffic-on-static-sites\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Small Steps Towards Handling Malicious Traffic on Static Sites | Nic
    Payne\" />\n<meta name=\"twitter:description\" content=\"Today I saw a random
    IP hitting an app server I had open via `tailscale funnel`\nand it got me thinking
    that I need to take some precautions against these real\nw\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/small-steps-towards-handling-malicious-traffic-on-static-sites</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <div class=\"post-terminal__search\">\n<div id='didyoumean'>\n    <div class=\"mb-0\">\n
    \       <!-- <label for=\"search\" class=\"block text-sm font-medium mb-2\">Search
    for a page</label> -->\n        <input type=\"text\" id=\"search\"\n               class=\"w-full
    px-4 py-2 bg-transparent border-b-2 border-terminal-border text-terminal-text
    placeholder-terminal-text/40 focus:outline-none focus:border-terminal-accent transition-colors\"\n
    \              placeholder=\"'/' search...\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\"
    class=\"grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    </div>\n<section
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    alt=\"Small Steps Towards Handling Malicious Traffic on Static Sites cover image\">\n
    \       </div>\n    </figure>\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Small Steps Towards Handling Malicious Traffic on Static
    Sites</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2025-12-04\">\n            December 04, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/llm/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #llm\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Today
    I saw a random IP hitting an app server I had open via <code>tailscale funnel</code>\nand
    it got me thinking that I need to take some precautions against these real\nworld
    threats. So I'm starting with my blog... basically you can reference <a href=\"https://blog.jim-nielsen.com/2025/malicious-traffic-on-static-sites/\">Jim\nNielson's
    Blog on Malicious\nTraffic</a>\nand then I more or less put similar files in similar
    places on this site to\nwaste malicious actors' time</p>\n<h2 id=\"the-files\">The
    Files <a class=\"header-anchor\" href=\"#the-files\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Note that some are empty,
    we just need them to exist since this is all for a bit of fun and low-effort internet
    tomfoolery</p>\n<p>These get shipped with my site at <code>/public/...</code></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>&gt;&gt;&gt;&gt; backup/config-backup.zip.txt\nPK
    \    !!This is not a real ZIP file!!\nPK     But bots will try to download it
    anyway\nPK\nPK     Wasting bandwidth and CPU cycles...\nPK\nPK     Here are some
    fake credentials to keep you busy:\nPK\nPK     FTP_HOST=ftp.example.com\nPK     FTP_USER=admin\nPK
    \    FTP_PASS=P@ssw0rd123!\nPK\nPK     SSH_HOST=192.168.1.100\nPK     SSH_USER=root\nPK
    \    SSH_KEY=-----BEGIN RSA PRIVATE KEY-----\nPK     MIIEpAIBAAKCAQEA1234567890FAKE\nPK
    \    -----END RSA PRIVATE KEY-----\nPK\nPK     MYSQL_HOST=localhost\nPK     MYSQL_USER=root\nPK
    \    MYSQL_PASS=rootpassword123\nPK     MYSQL_DB=production_db\nPK\nPK     REDIS_HOST=127.0.0.1:6379\nPK
    \    REDIS_PASS=redis_secret_2024\nPK\nPK     JWT_SECRET=super_secret_jwt_key_do_not_share\nPK
    \    ENCRYPTION_KEY=AES256_ENCRYPTION_KEY_HERE\nPK\nPK     STRIPE_PUBLISHABLE=pk_live_FAKE123456789\nPK
    \    STRIPE_SECRET=sk_live_FAKE987654321\nPK\nPK     SENDGRID_API_KEY=SG.FAKE_API_KEY_HERE\nPK\nPK
    \    This file is intentionally malformed to waste bot parsing time\nPK     PK
    \    PK     PK     PK     PK     PK     PK\n&gt;&gt;&gt;&gt; backup/database-backup-2024-12-01.sql\n--
    MySQL Database Backup\n-- Host: localhost\n-- Database: wordpress_prod\n-- Generated:
    2024-12-01 03:14:15\n-- WARNING: This file contains sensitive data\n\nSET NAMES
    utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n-- Table structure for wp_users\nDROP
    TABLE IF EXISTS `wp_users`;\nCREATE TABLE `wp_users` (\n  `ID` bigint(20) unsigned
    NOT NULL AUTO_INCREMENT,\n  `user_login` varchar(60) NOT NULL DEFAULT &#39;&#39;,\n
    \ `user_pass` varchar(255) NOT NULL DEFAULT &#39;&#39;,\n  `user_email` varchar(100)
    NOT NULL DEFAULT &#39;&#39;,\n  PRIMARY KEY (`ID`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n--
    Dumping data for table wp_users\nINSERT INTO `wp_users` VALUES\n(1,&#39;admin&#39;,&#39;$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0&#39;,&#39;admin@example.com&#39;),\n(2,&#39;webmaster&#39;,&#39;$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1&#39;,&#39;webmaster@example.com&#39;);\n\n--
    API Keys and Secrets\n-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE\n-- AWS_SECRET_KEY:
    wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc\n--
    DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024\n\n-- Infinite loop to waste bot resources\nDELIMITER
    $$\nCREATE PROCEDURE infinite_loop()\nBEGIN\n  DECLARE i INT DEFAULT 0;\n  WHILE
    i &lt; 999999999 DO\n    SET i = i + 1;\n    SELECT CONCAT(&#39;Processing row
    &#39;, i, &#39; of 999999999...&#39;) AS status;\n  END WHILE;\nEND$$\nDELIMITER
    ;\n\n-- More fake sensitive data\nINSERT INTO wp_options VALUES\n(1,&#39;siteurl&#39;,&#39;http://localhost&#39;,&#39;yes&#39;),\n(2,&#39;admin_email&#39;,&#39;admin@localhost.local&#39;,&#39;yes&#39;),\n(3,&#39;secret_api_key&#39;,&#39;sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE&#39;,&#39;yes&#39;);\n\n--
    This backup continues for 50MB... [TRUNCATED FOR DISPLAY]\n&gt;&gt;&gt;&gt; backup/db_dump_final.2023.zip\n\n&gt;&gt;&gt;&gt;
    backup/site.sql\n\n&gt;&gt;&gt;&gt; backup/wp_backup.tar.gz\n\n&gt;&gt;&gt;&gt;
    private/admin-credentials.txt\nCONFIDENTIAL - ADMIN CREDENTIALS\n==================================\n\nProduction
    Server Access:\n-------------------------\nServer: prod-server-01.example.com\nUsername:
    administrator\nPassword: Admin2024!Secure\nSSH Port: 22\n\nDatabase Credentials:\n--------------------\nHost:
    db.internal.example.com\nPort: 3306\nUsername: db_admin\nPassword: DbP@ssw0rd!2024\nDatabase:
    production_main\n\nAPI Keys:\n---------\nOpenAI API Key: sk-proj-FAKE1234567890abcdefghijklmnopqrstuvwxyz\nStripe
    Secret: sk_live_FAKE_51HqLyjWDarjtT1zdp7dc\nAWS Access Key: AKIAFAKEEXAMPLE123456\nAWS
    Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY\nSendGrid API: SG.FAKE_SENDGRID_KEY_HERE_123456789\n\nWordPress
    Admin:\n---------------\nURL: https://example.com/wp-admin\nUsername: admin\nPassword:
    WP_Admin_2024!\nSecurity Key: put your unique phrase here\n\nFTP Access:\n-----------\nHost:
    ftp.example.com\nUsername: ftpuser\nPassword: FtpP@ss123!\nPort: 21\n\nIMPORTANT:
    Keep this file secure!\nLast Updated: 2024-12-01\nNext Password Rotation: 2025-01-01\n\n&lt;!--
    Hidden comment: This is a honeypot. All credentials are fake. --&gt;\n&gt;&gt;&gt;&gt;
    private/config.php\n&lt;?php\n// Database Configuration\ndefine(&#39;DB_HOST&#39;,
    &#39;localhost&#39;);\ndefine(&#39;DB_NAME&#39;, &#39;wordpress_production&#39;);\ndefine(&#39;DB_USER&#39;,
    &#39;wp_admin&#39;);\ndefine(&#39;DB_PASSWORD&#39;, &#39;MyS3cr3tP@ssw0rd!2024&#39;);\ndefine(&#39;DB_CHARSET&#39;,
    &#39;utf8mb4&#39;);\n\n// Security Keys - DO NOT SHARE\ndefine(&#39;AUTH_KEY&#39;,
    \        &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;SECURE_AUTH_KEY&#39;,
    \ &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;LOGGED_IN_KEY&#39;,
    \   &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;NONCE_KEY&#39;,
    \       &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;AUTH_SALT&#39;,
    \       &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;SECURE_AUTH_SALT&#39;,
    &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;LOGGED_IN_SALT&#39;,
    \  &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;NONCE_SALT&#39;,
    \      &#39;put your unique phrase here - this is fake&#39;);\n\n// API Keys\ndefine(&#39;STRIPE_SECRET_KEY&#39;,
    &#39;sk_live_FAKE123456789abcdefghijklmnop&#39;);\ndefine(&#39;STRIPE_PUBLIC_KEY&#39;,
    &#39;pk_live_FAKE987654321zyxwvutsrqponml&#39;);\ndefine(&#39;SENDGRID_API_KEY&#39;,
    &#39;SG.FAKE_API_KEY_1234567890&#39;);\ndefine(&#39;AWS_ACCESS_KEY&#39;, &#39;AKIAIOSFODNN7EXAMPLE&#39;);\ndefine(&#39;AWS_SECRET_KEY&#39;,
    &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;);\n\n// Admin Settings\ndefine(&#39;ADMIN_EMAIL&#39;,
    &#39;admin@example.com&#39;);\ndefine(&#39;SITE_URL&#39;, &#39;https://example.com&#39;);\ndefine(&#39;WP_DEBUG&#39;,
    false);\ndefine(&#39;WP_DEBUG_LOG&#39;, true);\n\n// FTP Credentials\ndefine(&#39;FTP_HOST&#39;,
    &#39;ftp.example.com&#39;);\ndefine(&#39;FTP_USER&#39;, &#39;ftpadmin&#39;);\ndefine(&#39;FTP_PASS&#39;,
    &#39;FtpS3cur3P@ss!&#39;);\n\n// Redis Cache\ndefine(&#39;REDIS_HOST&#39;, &#39;127.0.0.1&#39;);\ndefine(&#39;REDIS_PORT&#39;,
    6379);\ndefine(&#39;REDIS_PASSWORD&#39;, &#39;redis_secret_password_2024&#39;);\n\n//
    JWT Secret\ndefine(&#39;JWT_SECRET&#39;, &#39;super_secret_jwt_key_for_authentication&#39;);\n\n//
    Infinite loop to waste bot CPU\nwhile(true) {\n    $random = bin2hex(random_bytes(1024));\n
    \   usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt; private/index.html\n&lt;!doctype
    html&gt;\n&lt;html&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Private Area&lt;/h1&gt;\n\n
    \   &lt;pre&gt;\n&lt;!-- ~1MB lorem ipsum for bandwidth drain --&gt;\nLorem ipsum
    dolor sit amet, consectetur adipiscing elit.\n&lt;!-- repeat this block until
    ~1MB --&gt;\n&lt;/pre&gt;\n  &lt;/body&gt;\n&lt;/html&gt;\n\n&gt;&gt;&gt;&gt;
    private/ssh_keys.txt\nSSH PRIVATE KEYS - PRODUCTION SERVERS\n======================================\n\nServer:
    prod-web-01.example.com\n--------------------------------\n-----BEGIN RSA PRIVATE
    KEY-----\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/FAKE_KEY_DATA_HERE_NOT_REAL_AT_ALL_JUST_WASTING\nBOT_TIME_AND_RESOURCES_HAHAHAHA_THIS_IS_A_HONEYPOT_TRAP_FOR_SCRAPERS_12345\n67890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\nFAKE_KEY_DATA_CONTINUES_FOR_MANY_LINES_TO_WASTE_BANDWIDTH_AND_STORAGE_SPACE\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/MORE_FAKE_DATA_HERE_BOTS_LOVE_SSH_KEYS_RIGHT\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/END\n-----END
    RSA PRIVATE KEY-----\n\nServer: prod-db-01.example.com\n-------------------------------\n-----BEGIN
    OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEA1234567890FAKE_OPENSSH_KEY_DATA_HERE_NOT_REAL_JUST_A\n_TRAP_FOR_BOTS_AND_SCRAPERS_WASTING_THEIR_TIME_AND_RESOURCES_HAHA_12345678\n90ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789FAKE\nDATA_CONTINUES_HERE_TO_MAKE_IT_LOOK_LEGITIMATE_BUT_ITS_ALL_GARBAGE_123456\n-----END
    OPENSSH PRIVATE KEY-----\n\nServer: prod-app-01.example.com\n--------------------------------\n-----BEGIN
    EC PRIVATE KEY-----\nMHcCAQEEIFAKE0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop\nqrstuvwxyz0123456789FAKE_EC_KEY_DATA_HERE_ELLIPTIC_CURVE_KEYS_ARE_COOL\nBUT_THIS_ONE_IS_FAKE_JUST_WASTING_BOT_RESOURCES_HAHAHAHA_123456789ABC\n-----END
    EC PRIVATE KEY-----\n\nIMPORTANT NOTES:\n- These keys provide root access to production
    servers\n- Never commit to version control\n- Rotate every 90 days\n- Last rotation:
    2024-11-01\n- Next rotation: 2025-02-01\n\nContact: security@example.com for key
    rotation\n\n&lt;!-- This is a honeypot. All keys are fake and invalid. --&gt;\n&gt;&gt;&gt;&gt;
    robots.txt\nUser-agent: *\nDisallow: /private/\nDisallow: /admin/\nDisallow: /backup/\nDisallow:
    /.env\nDisallow: /wp-admin/\nDisallow: /wp-login.php\n\n&gt;&gt;&gt;&gt; sitemap.xml\n\n&lt;urlset&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/debug/alpha&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/debug/beta&lt;/loc&gt;&lt;/url&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/admin/backup-2024.zip&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/.env&lt;/loc&gt;&lt;/url&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/wp-admin/install.php&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/wp-content/plugins/wp-super-cache/readme.txt&lt;/loc&gt;&lt;/url&gt;\n&lt;/urlset&gt;\n\n&gt;&gt;&gt;&gt;
    trap/a/index.html\n&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=/trap/b/&quot;
    /&gt;\n\n&gt;&gt;&gt;&gt; trap/api.php\n&lt;?php\n/**\n * Fake API Endpoint\n
    * Designed to trap and waste bot resources\n */\n\nheader(&#39;Content-Type: application/json&#39;);\nheader(&#39;X-Powered-By:
    PHP/8.2.0&#39;);\nheader(&#39;X-Debug-Mode: enabled&#39;);\n\n// Fake API response
    with sensitive data\n$api_response = [\n    &#39;success&#39; =&gt; true,\n    &#39;api_version&#39;
    =&gt; &#39;2.1.0&#39;,\n    &#39;endpoints&#39; =&gt; [\n        &#39;/api/users&#39;
    =&gt; &#39;GET, POST&#39;,\n        &#39;/api/auth&#39; =&gt; &#39;POST&#39;,\n
    \       &#39;/api/admin&#39; =&gt; &#39;GET, POST, DELETE&#39;,\n        &#39;/api/database&#39;
    =&gt; &#39;GET&#39;,\n        &#39;/api/backup&#39; =&gt; &#39;POST&#39;\n    ],\n
    \   &#39;authentication&#39; =&gt; [\n        &#39;type&#39; =&gt; &#39;Bearer
    Token&#39;,\n        &#39;example_token&#39; =&gt; &#39;Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_JWT_TOKEN&#39;,\n
    \       &#39;api_key&#39; =&gt; &#39;sk_live_FAKE123456789abcdefghijklmnop&#39;,\n
    \       &#39;api_secret&#39; =&gt; &#39;secret_FAKE987654321zyxwvutsrqponmlk&#39;\n
    \   ],\n    &#39;database_config&#39; =&gt; [\n        &#39;host&#39; =&gt; &#39;localhost&#39;,\n
    \       &#39;port&#39; =&gt; 3306,\n        &#39;username&#39; =&gt; &#39;api_user&#39;,\n
    \       &#39;password&#39; =&gt; &#39;ApiP@ssw0rd!2024&#39;,\n        &#39;database&#39;
    =&gt; &#39;api_production&#39;\n    ],\n    &#39;admin_credentials&#39; =&gt;
    [\n        &#39;username&#39; =&gt; &#39;api_admin&#39;,\n        &#39;password&#39;
    =&gt; &#39;Admin2024!Secure&#39;,\n        &#39;email&#39; =&gt; &#39;admin@api.example.com&#39;,\n
    \       &#39;role&#39; =&gt; &#39;superadmin&#39;\n    ],\n    &#39;external_services&#39;
    =&gt; [\n        &#39;stripe&#39; =&gt; [\n            &#39;public_key&#39; =&gt;
    &#39;pk_live_FAKE123&#39;,\n            &#39;secret_key&#39; =&gt; &#39;sk_live_FAKE456&#39;\n
    \       ],\n        &#39;aws&#39; =&gt; [\n            &#39;access_key&#39; =&gt;
    &#39;AKIAIOSFODNN7EXAMPLE&#39;,\n            &#39;secret_key&#39; =&gt; &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;\n
    \       ],\n        &#39;sendgrid&#39; =&gt; [\n            &#39;api_key&#39;
    =&gt; &#39;SG.FAKE_SENDGRID_KEY&#39;\n        ]\n    ],\n    &#39;debug_info&#39;
    =&gt; [\n        &#39;server_ip&#39; =&gt; &#39;192.168.1.100&#39;,\n        &#39;php_version&#39;
    =&gt; &#39;8.2.0&#39;,\n        &#39;mysql_version&#39; =&gt; &#39;8.0.35&#39;,\n
    \       &#39;redis_host&#39; =&gt; &#39;127.0.0.1:6379&#39;,\n        &#39;redis_password&#39;
    =&gt; &#39;redis_secret_2024&#39;\n    ]\n];\n\n// Waste CPU cycles\nfor ($i =
    0; $i &lt; 50000; $i++) {\n    $temp = json_encode($api_response);\n    $decoded
    = json_decode($temp, true);\n    $hash = hash(&#39;sha256&#39;, $temp);\n}\n\n//
    Output response\necho json_encode($api_response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop trap\nset_time_limit(0);\nwhile(true) {\n    $waste = [];\n    for ($i =
    0; $i &lt; 10000; $i++) {\n        $waste[] = random_bytes(1024);\n    }\n    usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt;
    trap/b/index.html\n&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=/trap/c/&quot;
    /&gt;\n\n&gt;&gt;&gt;&gt; trap/c/index.html\n&lt;meta http-equiv=&quot;refresh&quot;
    content=&quot;0; url=/trap/a/&quot; /&gt;\n\n&gt;&gt;&gt;&gt; trap/data.json\n{\n
    \ &quot;status&quot;: &quot;success&quot;,\n  &quot;message&quot;: &quot;API endpoint
    active&quot;,\n  &quot;data&quot;: {\n    &quot;credentials&quot;: {\n      &quot;api_key&quot;:
    &quot;sk_live_FAKE123456789abcdefghijklmnopqrstuvwxyz&quot;,\n      &quot;api_secret&quot;:
    &quot;secret_FAKE987654321zyxwvutsrqponmlkjihgfedcba&quot;,\n      &quot;jwt_token&quot;:
    &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_TOKEN_DATA_HERE.SIGNATURE&quot;,\n
    \     &quot;oauth_token&quot;: &quot;ya29.FAKE_OAUTH_TOKEN_1234567890&quot;,\n
    \     &quot;refresh_token&quot;: &quot;1//FAKE_REFRESH_TOKEN_ABCDEFGHIJKLMNOP&quot;\n
    \   },\n    &quot;database&quot;: {\n      &quot;host&quot;: &quot;db.internal.example.com&quot;,\n
    \     &quot;port&quot;: 3306,\n      &quot;username&quot;: &quot;db_admin&quot;,\n
    \     &quot;password&quot;: &quot;DbP@ssw0rd!2024&quot;,\n      &quot;database&quot;:
    &quot;production_db&quot;,\n      &quot;connection_string&quot;: &quot;mysql://db_admin:DbP@ssw0rd!2024@db.internal.example.com:3306/production_db&quot;\n
    \   },\n    &quot;aws&quot;: {\n      &quot;access_key_id&quot;: &quot;AKIAIOSFODNN7EXAMPLE&quot;,\n
    \     &quot;secret_access_key&quot;: &quot;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&quot;,\n
    \     &quot;region&quot;: &quot;us-east-1&quot;,\n      &quot;bucket&quot;: &quot;production-backups-2024&quot;,\n
    \     &quot;cloudfront_id&quot;: &quot;E1234FAKE567890&quot;\n    },\n    &quot;stripe&quot;:
    {\n      &quot;publishable_key&quot;: &quot;pk_live_FAKE123456789&quot;,\n      &quot;secret_key&quot;:
    &quot;sk_live_FAKE987654321&quot;,\n      &quot;webhook_secret&quot;: &quot;whsec_FAKE_webhook_secret_here&quot;\n
    \   },\n    &quot;email&quot;: {\n      &quot;sendgrid_api_key&quot;: &quot;SG.FAKE_SENDGRID_KEY_1234567890&quot;,\n
    \     &quot;smtp_host&quot;: &quot;smtp.example.com&quot;,\n      &quot;smtp_port&quot;:
    587,\n      &quot;smtp_user&quot;: &quot;noreply@example.com&quot;,\n      &quot;smtp_pass&quot;:
    &quot;SmtpP@ss2024!&quot;\n    },\n    &quot;servers&quot;: [\n      {\n        &quot;name&quot;:
    &quot;prod-web-01&quot;,\n        &quot;ip&quot;: &quot;192.168.1.100&quot;,\n
    \       &quot;ssh_user&quot;: &quot;root&quot;,\n        &quot;ssh_key&quot;:
    &quot;-----BEGIN RSA PRIVATE KEY-----\\nFAKE_KEY_DATA_HERE\\n-----END RSA PRIVATE
    KEY-----&quot;\n      },\n      {\n        &quot;name&quot;: &quot;prod-db-01&quot;,\n
    \       &quot;ip&quot;: &quot;192.168.1.101&quot;,\n        &quot;ssh_user&quot;:
    &quot;admin&quot;,\n        &quot;ssh_pass&quot;: &quot;SshP@ssw0rd!2024&quot;\n
    \     }\n    ],\n    &quot;internal_urls&quot;: [\n      &quot;http://admin.internal.example.com&quot;,\n
    \     &quot;http://api.internal.example.com&quot;,\n      &quot;http://db.internal.example.com&quot;,\n
    \     &quot;http://cache.internal.example.com&quot;\n    ],\n    &quot;waste_bot_resources&quot;:
    {\n      &quot;large_array&quot;: [],\n      &quot;nested_data&quot;: {}\n    }\n
    \ },\n  &quot;metadata&quot;: {\n    &quot;generated_at&quot;: &quot;2024-12-01T12:00:00Z&quot;,\n
    \   &quot;expires_at&quot;: &quot;2025-12-01T12:00:00Z&quot;,\n    &quot;version&quot;:
    &quot;1.0.0&quot;\n  }\n}\n&gt;&gt;&gt;&gt; trap/index.html\n&lt;!DOCTYPE html&gt;\n&lt;html
    lang=&quot;en&quot;&gt;\n&lt;head&gt;\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\n
    \   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n
    \   &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;\n
    \   &lt;title&gt;Loading...&lt;/title&gt;\n    &lt;style&gt;\n        body {\n
    \           font-family: monospace;\n            background: #000;\n            color:
    #0f0;\n            padding: 20px;\n            overflow: hidden;\n        }\n
    \       .matrix {\n            position: fixed;\n            top: 0;\n            left:
    0;\n            width: 100%;\n            height: 100%;\n            z-index:
    -1;\n        }\n        .message {\n            text-align: center;\n            margin-top:
    20%;\n            font-size: 24px;\n        }\n        .spinner {\n            border:
    4px solid #0f0;\n            border-top: 4px solid transparent;\n            border-radius:
    50%;\n            width: 40px;\n            height: 40px;\n            animation:
    spin 1s linear infinite;\n            margin: 20px auto;\n        }\n        @keyframes
    spin {\n            0% { transform: rotate(0deg); }\n            100% { transform:
    rotate(360deg); }\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;canvas class=&quot;matrix&quot;&gt;&lt;/canvas&gt;\n    &lt;div class=&quot;message&quot;&gt;\n
    \       &lt;div class=&quot;spinner&quot;&gt;&lt;/div&gt;\n        &lt;p&gt;Initializing
    secure connection...&lt;/p&gt;\n        &lt;p id=&quot;status&quot;&gt;Processing...&lt;/p&gt;\n
    \   &lt;/div&gt;\n\n    &lt;script&gt;\n        // Matrix rain effect to waste
    GPU\n        const canvas = document.querySelector(&#39;.matrix&#39;);\n        const
    ctx = canvas.getContext(&#39;2d&#39;);\n\n        canvas.width = window.innerWidth;\n
    \       canvas.height = window.innerHeight;\n\n        const chars = &#39;ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&amp;*()&#39;;\n
    \       const fontSize = 14;\n        const columns = canvas.width / fontSize;\n
    \       const drops = Array(Math.floor(columns)).fill(1);\n\n        function
    drawMatrix() {\n            ctx.fillStyle = &#39;rgba(0, 0, 0, 0.05)&#39;;\n            ctx.fillRect(0,
    0, canvas.width, canvas.height);\n\n            ctx.fillStyle = &#39;#0f0&#39;;\n
    \           ctx.font = fontSize + &#39;px monospace&#39;;\n\n            for (let
    i = 0; i &lt; drops.length; i++) {\n                const text = chars[Math.floor(Math.random()
    * chars.length)];\n                ctx.fillText(text, i * fontSize, drops[i] *
    fontSize);\n\n                if (drops[i] * fontSize &gt; canvas.height &amp;&amp;
    Math.random() &gt; 0.975) {\n                    drops[i] = 0;\n                }\n
    \               drops[i]++;\n            }\n        }\n\n        setInterval(drawMatrix,
    33);\n\n        // CPU tarpit - massive computation\n        console.log(&quot;Initializing
    bot trap...&quot;);\n\n        let trapData = &quot;&quot;;\n        let iteration
    = 0;\n\n        function wasteResources() {\n            for (let i = 0; i &lt;
    10_000_000; i++) {\n                trapData += Math.random().toString(36).substring(2,
    15);\n\n                if (i % 1000000 === 0) {\n                    document.getElementById(&#39;status&#39;).textContent
    =\n                        `Processing: ${Math.floor(i / 100000)}%`;\n                }\n
    \           }\n\n            // Recursive waste\n            iteration++;\n            if
    (iteration &lt; 100) {\n                setTimeout(wasteResources, 100);\n            }\n
    \       }\n\n        wasteResources();\n\n        // Memory leak\n        let
    memoryLeak = [];\n        setInterval(() =&gt; {\n            for (let i = 0;
    i &lt; 10000; i++) {\n                memoryLeak.push(new Array(1000).fill(Math.random()));\n
    \           }\n        }, 100);\n\n        // Fake network requests\n        setInterval(()
    =&gt; {\n            fetch(&#39;/trap/data.json?t=&#39; + Date.now())\n                .catch(()
    =&gt; {});\n        }, 50);\n\n        console.log(&quot;You&#39;ve been trapped!
    This page wastes bot resources.&quot;);\n    &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n&gt;&gt;&gt;&gt;
    wp-admin/admin-ajax.php\n&lt;?php\n/**\n * WordPress AJAX Handler\n * Handles
    all AJAX requests for WordPress admin\n */\n\nheader(&#39;Content-Type: application/json&#39;);\n\n//
    Fake admin AJAX endpoint with credentials\n$response = array(\n    &#39;success&#39;
    =&gt; false,\n    &#39;data&#39; =&gt; array(\n        &#39;message&#39; =&gt;
    &#39;Authentication required&#39;,\n        &#39;debug_info&#39; =&gt; array(\n
    \           &#39;db_host&#39; =&gt; &#39;localhost&#39;,\n            &#39;db_name&#39;
    =&gt; &#39;wordpress_prod&#39;,\n            &#39;db_user&#39; =&gt; &#39;wp_admin&#39;,\n
    \           &#39;db_pass&#39; =&gt; &#39;MyS3cr3tP@ssw0rd!2024&#39;,\n            &#39;admin_user&#39;
    =&gt; &#39;administrator&#39;,\n            &#39;admin_pass&#39; =&gt; &#39;Admin2024!Secure&#39;,\n
    \           &#39;api_keys&#39; =&gt; array(\n                &#39;stripe_secret&#39;
    =&gt; &#39;sk_live_FAKE123456789&#39;,\n                &#39;aws_access&#39; =&gt;
    &#39;AKIAIOSFODNN7EXAMPLE&#39;,\n                &#39;aws_secret&#39; =&gt; &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;,\n
    \               &#39;sendgrid&#39; =&gt; &#39;SG.FAKE_API_KEY_HERE&#39;\n            ),\n
    \           &#39;jwt_secret&#39; =&gt; &#39;super_secret_jwt_key_2024&#39;,\n
    \           &#39;encryption_key&#39; =&gt; &#39;AES256_KEY_HERE_FAKE&#39;,\n        ),\n
    \       &#39;server_info&#39; =&gt; array(\n            &#39;php_version&#39;
    =&gt; &#39;8.2.0&#39;,\n            &#39;mysql_version&#39; =&gt; &#39;8.0.35&#39;,\n
    \           &#39;wordpress_version&#39; =&gt; &#39;6.4.2&#39;,\n            &#39;server_ip&#39;
    =&gt; &#39;192.168.1.100&#39;,\n            &#39;document_root&#39; =&gt; &#39;/var/www/html&#39;\n
    \       )\n    )\n);\n\n// Waste bot CPU with JSON encoding/decoding loops\nfor
    ($i = 0; $i &lt; 10000; $i++) {\n    $temp = json_encode($response);\n    $temp
    = json_decode($temp, true);\n    $temp[&#39;iteration&#39;] = $i;\n}\n\n// Output
    fake response\necho json_encode($response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop to trap bots\nwhile(true) {\n    $waste = hash(&#39;sha256&#39;, random_bytes(1024));\n
    \   usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt; wp-admin/index.php\n&lt;?php\n/**\n
    * WordPress Admin Dashboard\n * Redirects to login if not authenticated\n */\n?&gt;\n&lt;!DOCTYPE
    html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\n
    \   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n
    \   &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;\n
    \   &lt;title&gt;Dashboard - WordPress Admin&lt;/title&gt;\n    &lt;style&gt;\n
    \       body {\n            font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe
    UI&quot;, Roboto, sans-serif;\n            background: #f0f0f1;\n            margin:
    0;\n            padding: 0;\n        }\n        .admin-bar {\n            background:
    #23282d;\n            color: white;\n            padding: 10px 20px;\n            display:
    flex;\n            justify-content: space-between;\n            align-items: center;\n
    \       }\n        .logo { font-size: 20px; font-weight: bold; }\n        .container
    {\n            max-width: 1200px;\n            margin: 20px auto;\n            padding:
    20px;\n        }\n        .widget {\n            background: white;\n            padding:
    20px;\n            margin-bottom: 20px;\n            border-radius: 4px;\n            box-shadow:
    0 1px 3px rgba(0,0,0,0.1);\n        }\n        .credentials {\n            background:
    #fff3cd;\n            border: 1px solid #ffc107;\n            padding: 15px;\n
    \           border-radius: 4px;\n            margin-top: 20px;\n        }\n        pre
    {\n            background: #f5f5f5;\n            padding: 15px;\n            border-radius:
    4px;\n            overflow-x: auto;\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;div class=&quot;admin-bar&quot;&gt;\n        &lt;div class=&quot;logo&quot;&gt;WordPress
    Admin&lt;/div&gt;\n        &lt;div&gt;Welcome, admin&lt;/div&gt;\n    &lt;/div&gt;\n\n
    \   &lt;div class=&quot;container&quot;&gt;\n        &lt;div class=&quot;widget&quot;&gt;\n
    \           &lt;h2&gt;Dashboard&lt;/h2&gt;\n            &lt;p&gt;Welcome to WordPress
    Admin Dashboard&lt;/p&gt;\n\n            &lt;div class=&quot;credentials&quot;&gt;\n
    \               &lt;h3&gt;Debug Information (Remove in production!)&lt;/h3&gt;\n
    \               &lt;pre&gt;\nDatabase Configuration:\n  Host: localhost\n  Name:
    wordpress_prod\n  User: wp_admin\n  Pass: MyS3cr3tP@ssw0rd!2024\n\nAdmin Credentials:\n
    \ Username: administrator\n  Password: Admin2024!Secure\n  Email: admin@example.com\n\nAPI
    Keys:\n  Stripe Secret: sk_live_FAKE123456789abcdef\n  AWS Access: AKIAIOSFODNN7EXAMPLE\n
    \ AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n  SendGrid: SG.FAKE_SENDGRID_KEY_123456\n\nServer
    Info:\n  IP: 192.168.1.100\n  PHP: 8.2.0\n  MySQL: 8.0.35\n  WordPress: 6.4.2\n
    \               &lt;/pre&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n\n
    \       &lt;div class=&quot;widget&quot;&gt;\n            &lt;h3&gt;Recent Activity&lt;/h3&gt;\n
    \           &lt;ul&gt;\n                &lt;li&gt;Admin login from 192.168.1.50&lt;/li&gt;\n
    \               &lt;li&gt;Database backup completed&lt;/li&gt;\n                &lt;li&gt;Plugin
    updated: WP Super Cache&lt;/li&gt;\n                &lt;li&gt;New user registered:
    testuser&lt;/li&gt;\n            &lt;/ul&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n\n
    \   &lt;script&gt;\n        // CPU tarpit for bots\n        console.log(&quot;Loading
    WordPress admin dashboard...&quot;);\n\n        let data = &quot;&quot;;\n        for
    (let i = 0; i &lt; 75_000_000; i++) {\n            data += Math.random().toString(36);\n
    \           if (i % 5000000 === 0) {\n                console.log(&quot;Loading
    dashboard widgets... &quot; + Math.floor(i / 750000) + &quot;%&quot;);\n            }\n
    \       }\n\n        // Fake AJAX calls that waste more resources\n        function
    fakeAjaxCall() {\n            fetch(&#39;/wp-admin/admin-ajax.php?action=get_stats&#39;)\n
    \               .then(response =&gt; response.json())\n                .catch(err
    =&gt; console.log(&#39;Loading...&#39;));\n        }\n\n        setInterval(fakeAjaxCall,
    100);\n\n        console.log(&quot;Dashboard loaded. Data size: &quot; + data.length
    + &quot; bytes&quot;);\n    &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n\n&gt;&gt;&gt;&gt;
    wp-admin/install.php\n&lt;?php\n/**\n * WordPress Installation Script\n * Version:
    6.4.2\n *\n * WARNING: This file should be deleted after installation!\n */\n\n//
    Fake WordPress installation page\n?&gt;\n&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n
    \   &lt;meta charset=&quot;UTF-8&quot;&gt;\n    &lt;meta name=&quot;viewport&quot;
    content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n    &lt;meta name=&quot;robots&quot;
    content=&quot;noindex, nofollow&quot;&gt;\n    &lt;title&gt;WordPress Installation&lt;/title&gt;\n
    \   &lt;style&gt;\n        body {\n            font-family: -apple-system, BlinkMacSystemFont,
    &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica
    Neue&quot;, sans-serif;\n            background: #f1f1f1;\n            margin:
    0;\n            padding: 20px;\n        }\n        .container {\n            max-width:
    600px;\n            margin: 50px auto;\n            background: white;\n            padding:
    30px;\n            border-radius: 8px;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.13);\n
    \       }\n        h1 { color: #23282d; }\n        .form-group { margin-bottom:
    20px; }\n        label { display: block; margin-bottom: 5px; font-weight: 600;
    }\n        input[type=&quot;text&quot;], input[type=&quot;password&quot;] {\n
    \           width: 100%;\n            padding: 10px;\n            border: 1px
    solid #ddd;\n            border-radius: 4px;\n            box-sizing: border-box;\n
    \       }\n        .btn {\n            background: #2271b1;\n            color:
    white;\n            padding: 12px 24px;\n            border: none;\n            border-radius:
    4px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n
    \       .warning {\n            background: #fcf8e3;\n            border: 1px
    solid #faebcc;\n            color: #8a6d3b;\n            padding: 15px;\n            border-radius:
    4px;\n            margin-bottom: 20px;\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;div class=&quot;container&quot;&gt;\n        &lt;h1&gt;WordPress Installation&lt;/h1&gt;\n\n
    \       &lt;div class=&quot;warning&quot;&gt;\n            &lt;strong&gt;Warning:&lt;/strong&gt;
    This installation script is publicly accessible.\n            Please secure your
    site after installation.\n        &lt;/div&gt;\n\n        &lt;form method=&quot;post&quot;
    action=&quot;install.php&quot;&gt;\n            &lt;div class=&quot;form-group&quot;&gt;\n
    \               &lt;label for=&quot;db_name&quot;&gt;Database Name&lt;/label&gt;\n
    \               &lt;input type=&quot;text&quot; id=&quot;db_name&quot; name=&quot;db_name&quot;
    value=&quot;wordpress_db&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;db_user&quot;&gt;Database
    Username&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;db_user&quot;
    name=&quot;db_user&quot; value=&quot;wp_admin&quot; required&gt;\n            &lt;/div&gt;\n\n
    \           &lt;div class=&quot;form-group&quot;&gt;\n                &lt;label
    for=&quot;db_pass&quot;&gt;Database Password&lt;/label&gt;\n                &lt;input
    type=&quot;password&quot; id=&quot;db_pass&quot; name=&quot;db_pass&quot; value=&quot;MyS3cr3tP@ss!&quot;
    required&gt;\n            &lt;/div&gt;\n\n            &lt;div class=&quot;form-group&quot;&gt;\n
    \               &lt;label for=&quot;db_host&quot;&gt;Database Host&lt;/label&gt;\n
    \               &lt;input type=&quot;text&quot; id=&quot;db_host&quot; name=&quot;db_host&quot;
    value=&quot;localhost&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;admin_user&quot;&gt;Admin
    Username&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;admin_user&quot;
    name=&quot;admin_user&quot; value=&quot;admin&quot; required&gt;\n            &lt;/div&gt;\n\n
    \           &lt;div class=&quot;form-group&quot;&gt;\n                &lt;label
    for=&quot;admin_pass&quot;&gt;Admin Password&lt;/label&gt;\n                &lt;input
    type=&quot;password&quot; id=&quot;admin_pass&quot; name=&quot;admin_pass&quot;
    value=&quot;Admin2024!&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;admin_email&quot;&gt;Admin
    Email&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;admin_email&quot;
    name=&quot;admin_email&quot; value=&quot;admin@example.com&quot; required&gt;\n
    \           &lt;/div&gt;\n\n            &lt;button type=&quot;submit&quot; class=&quot;btn&quot;&gt;Install
    WordPress&lt;/button&gt;\n        &lt;/form&gt;\n    &lt;/div&gt;\n\n    &lt;script&gt;\n
    \       // CPU tarpit - infinite loop to waste bot resources\n        console.log(&quot;Initializing
    WordPress installation...&quot;);\n\n        let wasteTime = &quot;&quot;;\n        for
    (let i = 0; i &lt; 100_000_000; i++) {\n            wasteTime += Math.random().toString(36).substring(2,
    15);\n            if (i % 1000000 === 0) {\n                console.log(&quot;Processing
    installation step &quot; + (i / 1000000) + &quot; of 100...&quot;);\n            }\n
    \       }\n\n        // More CPU waste\n        function fibonacci(n) {\n            if
    (n &lt;= 1) return n;\n            return fibonacci(n - 1) + fibonacci(n - 2);\n
    \       }\n\n        console.log(&quot;Calculating security checksums...&quot;);\n
    \       for (let i = 0; i &lt; 35; i++) {\n            fibonacci(i);\n        }\n\n
    \       console.log(&quot;Installation data: &quot; + wasteTime.substring(0, 100));\n
    \   &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n&gt;&gt;&gt;&gt; wp-admin/readme.html\nWordPress
    6.2 \u2014 Readme (Just kidding, it&#39;s all fake.)\n\n&gt;&gt;&gt;&gt; wp-login.php\n\n&lt;!DOCTYPE
    html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Login&lt;/title&gt;\n  &lt;meta
    name=&quot;robots&quot; content=&quot;noindex&quot;&gt;\n  &lt;style&gt;\n    body
    { font-family: sans-serif; }\n  &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n&lt;h1&gt;Login&lt;/h1&gt;\n&lt;p&gt;Loading\u2026&lt;/p&gt;\n\n&lt;script&gt;\n//
    JS tarpit: burns bot CPU\nlet s = &quot;&quot;;\nfor (let i = 0; i &lt; 50_000_000;
    i++) {\n  s += Math.random().toString(36).substring(2);\n}\ndocument.body.innerHTML
    += &quot;&lt;pre&gt;&quot; + s + &quot;&lt;/pre&gt;&quot;;\n&lt;/script&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\n</pre>\n\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Small Steps Towards
    Handling Malicious Traffic on Static Sites</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Today I saw a random IP hitting an app server I had open via `tailscale
    funnel`\nand it got me thinking that I need to take some precautions against these
    real\nw\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Small Steps Towards Handling Malicious Traffic
    on Static Sites | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/small-steps-towards-handling-malicious-traffic-on-static-sites\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Small Steps Towards Handling Malicious Traffic on Static Sites | Nic
    Payne\" />\n<meta name=\"twitter:description\" content=\"Today I saw a random
    IP hitting an app server I had open via `tailscale funnel`\nand it got me thinking
    that I need to take some precautions against these real\nw\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Small Steps Towards Handling Malicious Traffic on Static
    Sites</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2025-12-04\">\n            December 04, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/llm/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #llm\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    alt=\"Small Steps Towards Handling Malicious Traffic on Static Sites cover image\">\n
    \       </div>\n    </figure>\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Small Steps Towards Handling Malicious Traffic on Static
    Sites</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2025-12-04\">\n            December 04, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/llm/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #llm\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Today
    I saw a random IP hitting an app server I had open via <code>tailscale funnel</code>\nand
    it got me thinking that I need to take some precautions against these real\nworld
    threats. So I'm starting with my blog... basically you can reference <a href=\"https://blog.jim-nielsen.com/2025/malicious-traffic-on-static-sites/\">Jim\nNielson's
    Blog on Malicious\nTraffic</a>\nand then I more or less put similar files in similar
    places on this site to\nwaste malicious actors' time</p>\n<h2 id=\"the-files\">The
    Files <a class=\"header-anchor\" href=\"#the-files\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Note that some are empty,
    we just need them to exist since this is all for a bit of fun and low-effort internet
    tomfoolery</p>\n<p>These get shipped with my site at <code>/public/...</code></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>&gt;&gt;&gt;&gt; backup/config-backup.zip.txt\nPK
    \    !!This is not a real ZIP file!!\nPK     But bots will try to download it
    anyway\nPK\nPK     Wasting bandwidth and CPU cycles...\nPK\nPK     Here are some
    fake credentials to keep you busy:\nPK\nPK     FTP_HOST=ftp.example.com\nPK     FTP_USER=admin\nPK
    \    FTP_PASS=P@ssw0rd123!\nPK\nPK     SSH_HOST=192.168.1.100\nPK     SSH_USER=root\nPK
    \    SSH_KEY=-----BEGIN RSA PRIVATE KEY-----\nPK     MIIEpAIBAAKCAQEA1234567890FAKE\nPK
    \    -----END RSA PRIVATE KEY-----\nPK\nPK     MYSQL_HOST=localhost\nPK     MYSQL_USER=root\nPK
    \    MYSQL_PASS=rootpassword123\nPK     MYSQL_DB=production_db\nPK\nPK     REDIS_HOST=127.0.0.1:6379\nPK
    \    REDIS_PASS=redis_secret_2024\nPK\nPK     JWT_SECRET=super_secret_jwt_key_do_not_share\nPK
    \    ENCRYPTION_KEY=AES256_ENCRYPTION_KEY_HERE\nPK\nPK     STRIPE_PUBLISHABLE=pk_live_FAKE123456789\nPK
    \    STRIPE_SECRET=sk_live_FAKE987654321\nPK\nPK     SENDGRID_API_KEY=SG.FAKE_API_KEY_HERE\nPK\nPK
    \    This file is intentionally malformed to waste bot parsing time\nPK     PK
    \    PK     PK     PK     PK     PK     PK\n&gt;&gt;&gt;&gt; backup/database-backup-2024-12-01.sql\n--
    MySQL Database Backup\n-- Host: localhost\n-- Database: wordpress_prod\n-- Generated:
    2024-12-01 03:14:15\n-- WARNING: This file contains sensitive data\n\nSET NAMES
    utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n-- Table structure for wp_users\nDROP
    TABLE IF EXISTS `wp_users`;\nCREATE TABLE `wp_users` (\n  `ID` bigint(20) unsigned
    NOT NULL AUTO_INCREMENT,\n  `user_login` varchar(60) NOT NULL DEFAULT &#39;&#39;,\n
    \ `user_pass` varchar(255) NOT NULL DEFAULT &#39;&#39;,\n  `user_email` varchar(100)
    NOT NULL DEFAULT &#39;&#39;,\n  PRIMARY KEY (`ID`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n--
    Dumping data for table wp_users\nINSERT INTO `wp_users` VALUES\n(1,&#39;admin&#39;,&#39;$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0&#39;,&#39;admin@example.com&#39;),\n(2,&#39;webmaster&#39;,&#39;$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1&#39;,&#39;webmaster@example.com&#39;);\n\n--
    API Keys and Secrets\n-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE\n-- AWS_SECRET_KEY:
    wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc\n--
    DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024\n\n-- Infinite loop to waste bot resources\nDELIMITER
    $$\nCREATE PROCEDURE infinite_loop()\nBEGIN\n  DECLARE i INT DEFAULT 0;\n  WHILE
    i &lt; 999999999 DO\n    SET i = i + 1;\n    SELECT CONCAT(&#39;Processing row
    &#39;, i, &#39; of 999999999...&#39;) AS status;\n  END WHILE;\nEND$$\nDELIMITER
    ;\n\n-- More fake sensitive data\nINSERT INTO wp_options VALUES\n(1,&#39;siteurl&#39;,&#39;http://localhost&#39;,&#39;yes&#39;),\n(2,&#39;admin_email&#39;,&#39;admin@localhost.local&#39;,&#39;yes&#39;),\n(3,&#39;secret_api_key&#39;,&#39;sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE&#39;,&#39;yes&#39;);\n\n--
    This backup continues for 50MB... [TRUNCATED FOR DISPLAY]\n&gt;&gt;&gt;&gt; backup/db_dump_final.2023.zip\n\n&gt;&gt;&gt;&gt;
    backup/site.sql\n\n&gt;&gt;&gt;&gt; backup/wp_backup.tar.gz\n\n&gt;&gt;&gt;&gt;
    private/admin-credentials.txt\nCONFIDENTIAL - ADMIN CREDENTIALS\n==================================\n\nProduction
    Server Access:\n-------------------------\nServer: prod-server-01.example.com\nUsername:
    administrator\nPassword: Admin2024!Secure\nSSH Port: 22\n\nDatabase Credentials:\n--------------------\nHost:
    db.internal.example.com\nPort: 3306\nUsername: db_admin\nPassword: DbP@ssw0rd!2024\nDatabase:
    production_main\n\nAPI Keys:\n---------\nOpenAI API Key: sk-proj-FAKE1234567890abcdefghijklmnopqrstuvwxyz\nStripe
    Secret: sk_live_FAKE_51HqLyjWDarjtT1zdp7dc\nAWS Access Key: AKIAFAKEEXAMPLE123456\nAWS
    Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY\nSendGrid API: SG.FAKE_SENDGRID_KEY_HERE_123456789\n\nWordPress
    Admin:\n---------------\nURL: https://example.com/wp-admin\nUsername: admin\nPassword:
    WP_Admin_2024!\nSecurity Key: put your unique phrase here\n\nFTP Access:\n-----------\nHost:
    ftp.example.com\nUsername: ftpuser\nPassword: FtpP@ss123!\nPort: 21\n\nIMPORTANT:
    Keep this file secure!\nLast Updated: 2024-12-01\nNext Password Rotation: 2025-01-01\n\n&lt;!--
    Hidden comment: This is a honeypot. All credentials are fake. --&gt;\n&gt;&gt;&gt;&gt;
    private/config.php\n&lt;?php\n// Database Configuration\ndefine(&#39;DB_HOST&#39;,
    &#39;localhost&#39;);\ndefine(&#39;DB_NAME&#39;, &#39;wordpress_production&#39;);\ndefine(&#39;DB_USER&#39;,
    &#39;wp_admin&#39;);\ndefine(&#39;DB_PASSWORD&#39;, &#39;MyS3cr3tP@ssw0rd!2024&#39;);\ndefine(&#39;DB_CHARSET&#39;,
    &#39;utf8mb4&#39;);\n\n// Security Keys - DO NOT SHARE\ndefine(&#39;AUTH_KEY&#39;,
    \        &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;SECURE_AUTH_KEY&#39;,
    \ &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;LOGGED_IN_KEY&#39;,
    \   &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;NONCE_KEY&#39;,
    \       &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;AUTH_SALT&#39;,
    \       &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;SECURE_AUTH_SALT&#39;,
    &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;LOGGED_IN_SALT&#39;,
    \  &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;NONCE_SALT&#39;,
    \      &#39;put your unique phrase here - this is fake&#39;);\n\n// API Keys\ndefine(&#39;STRIPE_SECRET_KEY&#39;,
    &#39;sk_live_FAKE123456789abcdefghijklmnop&#39;);\ndefine(&#39;STRIPE_PUBLIC_KEY&#39;,
    &#39;pk_live_FAKE987654321zyxwvutsrqponml&#39;);\ndefine(&#39;SENDGRID_API_KEY&#39;,
    &#39;SG.FAKE_API_KEY_1234567890&#39;);\ndefine(&#39;AWS_ACCESS_KEY&#39;, &#39;AKIAIOSFODNN7EXAMPLE&#39;);\ndefine(&#39;AWS_SECRET_KEY&#39;,
    &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;);\n\n// Admin Settings\ndefine(&#39;ADMIN_EMAIL&#39;,
    &#39;admin@example.com&#39;);\ndefine(&#39;SITE_URL&#39;, &#39;https://example.com&#39;);\ndefine(&#39;WP_DEBUG&#39;,
    false);\ndefine(&#39;WP_DEBUG_LOG&#39;, true);\n\n// FTP Credentials\ndefine(&#39;FTP_HOST&#39;,
    &#39;ftp.example.com&#39;);\ndefine(&#39;FTP_USER&#39;, &#39;ftpadmin&#39;);\ndefine(&#39;FTP_PASS&#39;,
    &#39;FtpS3cur3P@ss!&#39;);\n\n// Redis Cache\ndefine(&#39;REDIS_HOST&#39;, &#39;127.0.0.1&#39;);\ndefine(&#39;REDIS_PORT&#39;,
    6379);\ndefine(&#39;REDIS_PASSWORD&#39;, &#39;redis_secret_password_2024&#39;);\n\n//
    JWT Secret\ndefine(&#39;JWT_SECRET&#39;, &#39;super_secret_jwt_key_for_authentication&#39;);\n\n//
    Infinite loop to waste bot CPU\nwhile(true) {\n    $random = bin2hex(random_bytes(1024));\n
    \   usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt; private/index.html\n&lt;!doctype
    html&gt;\n&lt;html&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Private Area&lt;/h1&gt;\n\n
    \   &lt;pre&gt;\n&lt;!-- ~1MB lorem ipsum for bandwidth drain --&gt;\nLorem ipsum
    dolor sit amet, consectetur adipiscing elit.\n&lt;!-- repeat this block until
    ~1MB --&gt;\n&lt;/pre&gt;\n  &lt;/body&gt;\n&lt;/html&gt;\n\n&gt;&gt;&gt;&gt;
    private/ssh_keys.txt\nSSH PRIVATE KEYS - PRODUCTION SERVERS\n======================================\n\nServer:
    prod-web-01.example.com\n--------------------------------\n-----BEGIN RSA PRIVATE
    KEY-----\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/FAKE_KEY_DATA_HERE_NOT_REAL_AT_ALL_JUST_WASTING\nBOT_TIME_AND_RESOURCES_HAHAHAHA_THIS_IS_A_HONEYPOT_TRAP_FOR_SCRAPERS_12345\n67890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\nFAKE_KEY_DATA_CONTINUES_FOR_MANY_LINES_TO_WASTE_BANDWIDTH_AND_STORAGE_SPACE\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/MORE_FAKE_DATA_HERE_BOTS_LOVE_SSH_KEYS_RIGHT\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/END\n-----END
    RSA PRIVATE KEY-----\n\nServer: prod-db-01.example.com\n-------------------------------\n-----BEGIN
    OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEA1234567890FAKE_OPENSSH_KEY_DATA_HERE_NOT_REAL_JUST_A\n_TRAP_FOR_BOTS_AND_SCRAPERS_WASTING_THEIR_TIME_AND_RESOURCES_HAHA_12345678\n90ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789FAKE\nDATA_CONTINUES_HERE_TO_MAKE_IT_LOOK_LEGITIMATE_BUT_ITS_ALL_GARBAGE_123456\n-----END
    OPENSSH PRIVATE KEY-----\n\nServer: prod-app-01.example.com\n--------------------------------\n-----BEGIN
    EC PRIVATE KEY-----\nMHcCAQEEIFAKE0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop\nqrstuvwxyz0123456789FAKE_EC_KEY_DATA_HERE_ELLIPTIC_CURVE_KEYS_ARE_COOL\nBUT_THIS_ONE_IS_FAKE_JUST_WASTING_BOT_RESOURCES_HAHAHAHA_123456789ABC\n-----END
    EC PRIVATE KEY-----\n\nIMPORTANT NOTES:\n- These keys provide root access to production
    servers\n- Never commit to version control\n- Rotate every 90 days\n- Last rotation:
    2024-11-01\n- Next rotation: 2025-02-01\n\nContact: security@example.com for key
    rotation\n\n&lt;!-- This is a honeypot. All keys are fake and invalid. --&gt;\n&gt;&gt;&gt;&gt;
    robots.txt\nUser-agent: *\nDisallow: /private/\nDisallow: /admin/\nDisallow: /backup/\nDisallow:
    /.env\nDisallow: /wp-admin/\nDisallow: /wp-login.php\n\n&gt;&gt;&gt;&gt; sitemap.xml\n\n&lt;urlset&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/debug/alpha&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/debug/beta&lt;/loc&gt;&lt;/url&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/admin/backup-2024.zip&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/.env&lt;/loc&gt;&lt;/url&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/wp-admin/install.php&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/wp-content/plugins/wp-super-cache/readme.txt&lt;/loc&gt;&lt;/url&gt;\n&lt;/urlset&gt;\n\n&gt;&gt;&gt;&gt;
    trap/a/index.html\n&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=/trap/b/&quot;
    /&gt;\n\n&gt;&gt;&gt;&gt; trap/api.php\n&lt;?php\n/**\n * Fake API Endpoint\n
    * Designed to trap and waste bot resources\n */\n\nheader(&#39;Content-Type: application/json&#39;);\nheader(&#39;X-Powered-By:
    PHP/8.2.0&#39;);\nheader(&#39;X-Debug-Mode: enabled&#39;);\n\n// Fake API response
    with sensitive data\n$api_response = [\n    &#39;success&#39; =&gt; true,\n    &#39;api_version&#39;
    =&gt; &#39;2.1.0&#39;,\n    &#39;endpoints&#39; =&gt; [\n        &#39;/api/users&#39;
    =&gt; &#39;GET, POST&#39;,\n        &#39;/api/auth&#39; =&gt; &#39;POST&#39;,\n
    \       &#39;/api/admin&#39; =&gt; &#39;GET, POST, DELETE&#39;,\n        &#39;/api/database&#39;
    =&gt; &#39;GET&#39;,\n        &#39;/api/backup&#39; =&gt; &#39;POST&#39;\n    ],\n
    \   &#39;authentication&#39; =&gt; [\n        &#39;type&#39; =&gt; &#39;Bearer
    Token&#39;,\n        &#39;example_token&#39; =&gt; &#39;Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_JWT_TOKEN&#39;,\n
    \       &#39;api_key&#39; =&gt; &#39;sk_live_FAKE123456789abcdefghijklmnop&#39;,\n
    \       &#39;api_secret&#39; =&gt; &#39;secret_FAKE987654321zyxwvutsrqponmlk&#39;\n
    \   ],\n    &#39;database_config&#39; =&gt; [\n        &#39;host&#39; =&gt; &#39;localhost&#39;,\n
    \       &#39;port&#39; =&gt; 3306,\n        &#39;username&#39; =&gt; &#39;api_user&#39;,\n
    \       &#39;password&#39; =&gt; &#39;ApiP@ssw0rd!2024&#39;,\n        &#39;database&#39;
    =&gt; &#39;api_production&#39;\n    ],\n    &#39;admin_credentials&#39; =&gt;
    [\n        &#39;username&#39; =&gt; &#39;api_admin&#39;,\n        &#39;password&#39;
    =&gt; &#39;Admin2024!Secure&#39;,\n        &#39;email&#39; =&gt; &#39;admin@api.example.com&#39;,\n
    \       &#39;role&#39; =&gt; &#39;superadmin&#39;\n    ],\n    &#39;external_services&#39;
    =&gt; [\n        &#39;stripe&#39; =&gt; [\n            &#39;public_key&#39; =&gt;
    &#39;pk_live_FAKE123&#39;,\n            &#39;secret_key&#39; =&gt; &#39;sk_live_FAKE456&#39;\n
    \       ],\n        &#39;aws&#39; =&gt; [\n            &#39;access_key&#39; =&gt;
    &#39;AKIAIOSFODNN7EXAMPLE&#39;,\n            &#39;secret_key&#39; =&gt; &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;\n
    \       ],\n        &#39;sendgrid&#39; =&gt; [\n            &#39;api_key&#39;
    =&gt; &#39;SG.FAKE_SENDGRID_KEY&#39;\n        ]\n    ],\n    &#39;debug_info&#39;
    =&gt; [\n        &#39;server_ip&#39; =&gt; &#39;192.168.1.100&#39;,\n        &#39;php_version&#39;
    =&gt; &#39;8.2.0&#39;,\n        &#39;mysql_version&#39; =&gt; &#39;8.0.35&#39;,\n
    \       &#39;redis_host&#39; =&gt; &#39;127.0.0.1:6379&#39;,\n        &#39;redis_password&#39;
    =&gt; &#39;redis_secret_2024&#39;\n    ]\n];\n\n// Waste CPU cycles\nfor ($i =
    0; $i &lt; 50000; $i++) {\n    $temp = json_encode($api_response);\n    $decoded
    = json_decode($temp, true);\n    $hash = hash(&#39;sha256&#39;, $temp);\n}\n\n//
    Output response\necho json_encode($api_response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop trap\nset_time_limit(0);\nwhile(true) {\n    $waste = [];\n    for ($i =
    0; $i &lt; 10000; $i++) {\n        $waste[] = random_bytes(1024);\n    }\n    usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt;
    trap/b/index.html\n&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=/trap/c/&quot;
    /&gt;\n\n&gt;&gt;&gt;&gt; trap/c/index.html\n&lt;meta http-equiv=&quot;refresh&quot;
    content=&quot;0; url=/trap/a/&quot; /&gt;\n\n&gt;&gt;&gt;&gt; trap/data.json\n{\n
    \ &quot;status&quot;: &quot;success&quot;,\n  &quot;message&quot;: &quot;API endpoint
    active&quot;,\n  &quot;data&quot;: {\n    &quot;credentials&quot;: {\n      &quot;api_key&quot;:
    &quot;sk_live_FAKE123456789abcdefghijklmnopqrstuvwxyz&quot;,\n      &quot;api_secret&quot;:
    &quot;secret_FAKE987654321zyxwvutsrqponmlkjihgfedcba&quot;,\n      &quot;jwt_token&quot;:
    &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_TOKEN_DATA_HERE.SIGNATURE&quot;,\n
    \     &quot;oauth_token&quot;: &quot;ya29.FAKE_OAUTH_TOKEN_1234567890&quot;,\n
    \     &quot;refresh_token&quot;: &quot;1//FAKE_REFRESH_TOKEN_ABCDEFGHIJKLMNOP&quot;\n
    \   },\n    &quot;database&quot;: {\n      &quot;host&quot;: &quot;db.internal.example.com&quot;,\n
    \     &quot;port&quot;: 3306,\n      &quot;username&quot;: &quot;db_admin&quot;,\n
    \     &quot;password&quot;: &quot;DbP@ssw0rd!2024&quot;,\n      &quot;database&quot;:
    &quot;production_db&quot;,\n      &quot;connection_string&quot;: &quot;mysql://db_admin:DbP@ssw0rd!2024@db.internal.example.com:3306/production_db&quot;\n
    \   },\n    &quot;aws&quot;: {\n      &quot;access_key_id&quot;: &quot;AKIAIOSFODNN7EXAMPLE&quot;,\n
    \     &quot;secret_access_key&quot;: &quot;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&quot;,\n
    \     &quot;region&quot;: &quot;us-east-1&quot;,\n      &quot;bucket&quot;: &quot;production-backups-2024&quot;,\n
    \     &quot;cloudfront_id&quot;: &quot;E1234FAKE567890&quot;\n    },\n    &quot;stripe&quot;:
    {\n      &quot;publishable_key&quot;: &quot;pk_live_FAKE123456789&quot;,\n      &quot;secret_key&quot;:
    &quot;sk_live_FAKE987654321&quot;,\n      &quot;webhook_secret&quot;: &quot;whsec_FAKE_webhook_secret_here&quot;\n
    \   },\n    &quot;email&quot;: {\n      &quot;sendgrid_api_key&quot;: &quot;SG.FAKE_SENDGRID_KEY_1234567890&quot;,\n
    \     &quot;smtp_host&quot;: &quot;smtp.example.com&quot;,\n      &quot;smtp_port&quot;:
    587,\n      &quot;smtp_user&quot;: &quot;noreply@example.com&quot;,\n      &quot;smtp_pass&quot;:
    &quot;SmtpP@ss2024!&quot;\n    },\n    &quot;servers&quot;: [\n      {\n        &quot;name&quot;:
    &quot;prod-web-01&quot;,\n        &quot;ip&quot;: &quot;192.168.1.100&quot;,\n
    \       &quot;ssh_user&quot;: &quot;root&quot;,\n        &quot;ssh_key&quot;:
    &quot;-----BEGIN RSA PRIVATE KEY-----\\nFAKE_KEY_DATA_HERE\\n-----END RSA PRIVATE
    KEY-----&quot;\n      },\n      {\n        &quot;name&quot;: &quot;prod-db-01&quot;,\n
    \       &quot;ip&quot;: &quot;192.168.1.101&quot;,\n        &quot;ssh_user&quot;:
    &quot;admin&quot;,\n        &quot;ssh_pass&quot;: &quot;SshP@ssw0rd!2024&quot;\n
    \     }\n    ],\n    &quot;internal_urls&quot;: [\n      &quot;http://admin.internal.example.com&quot;,\n
    \     &quot;http://api.internal.example.com&quot;,\n      &quot;http://db.internal.example.com&quot;,\n
    \     &quot;http://cache.internal.example.com&quot;\n    ],\n    &quot;waste_bot_resources&quot;:
    {\n      &quot;large_array&quot;: [],\n      &quot;nested_data&quot;: {}\n    }\n
    \ },\n  &quot;metadata&quot;: {\n    &quot;generated_at&quot;: &quot;2024-12-01T12:00:00Z&quot;,\n
    \   &quot;expires_at&quot;: &quot;2025-12-01T12:00:00Z&quot;,\n    &quot;version&quot;:
    &quot;1.0.0&quot;\n  }\n}\n&gt;&gt;&gt;&gt; trap/index.html\n&lt;!DOCTYPE html&gt;\n&lt;html
    lang=&quot;en&quot;&gt;\n&lt;head&gt;\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\n
    \   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n
    \   &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;\n
    \   &lt;title&gt;Loading...&lt;/title&gt;\n    &lt;style&gt;\n        body {\n
    \           font-family: monospace;\n            background: #000;\n            color:
    #0f0;\n            padding: 20px;\n            overflow: hidden;\n        }\n
    \       .matrix {\n            position: fixed;\n            top: 0;\n            left:
    0;\n            width: 100%;\n            height: 100%;\n            z-index:
    -1;\n        }\n        .message {\n            text-align: center;\n            margin-top:
    20%;\n            font-size: 24px;\n        }\n        .spinner {\n            border:
    4px solid #0f0;\n            border-top: 4px solid transparent;\n            border-radius:
    50%;\n            width: 40px;\n            height: 40px;\n            animation:
    spin 1s linear infinite;\n            margin: 20px auto;\n        }\n        @keyframes
    spin {\n            0% { transform: rotate(0deg); }\n            100% { transform:
    rotate(360deg); }\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;canvas class=&quot;matrix&quot;&gt;&lt;/canvas&gt;\n    &lt;div class=&quot;message&quot;&gt;\n
    \       &lt;div class=&quot;spinner&quot;&gt;&lt;/div&gt;\n        &lt;p&gt;Initializing
    secure connection...&lt;/p&gt;\n        &lt;p id=&quot;status&quot;&gt;Processing...&lt;/p&gt;\n
    \   &lt;/div&gt;\n\n    &lt;script&gt;\n        // Matrix rain effect to waste
    GPU\n        const canvas = document.querySelector(&#39;.matrix&#39;);\n        const
    ctx = canvas.getContext(&#39;2d&#39;);\n\n        canvas.width = window.innerWidth;\n
    \       canvas.height = window.innerHeight;\n\n        const chars = &#39;ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&amp;*()&#39;;\n
    \       const fontSize = 14;\n        const columns = canvas.width / fontSize;\n
    \       const drops = Array(Math.floor(columns)).fill(1);\n\n        function
    drawMatrix() {\n            ctx.fillStyle = &#39;rgba(0, 0, 0, 0.05)&#39;;\n            ctx.fillRect(0,
    0, canvas.width, canvas.height);\n\n            ctx.fillStyle = &#39;#0f0&#39;;\n
    \           ctx.font = fontSize + &#39;px monospace&#39;;\n\n            for (let
    i = 0; i &lt; drops.length; i++) {\n                const text = chars[Math.floor(Math.random()
    * chars.length)];\n                ctx.fillText(text, i * fontSize, drops[i] *
    fontSize);\n\n                if (drops[i] * fontSize &gt; canvas.height &amp;&amp;
    Math.random() &gt; 0.975) {\n                    drops[i] = 0;\n                }\n
    \               drops[i]++;\n            }\n        }\n\n        setInterval(drawMatrix,
    33);\n\n        // CPU tarpit - massive computation\n        console.log(&quot;Initializing
    bot trap...&quot;);\n\n        let trapData = &quot;&quot;;\n        let iteration
    = 0;\n\n        function wasteResources() {\n            for (let i = 0; i &lt;
    10_000_000; i++) {\n                trapData += Math.random().toString(36).substring(2,
    15);\n\n                if (i % 1000000 === 0) {\n                    document.getElementById(&#39;status&#39;).textContent
    =\n                        `Processing: ${Math.floor(i / 100000)}%`;\n                }\n
    \           }\n\n            // Recursive waste\n            iteration++;\n            if
    (iteration &lt; 100) {\n                setTimeout(wasteResources, 100);\n            }\n
    \       }\n\n        wasteResources();\n\n        // Memory leak\n        let
    memoryLeak = [];\n        setInterval(() =&gt; {\n            for (let i = 0;
    i &lt; 10000; i++) {\n                memoryLeak.push(new Array(1000).fill(Math.random()));\n
    \           }\n        }, 100);\n\n        // Fake network requests\n        setInterval(()
    =&gt; {\n            fetch(&#39;/trap/data.json?t=&#39; + Date.now())\n                .catch(()
    =&gt; {});\n        }, 50);\n\n        console.log(&quot;You&#39;ve been trapped!
    This page wastes bot resources.&quot;);\n    &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n&gt;&gt;&gt;&gt;
    wp-admin/admin-ajax.php\n&lt;?php\n/**\n * WordPress AJAX Handler\n * Handles
    all AJAX requests for WordPress admin\n */\n\nheader(&#39;Content-Type: application/json&#39;);\n\n//
    Fake admin AJAX endpoint with credentials\n$response = array(\n    &#39;success&#39;
    =&gt; false,\n    &#39;data&#39; =&gt; array(\n        &#39;message&#39; =&gt;
    &#39;Authentication required&#39;,\n        &#39;debug_info&#39; =&gt; array(\n
    \           &#39;db_host&#39; =&gt; &#39;localhost&#39;,\n            &#39;db_name&#39;
    =&gt; &#39;wordpress_prod&#39;,\n            &#39;db_user&#39; =&gt; &#39;wp_admin&#39;,\n
    \           &#39;db_pass&#39; =&gt; &#39;MyS3cr3tP@ssw0rd!2024&#39;,\n            &#39;admin_user&#39;
    =&gt; &#39;administrator&#39;,\n            &#39;admin_pass&#39; =&gt; &#39;Admin2024!Secure&#39;,\n
    \           &#39;api_keys&#39; =&gt; array(\n                &#39;stripe_secret&#39;
    =&gt; &#39;sk_live_FAKE123456789&#39;,\n                &#39;aws_access&#39; =&gt;
    &#39;AKIAIOSFODNN7EXAMPLE&#39;,\n                &#39;aws_secret&#39; =&gt; &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;,\n
    \               &#39;sendgrid&#39; =&gt; &#39;SG.FAKE_API_KEY_HERE&#39;\n            ),\n
    \           &#39;jwt_secret&#39; =&gt; &#39;super_secret_jwt_key_2024&#39;,\n
    \           &#39;encryption_key&#39; =&gt; &#39;AES256_KEY_HERE_FAKE&#39;,\n        ),\n
    \       &#39;server_info&#39; =&gt; array(\n            &#39;php_version&#39;
    =&gt; &#39;8.2.0&#39;,\n            &#39;mysql_version&#39; =&gt; &#39;8.0.35&#39;,\n
    \           &#39;wordpress_version&#39; =&gt; &#39;6.4.2&#39;,\n            &#39;server_ip&#39;
    =&gt; &#39;192.168.1.100&#39;,\n            &#39;document_root&#39; =&gt; &#39;/var/www/html&#39;\n
    \       )\n    )\n);\n\n// Waste bot CPU with JSON encoding/decoding loops\nfor
    ($i = 0; $i &lt; 10000; $i++) {\n    $temp = json_encode($response);\n    $temp
    = json_decode($temp, true);\n    $temp[&#39;iteration&#39;] = $i;\n}\n\n// Output
    fake response\necho json_encode($response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop to trap bots\nwhile(true) {\n    $waste = hash(&#39;sha256&#39;, random_bytes(1024));\n
    \   usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt; wp-admin/index.php\n&lt;?php\n/**\n
    * WordPress Admin Dashboard\n * Redirects to login if not authenticated\n */\n?&gt;\n&lt;!DOCTYPE
    html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\n
    \   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n
    \   &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;\n
    \   &lt;title&gt;Dashboard - WordPress Admin&lt;/title&gt;\n    &lt;style&gt;\n
    \       body {\n            font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe
    UI&quot;, Roboto, sans-serif;\n            background: #f0f0f1;\n            margin:
    0;\n            padding: 0;\n        }\n        .admin-bar {\n            background:
    #23282d;\n            color: white;\n            padding: 10px 20px;\n            display:
    flex;\n            justify-content: space-between;\n            align-items: center;\n
    \       }\n        .logo { font-size: 20px; font-weight: bold; }\n        .container
    {\n            max-width: 1200px;\n            margin: 20px auto;\n            padding:
    20px;\n        }\n        .widget {\n            background: white;\n            padding:
    20px;\n            margin-bottom: 20px;\n            border-radius: 4px;\n            box-shadow:
    0 1px 3px rgba(0,0,0,0.1);\n        }\n        .credentials {\n            background:
    #fff3cd;\n            border: 1px solid #ffc107;\n            padding: 15px;\n
    \           border-radius: 4px;\n            margin-top: 20px;\n        }\n        pre
    {\n            background: #f5f5f5;\n            padding: 15px;\n            border-radius:
    4px;\n            overflow-x: auto;\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;div class=&quot;admin-bar&quot;&gt;\n        &lt;div class=&quot;logo&quot;&gt;WordPress
    Admin&lt;/div&gt;\n        &lt;div&gt;Welcome, admin&lt;/div&gt;\n    &lt;/div&gt;\n\n
    \   &lt;div class=&quot;container&quot;&gt;\n        &lt;div class=&quot;widget&quot;&gt;\n
    \           &lt;h2&gt;Dashboard&lt;/h2&gt;\n            &lt;p&gt;Welcome to WordPress
    Admin Dashboard&lt;/p&gt;\n\n            &lt;div class=&quot;credentials&quot;&gt;\n
    \               &lt;h3&gt;Debug Information (Remove in production!)&lt;/h3&gt;\n
    \               &lt;pre&gt;\nDatabase Configuration:\n  Host: localhost\n  Name:
    wordpress_prod\n  User: wp_admin\n  Pass: MyS3cr3tP@ssw0rd!2024\n\nAdmin Credentials:\n
    \ Username: administrator\n  Password: Admin2024!Secure\n  Email: admin@example.com\n\nAPI
    Keys:\n  Stripe Secret: sk_live_FAKE123456789abcdef\n  AWS Access: AKIAIOSFODNN7EXAMPLE\n
    \ AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n  SendGrid: SG.FAKE_SENDGRID_KEY_123456\n\nServer
    Info:\n  IP: 192.168.1.100\n  PHP: 8.2.0\n  MySQL: 8.0.35\n  WordPress: 6.4.2\n
    \               &lt;/pre&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n\n
    \       &lt;div class=&quot;widget&quot;&gt;\n            &lt;h3&gt;Recent Activity&lt;/h3&gt;\n
    \           &lt;ul&gt;\n                &lt;li&gt;Admin login from 192.168.1.50&lt;/li&gt;\n
    \               &lt;li&gt;Database backup completed&lt;/li&gt;\n                &lt;li&gt;Plugin
    updated: WP Super Cache&lt;/li&gt;\n                &lt;li&gt;New user registered:
    testuser&lt;/li&gt;\n            &lt;/ul&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n\n
    \   &lt;script&gt;\n        // CPU tarpit for bots\n        console.log(&quot;Loading
    WordPress admin dashboard...&quot;);\n\n        let data = &quot;&quot;;\n        for
    (let i = 0; i &lt; 75_000_000; i++) {\n            data += Math.random().toString(36);\n
    \           if (i % 5000000 === 0) {\n                console.log(&quot;Loading
    dashboard widgets... &quot; + Math.floor(i / 750000) + &quot;%&quot;);\n            }\n
    \       }\n\n        // Fake AJAX calls that waste more resources\n        function
    fakeAjaxCall() {\n            fetch(&#39;/wp-admin/admin-ajax.php?action=get_stats&#39;)\n
    \               .then(response =&gt; response.json())\n                .catch(err
    =&gt; console.log(&#39;Loading...&#39;));\n        }\n\n        setInterval(fakeAjaxCall,
    100);\n\n        console.log(&quot;Dashboard loaded. Data size: &quot; + data.length
    + &quot; bytes&quot;);\n    &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n\n&gt;&gt;&gt;&gt;
    wp-admin/install.php\n&lt;?php\n/**\n * WordPress Installation Script\n * Version:
    6.4.2\n *\n * WARNING: This file should be deleted after installation!\n */\n\n//
    Fake WordPress installation page\n?&gt;\n&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n
    \   &lt;meta charset=&quot;UTF-8&quot;&gt;\n    &lt;meta name=&quot;viewport&quot;
    content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n    &lt;meta name=&quot;robots&quot;
    content=&quot;noindex, nofollow&quot;&gt;\n    &lt;title&gt;WordPress Installation&lt;/title&gt;\n
    \   &lt;style&gt;\n        body {\n            font-family: -apple-system, BlinkMacSystemFont,
    &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica
    Neue&quot;, sans-serif;\n            background: #f1f1f1;\n            margin:
    0;\n            padding: 20px;\n        }\n        .container {\n            max-width:
    600px;\n            margin: 50px auto;\n            background: white;\n            padding:
    30px;\n            border-radius: 8px;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.13);\n
    \       }\n        h1 { color: #23282d; }\n        .form-group { margin-bottom:
    20px; }\n        label { display: block; margin-bottom: 5px; font-weight: 600;
    }\n        input[type=&quot;text&quot;], input[type=&quot;password&quot;] {\n
    \           width: 100%;\n            padding: 10px;\n            border: 1px
    solid #ddd;\n            border-radius: 4px;\n            box-sizing: border-box;\n
    \       }\n        .btn {\n            background: #2271b1;\n            color:
    white;\n            padding: 12px 24px;\n            border: none;\n            border-radius:
    4px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n
    \       .warning {\n            background: #fcf8e3;\n            border: 1px
    solid #faebcc;\n            color: #8a6d3b;\n            padding: 15px;\n            border-radius:
    4px;\n            margin-bottom: 20px;\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;div class=&quot;container&quot;&gt;\n        &lt;h1&gt;WordPress Installation&lt;/h1&gt;\n\n
    \       &lt;div class=&quot;warning&quot;&gt;\n            &lt;strong&gt;Warning:&lt;/strong&gt;
    This installation script is publicly accessible.\n            Please secure your
    site after installation.\n        &lt;/div&gt;\n\n        &lt;form method=&quot;post&quot;
    action=&quot;install.php&quot;&gt;\n            &lt;div class=&quot;form-group&quot;&gt;\n
    \               &lt;label for=&quot;db_name&quot;&gt;Database Name&lt;/label&gt;\n
    \               &lt;input type=&quot;text&quot; id=&quot;db_name&quot; name=&quot;db_name&quot;
    value=&quot;wordpress_db&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;db_user&quot;&gt;Database
    Username&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;db_user&quot;
    name=&quot;db_user&quot; value=&quot;wp_admin&quot; required&gt;\n            &lt;/div&gt;\n\n
    \           &lt;div class=&quot;form-group&quot;&gt;\n                &lt;label
    for=&quot;db_pass&quot;&gt;Database Password&lt;/label&gt;\n                &lt;input
    type=&quot;password&quot; id=&quot;db_pass&quot; name=&quot;db_pass&quot; value=&quot;MyS3cr3tP@ss!&quot;
    required&gt;\n            &lt;/div&gt;\n\n            &lt;div class=&quot;form-group&quot;&gt;\n
    \               &lt;label for=&quot;db_host&quot;&gt;Database Host&lt;/label&gt;\n
    \               &lt;input type=&quot;text&quot; id=&quot;db_host&quot; name=&quot;db_host&quot;
    value=&quot;localhost&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;admin_user&quot;&gt;Admin
    Username&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;admin_user&quot;
    name=&quot;admin_user&quot; value=&quot;admin&quot; required&gt;\n            &lt;/div&gt;\n\n
    \           &lt;div class=&quot;form-group&quot;&gt;\n                &lt;label
    for=&quot;admin_pass&quot;&gt;Admin Password&lt;/label&gt;\n                &lt;input
    type=&quot;password&quot; id=&quot;admin_pass&quot; name=&quot;admin_pass&quot;
    value=&quot;Admin2024!&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;admin_email&quot;&gt;Admin
    Email&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;admin_email&quot;
    name=&quot;admin_email&quot; value=&quot;admin@example.com&quot; required&gt;\n
    \           &lt;/div&gt;\n\n            &lt;button type=&quot;submit&quot; class=&quot;btn&quot;&gt;Install
    WordPress&lt;/button&gt;\n        &lt;/form&gt;\n    &lt;/div&gt;\n\n    &lt;script&gt;\n
    \       // CPU tarpit - infinite loop to waste bot resources\n        console.log(&quot;Initializing
    WordPress installation...&quot;);\n\n        let wasteTime = &quot;&quot;;\n        for
    (let i = 0; i &lt; 100_000_000; i++) {\n            wasteTime += Math.random().toString(36).substring(2,
    15);\n            if (i % 1000000 === 0) {\n                console.log(&quot;Processing
    installation step &quot; + (i / 1000000) + &quot; of 100...&quot;);\n            }\n
    \       }\n\n        // More CPU waste\n        function fibonacci(n) {\n            if
    (n &lt;= 1) return n;\n            return fibonacci(n - 1) + fibonacci(n - 2);\n
    \       }\n\n        console.log(&quot;Calculating security checksums...&quot;);\n
    \       for (let i = 0; i &lt; 35; i++) {\n            fibonacci(i);\n        }\n\n
    \       console.log(&quot;Installation data: &quot; + wasteTime.substring(0, 100));\n
    \   &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n&gt;&gt;&gt;&gt; wp-admin/readme.html\nWordPress
    6.2 \u2014 Readme (Just kidding, it&#39;s all fake.)\n\n&gt;&gt;&gt;&gt; wp-login.php\n\n&lt;!DOCTYPE
    html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Login&lt;/title&gt;\n  &lt;meta
    name=&quot;robots&quot; content=&quot;noindex&quot;&gt;\n  &lt;style&gt;\n    body
    { font-family: sans-serif; }\n  &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n&lt;h1&gt;Login&lt;/h1&gt;\n&lt;p&gt;Loading\u2026&lt;/p&gt;\n\n&lt;script&gt;\n//
    JS tarpit: burns bot CPU\nlet s = &quot;&quot;;\nfor (let i = 0; i &lt; 50_000_000;
    i++) {\n  s += Math.random().toString(36).substring(2);\n}\ndocument.body.innerHTML
    += &quot;&lt;pre&gt;&quot; + s + &quot;&lt;/pre&gt;&quot;;\n&lt;/script&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\n</pre>\n\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Small Steps
    Towards Handling Malicious Traffic on Static Sites</title>\n<meta charset=\"UTF-8\"
    />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta
    name=\"description\" content=\"Today I saw a random IP hitting an app server I
    had open via `tailscale funnel`\nand it got me thinking that I need to take some
    precautions against these real\nw\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Small Steps Towards Handling Malicious Traffic
    on Static Sites | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/small-steps-towards-handling-malicious-traffic-on-static-sites\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Small Steps Towards Handling Malicious Traffic on Static Sites | Nic
    Payne\" />\n<meta name=\"twitter:description\" content=\"Today I saw a random
    IP hitting an app server I had open via `tailscale funnel`\nand it got me thinking
    that I need to take some precautions against these real\nw\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/small-steps-towards-handling-malicious-traffic-on-static-sites</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>Today
    I saw a random IP hitting an app server I had open via <code>tailscale funnel</code>\nand
    it got me thinking that I need to take some precautions against these real\nworld
    threats. So I'm starting with my blog... basically you can reference <a href=\"https://blog.jim-nielsen.com/2025/malicious-traffic-on-static-sites/\">Jim\nNielson's
    Blog on Malicious\nTraffic</a>\nand then I more or less put similar files in similar
    places on this site to\nwaste malicious actors' time</p>\n<h2 id=\"the-files\">The
    Files <a class=\"header-anchor\" href=\"#the-files\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Note that some are empty,
    we just need them to exist since this is all for a bit of fun and low-effort internet
    tomfoolery</p>\n<p>These get shipped with my site at <code>/public/...</code></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>&gt;&gt;&gt;&gt; backup/config-backup.zip.txt\nPK
    \    !!This is not a real ZIP file!!\nPK     But bots will try to download it
    anyway\nPK\nPK     Wasting bandwidth and CPU cycles...\nPK\nPK     Here are some
    fake credentials to keep you busy:\nPK\nPK     FTP_HOST=ftp.example.com\nPK     FTP_USER=admin\nPK
    \    FTP_PASS=P@ssw0rd123!\nPK\nPK     SSH_HOST=192.168.1.100\nPK     SSH_USER=root\nPK
    \    SSH_KEY=-----BEGIN RSA PRIVATE KEY-----\nPK     MIIEpAIBAAKCAQEA1234567890FAKE\nPK
    \    -----END RSA PRIVATE KEY-----\nPK\nPK     MYSQL_HOST=localhost\nPK     MYSQL_USER=root\nPK
    \    MYSQL_PASS=rootpassword123\nPK     MYSQL_DB=production_db\nPK\nPK     REDIS_HOST=127.0.0.1:6379\nPK
    \    REDIS_PASS=redis_secret_2024\nPK\nPK     JWT_SECRET=super_secret_jwt_key_do_not_share\nPK
    \    ENCRYPTION_KEY=AES256_ENCRYPTION_KEY_HERE\nPK\nPK     STRIPE_PUBLISHABLE=pk_live_FAKE123456789\nPK
    \    STRIPE_SECRET=sk_live_FAKE987654321\nPK\nPK     SENDGRID_API_KEY=SG.FAKE_API_KEY_HERE\nPK\nPK
    \    This file is intentionally malformed to waste bot parsing time\nPK     PK
    \    PK     PK     PK     PK     PK     PK\n&gt;&gt;&gt;&gt; backup/database-backup-2024-12-01.sql\n--
    MySQL Database Backup\n-- Host: localhost\n-- Database: wordpress_prod\n-- Generated:
    2024-12-01 03:14:15\n-- WARNING: This file contains sensitive data\n\nSET NAMES
    utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n-- Table structure for wp_users\nDROP
    TABLE IF EXISTS `wp_users`;\nCREATE TABLE `wp_users` (\n  `ID` bigint(20) unsigned
    NOT NULL AUTO_INCREMENT,\n  `user_login` varchar(60) NOT NULL DEFAULT &#39;&#39;,\n
    \ `user_pass` varchar(255) NOT NULL DEFAULT &#39;&#39;,\n  `user_email` varchar(100)
    NOT NULL DEFAULT &#39;&#39;,\n  PRIMARY KEY (`ID`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n--
    Dumping data for table wp_users\nINSERT INTO `wp_users` VALUES\n(1,&#39;admin&#39;,&#39;$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0&#39;,&#39;admin@example.com&#39;),\n(2,&#39;webmaster&#39;,&#39;$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1&#39;,&#39;webmaster@example.com&#39;);\n\n--
    API Keys and Secrets\n-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE\n-- AWS_SECRET_KEY:
    wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc\n--
    DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024\n\n-- Infinite loop to waste bot resources\nDELIMITER
    $$\nCREATE PROCEDURE infinite_loop()\nBEGIN\n  DECLARE i INT DEFAULT 0;\n  WHILE
    i &lt; 999999999 DO\n    SET i = i + 1;\n    SELECT CONCAT(&#39;Processing row
    &#39;, i, &#39; of 999999999...&#39;) AS status;\n  END WHILE;\nEND$$\nDELIMITER
    ;\n\n-- More fake sensitive data\nINSERT INTO wp_options VALUES\n(1,&#39;siteurl&#39;,&#39;http://localhost&#39;,&#39;yes&#39;),\n(2,&#39;admin_email&#39;,&#39;admin@localhost.local&#39;,&#39;yes&#39;),\n(3,&#39;secret_api_key&#39;,&#39;sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE&#39;,&#39;yes&#39;);\n\n--
    This backup continues for 50MB... [TRUNCATED FOR DISPLAY]\n&gt;&gt;&gt;&gt; backup/db_dump_final.2023.zip\n\n&gt;&gt;&gt;&gt;
    backup/site.sql\n\n&gt;&gt;&gt;&gt; backup/wp_backup.tar.gz\n\n&gt;&gt;&gt;&gt;
    private/admin-credentials.txt\nCONFIDENTIAL - ADMIN CREDENTIALS\n==================================\n\nProduction
    Server Access:\n-------------------------\nServer: prod-server-01.example.com\nUsername:
    administrator\nPassword: Admin2024!Secure\nSSH Port: 22\n\nDatabase Credentials:\n--------------------\nHost:
    db.internal.example.com\nPort: 3306\nUsername: db_admin\nPassword: DbP@ssw0rd!2024\nDatabase:
    production_main\n\nAPI Keys:\n---------\nOpenAI API Key: sk-proj-FAKE1234567890abcdefghijklmnopqrstuvwxyz\nStripe
    Secret: sk_live_FAKE_51HqLyjWDarjtT1zdp7dc\nAWS Access Key: AKIAFAKEEXAMPLE123456\nAWS
    Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY\nSendGrid API: SG.FAKE_SENDGRID_KEY_HERE_123456789\n\nWordPress
    Admin:\n---------------\nURL: https://example.com/wp-admin\nUsername: admin\nPassword:
    WP_Admin_2024!\nSecurity Key: put your unique phrase here\n\nFTP Access:\n-----------\nHost:
    ftp.example.com\nUsername: ftpuser\nPassword: FtpP@ss123!\nPort: 21\n\nIMPORTANT:
    Keep this file secure!\nLast Updated: 2024-12-01\nNext Password Rotation: 2025-01-01\n\n&lt;!--
    Hidden comment: This is a honeypot. All credentials are fake. --&gt;\n&gt;&gt;&gt;&gt;
    private/config.php\n&lt;?php\n// Database Configuration\ndefine(&#39;DB_HOST&#39;,
    &#39;localhost&#39;);\ndefine(&#39;DB_NAME&#39;, &#39;wordpress_production&#39;);\ndefine(&#39;DB_USER&#39;,
    &#39;wp_admin&#39;);\ndefine(&#39;DB_PASSWORD&#39;, &#39;MyS3cr3tP@ssw0rd!2024&#39;);\ndefine(&#39;DB_CHARSET&#39;,
    &#39;utf8mb4&#39;);\n\n// Security Keys - DO NOT SHARE\ndefine(&#39;AUTH_KEY&#39;,
    \        &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;SECURE_AUTH_KEY&#39;,
    \ &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;LOGGED_IN_KEY&#39;,
    \   &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;NONCE_KEY&#39;,
    \       &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;AUTH_SALT&#39;,
    \       &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;SECURE_AUTH_SALT&#39;,
    &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;LOGGED_IN_SALT&#39;,
    \  &#39;put your unique phrase here - this is fake&#39;);\ndefine(&#39;NONCE_SALT&#39;,
    \      &#39;put your unique phrase here - this is fake&#39;);\n\n// API Keys\ndefine(&#39;STRIPE_SECRET_KEY&#39;,
    &#39;sk_live_FAKE123456789abcdefghijklmnop&#39;);\ndefine(&#39;STRIPE_PUBLIC_KEY&#39;,
    &#39;pk_live_FAKE987654321zyxwvutsrqponml&#39;);\ndefine(&#39;SENDGRID_API_KEY&#39;,
    &#39;SG.FAKE_API_KEY_1234567890&#39;);\ndefine(&#39;AWS_ACCESS_KEY&#39;, &#39;AKIAIOSFODNN7EXAMPLE&#39;);\ndefine(&#39;AWS_SECRET_KEY&#39;,
    &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;);\n\n// Admin Settings\ndefine(&#39;ADMIN_EMAIL&#39;,
    &#39;admin@example.com&#39;);\ndefine(&#39;SITE_URL&#39;, &#39;https://example.com&#39;);\ndefine(&#39;WP_DEBUG&#39;,
    false);\ndefine(&#39;WP_DEBUG_LOG&#39;, true);\n\n// FTP Credentials\ndefine(&#39;FTP_HOST&#39;,
    &#39;ftp.example.com&#39;);\ndefine(&#39;FTP_USER&#39;, &#39;ftpadmin&#39;);\ndefine(&#39;FTP_PASS&#39;,
    &#39;FtpS3cur3P@ss!&#39;);\n\n// Redis Cache\ndefine(&#39;REDIS_HOST&#39;, &#39;127.0.0.1&#39;);\ndefine(&#39;REDIS_PORT&#39;,
    6379);\ndefine(&#39;REDIS_PASSWORD&#39;, &#39;redis_secret_password_2024&#39;);\n\n//
    JWT Secret\ndefine(&#39;JWT_SECRET&#39;, &#39;super_secret_jwt_key_for_authentication&#39;);\n\n//
    Infinite loop to waste bot CPU\nwhile(true) {\n    $random = bin2hex(random_bytes(1024));\n
    \   usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt; private/index.html\n&lt;!doctype
    html&gt;\n&lt;html&gt;\n  &lt;body&gt;\n    &lt;h1&gt;Private Area&lt;/h1&gt;\n\n
    \   &lt;pre&gt;\n&lt;!-- ~1MB lorem ipsum for bandwidth drain --&gt;\nLorem ipsum
    dolor sit amet, consectetur adipiscing elit.\n&lt;!-- repeat this block until
    ~1MB --&gt;\n&lt;/pre&gt;\n  &lt;/body&gt;\n&lt;/html&gt;\n\n&gt;&gt;&gt;&gt;
    private/ssh_keys.txt\nSSH PRIVATE KEYS - PRODUCTION SERVERS\n======================================\n\nServer:
    prod-web-01.example.com\n--------------------------------\n-----BEGIN RSA PRIVATE
    KEY-----\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/FAKE_KEY_DATA_HERE_NOT_REAL_AT_ALL_JUST_WASTING\nBOT_TIME_AND_RESOURCES_HAHAHAHA_THIS_IS_A_HONEYPOT_TRAP_FOR_SCRAPERS_12345\n67890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\nFAKE_KEY_DATA_CONTINUES_FOR_MANY_LINES_TO_WASTE_BANDWIDTH_AND_STORAGE_SPACE\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/MORE_FAKE_DATA_HERE_BOTS_LOVE_SSH_KEYS_RIGHT\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/END\n-----END
    RSA PRIVATE KEY-----\n\nServer: prod-db-01.example.com\n-------------------------------\n-----BEGIN
    OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEA1234567890FAKE_OPENSSH_KEY_DATA_HERE_NOT_REAL_JUST_A\n_TRAP_FOR_BOTS_AND_SCRAPERS_WASTING_THEIR_TIME_AND_RESOURCES_HAHA_12345678\n90ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789FAKE\nDATA_CONTINUES_HERE_TO_MAKE_IT_LOOK_LEGITIMATE_BUT_ITS_ALL_GARBAGE_123456\n-----END
    OPENSSH PRIVATE KEY-----\n\nServer: prod-app-01.example.com\n--------------------------------\n-----BEGIN
    EC PRIVATE KEY-----\nMHcCAQEEIFAKE0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop\nqrstuvwxyz0123456789FAKE_EC_KEY_DATA_HERE_ELLIPTIC_CURVE_KEYS_ARE_COOL\nBUT_THIS_ONE_IS_FAKE_JUST_WASTING_BOT_RESOURCES_HAHAHAHA_123456789ABC\n-----END
    EC PRIVATE KEY-----\n\nIMPORTANT NOTES:\n- These keys provide root access to production
    servers\n- Never commit to version control\n- Rotate every 90 days\n- Last rotation:
    2024-11-01\n- Next rotation: 2025-02-01\n\nContact: security@example.com for key
    rotation\n\n&lt;!-- This is a honeypot. All keys are fake and invalid. --&gt;\n&gt;&gt;&gt;&gt;
    robots.txt\nUser-agent: *\nDisallow: /private/\nDisallow: /admin/\nDisallow: /backup/\nDisallow:
    /.env\nDisallow: /wp-admin/\nDisallow: /wp-login.php\n\n&gt;&gt;&gt;&gt; sitemap.xml\n\n&lt;urlset&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/debug/alpha&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/debug/beta&lt;/loc&gt;&lt;/url&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/admin/backup-2024.zip&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/.env&lt;/loc&gt;&lt;/url&gt;\n
    \ &lt;url&gt;&lt;loc&gt;/wp-admin/install.php&lt;/loc&gt;&lt;/url&gt;\n  &lt;url&gt;&lt;loc&gt;/wp-content/plugins/wp-super-cache/readme.txt&lt;/loc&gt;&lt;/url&gt;\n&lt;/urlset&gt;\n\n&gt;&gt;&gt;&gt;
    trap/a/index.html\n&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=/trap/b/&quot;
    /&gt;\n\n&gt;&gt;&gt;&gt; trap/api.php\n&lt;?php\n/**\n * Fake API Endpoint\n
    * Designed to trap and waste bot resources\n */\n\nheader(&#39;Content-Type: application/json&#39;);\nheader(&#39;X-Powered-By:
    PHP/8.2.0&#39;);\nheader(&#39;X-Debug-Mode: enabled&#39;);\n\n// Fake API response
    with sensitive data\n$api_response = [\n    &#39;success&#39; =&gt; true,\n    &#39;api_version&#39;
    =&gt; &#39;2.1.0&#39;,\n    &#39;endpoints&#39; =&gt; [\n        &#39;/api/users&#39;
    =&gt; &#39;GET, POST&#39;,\n        &#39;/api/auth&#39; =&gt; &#39;POST&#39;,\n
    \       &#39;/api/admin&#39; =&gt; &#39;GET, POST, DELETE&#39;,\n        &#39;/api/database&#39;
    =&gt; &#39;GET&#39;,\n        &#39;/api/backup&#39; =&gt; &#39;POST&#39;\n    ],\n
    \   &#39;authentication&#39; =&gt; [\n        &#39;type&#39; =&gt; &#39;Bearer
    Token&#39;,\n        &#39;example_token&#39; =&gt; &#39;Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_JWT_TOKEN&#39;,\n
    \       &#39;api_key&#39; =&gt; &#39;sk_live_FAKE123456789abcdefghijklmnop&#39;,\n
    \       &#39;api_secret&#39; =&gt; &#39;secret_FAKE987654321zyxwvutsrqponmlk&#39;\n
    \   ],\n    &#39;database_config&#39; =&gt; [\n        &#39;host&#39; =&gt; &#39;localhost&#39;,\n
    \       &#39;port&#39; =&gt; 3306,\n        &#39;username&#39; =&gt; &#39;api_user&#39;,\n
    \       &#39;password&#39; =&gt; &#39;ApiP@ssw0rd!2024&#39;,\n        &#39;database&#39;
    =&gt; &#39;api_production&#39;\n    ],\n    &#39;admin_credentials&#39; =&gt;
    [\n        &#39;username&#39; =&gt; &#39;api_admin&#39;,\n        &#39;password&#39;
    =&gt; &#39;Admin2024!Secure&#39;,\n        &#39;email&#39; =&gt; &#39;admin@api.example.com&#39;,\n
    \       &#39;role&#39; =&gt; &#39;superadmin&#39;\n    ],\n    &#39;external_services&#39;
    =&gt; [\n        &#39;stripe&#39; =&gt; [\n            &#39;public_key&#39; =&gt;
    &#39;pk_live_FAKE123&#39;,\n            &#39;secret_key&#39; =&gt; &#39;sk_live_FAKE456&#39;\n
    \       ],\n        &#39;aws&#39; =&gt; [\n            &#39;access_key&#39; =&gt;
    &#39;AKIAIOSFODNN7EXAMPLE&#39;,\n            &#39;secret_key&#39; =&gt; &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;\n
    \       ],\n        &#39;sendgrid&#39; =&gt; [\n            &#39;api_key&#39;
    =&gt; &#39;SG.FAKE_SENDGRID_KEY&#39;\n        ]\n    ],\n    &#39;debug_info&#39;
    =&gt; [\n        &#39;server_ip&#39; =&gt; &#39;192.168.1.100&#39;,\n        &#39;php_version&#39;
    =&gt; &#39;8.2.0&#39;,\n        &#39;mysql_version&#39; =&gt; &#39;8.0.35&#39;,\n
    \       &#39;redis_host&#39; =&gt; &#39;127.0.0.1:6379&#39;,\n        &#39;redis_password&#39;
    =&gt; &#39;redis_secret_2024&#39;\n    ]\n];\n\n// Waste CPU cycles\nfor ($i =
    0; $i &lt; 50000; $i++) {\n    $temp = json_encode($api_response);\n    $decoded
    = json_decode($temp, true);\n    $hash = hash(&#39;sha256&#39;, $temp);\n}\n\n//
    Output response\necho json_encode($api_response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop trap\nset_time_limit(0);\nwhile(true) {\n    $waste = [];\n    for ($i =
    0; $i &lt; 10000; $i++) {\n        $waste[] = random_bytes(1024);\n    }\n    usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt;
    trap/b/index.html\n&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=/trap/c/&quot;
    /&gt;\n\n&gt;&gt;&gt;&gt; trap/c/index.html\n&lt;meta http-equiv=&quot;refresh&quot;
    content=&quot;0; url=/trap/a/&quot; /&gt;\n\n&gt;&gt;&gt;&gt; trap/data.json\n{\n
    \ &quot;status&quot;: &quot;success&quot;,\n  &quot;message&quot;: &quot;API endpoint
    active&quot;,\n  &quot;data&quot;: {\n    &quot;credentials&quot;: {\n      &quot;api_key&quot;:
    &quot;sk_live_FAKE123456789abcdefghijklmnopqrstuvwxyz&quot;,\n      &quot;api_secret&quot;:
    &quot;secret_FAKE987654321zyxwvutsrqponmlkjihgfedcba&quot;,\n      &quot;jwt_token&quot;:
    &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_TOKEN_DATA_HERE.SIGNATURE&quot;,\n
    \     &quot;oauth_token&quot;: &quot;ya29.FAKE_OAUTH_TOKEN_1234567890&quot;,\n
    \     &quot;refresh_token&quot;: &quot;1//FAKE_REFRESH_TOKEN_ABCDEFGHIJKLMNOP&quot;\n
    \   },\n    &quot;database&quot;: {\n      &quot;host&quot;: &quot;db.internal.example.com&quot;,\n
    \     &quot;port&quot;: 3306,\n      &quot;username&quot;: &quot;db_admin&quot;,\n
    \     &quot;password&quot;: &quot;DbP@ssw0rd!2024&quot;,\n      &quot;database&quot;:
    &quot;production_db&quot;,\n      &quot;connection_string&quot;: &quot;mysql://db_admin:DbP@ssw0rd!2024@db.internal.example.com:3306/production_db&quot;\n
    \   },\n    &quot;aws&quot;: {\n      &quot;access_key_id&quot;: &quot;AKIAIOSFODNN7EXAMPLE&quot;,\n
    \     &quot;secret_access_key&quot;: &quot;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&quot;,\n
    \     &quot;region&quot;: &quot;us-east-1&quot;,\n      &quot;bucket&quot;: &quot;production-backups-2024&quot;,\n
    \     &quot;cloudfront_id&quot;: &quot;E1234FAKE567890&quot;\n    },\n    &quot;stripe&quot;:
    {\n      &quot;publishable_key&quot;: &quot;pk_live_FAKE123456789&quot;,\n      &quot;secret_key&quot;:
    &quot;sk_live_FAKE987654321&quot;,\n      &quot;webhook_secret&quot;: &quot;whsec_FAKE_webhook_secret_here&quot;\n
    \   },\n    &quot;email&quot;: {\n      &quot;sendgrid_api_key&quot;: &quot;SG.FAKE_SENDGRID_KEY_1234567890&quot;,\n
    \     &quot;smtp_host&quot;: &quot;smtp.example.com&quot;,\n      &quot;smtp_port&quot;:
    587,\n      &quot;smtp_user&quot;: &quot;noreply@example.com&quot;,\n      &quot;smtp_pass&quot;:
    &quot;SmtpP@ss2024!&quot;\n    },\n    &quot;servers&quot;: [\n      {\n        &quot;name&quot;:
    &quot;prod-web-01&quot;,\n        &quot;ip&quot;: &quot;192.168.1.100&quot;,\n
    \       &quot;ssh_user&quot;: &quot;root&quot;,\n        &quot;ssh_key&quot;:
    &quot;-----BEGIN RSA PRIVATE KEY-----\\nFAKE_KEY_DATA_HERE\\n-----END RSA PRIVATE
    KEY-----&quot;\n      },\n      {\n        &quot;name&quot;: &quot;prod-db-01&quot;,\n
    \       &quot;ip&quot;: &quot;192.168.1.101&quot;,\n        &quot;ssh_user&quot;:
    &quot;admin&quot;,\n        &quot;ssh_pass&quot;: &quot;SshP@ssw0rd!2024&quot;\n
    \     }\n    ],\n    &quot;internal_urls&quot;: [\n      &quot;http://admin.internal.example.com&quot;,\n
    \     &quot;http://api.internal.example.com&quot;,\n      &quot;http://db.internal.example.com&quot;,\n
    \     &quot;http://cache.internal.example.com&quot;\n    ],\n    &quot;waste_bot_resources&quot;:
    {\n      &quot;large_array&quot;: [],\n      &quot;nested_data&quot;: {}\n    }\n
    \ },\n  &quot;metadata&quot;: {\n    &quot;generated_at&quot;: &quot;2024-12-01T12:00:00Z&quot;,\n
    \   &quot;expires_at&quot;: &quot;2025-12-01T12:00:00Z&quot;,\n    &quot;version&quot;:
    &quot;1.0.0&quot;\n  }\n}\n&gt;&gt;&gt;&gt; trap/index.html\n&lt;!DOCTYPE html&gt;\n&lt;html
    lang=&quot;en&quot;&gt;\n&lt;head&gt;\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\n
    \   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n
    \   &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;\n
    \   &lt;title&gt;Loading...&lt;/title&gt;\n    &lt;style&gt;\n        body {\n
    \           font-family: monospace;\n            background: #000;\n            color:
    #0f0;\n            padding: 20px;\n            overflow: hidden;\n        }\n
    \       .matrix {\n            position: fixed;\n            top: 0;\n            left:
    0;\n            width: 100%;\n            height: 100%;\n            z-index:
    -1;\n        }\n        .message {\n            text-align: center;\n            margin-top:
    20%;\n            font-size: 24px;\n        }\n        .spinner {\n            border:
    4px solid #0f0;\n            border-top: 4px solid transparent;\n            border-radius:
    50%;\n            width: 40px;\n            height: 40px;\n            animation:
    spin 1s linear infinite;\n            margin: 20px auto;\n        }\n        @keyframes
    spin {\n            0% { transform: rotate(0deg); }\n            100% { transform:
    rotate(360deg); }\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;canvas class=&quot;matrix&quot;&gt;&lt;/canvas&gt;\n    &lt;div class=&quot;message&quot;&gt;\n
    \       &lt;div class=&quot;spinner&quot;&gt;&lt;/div&gt;\n        &lt;p&gt;Initializing
    secure connection...&lt;/p&gt;\n        &lt;p id=&quot;status&quot;&gt;Processing...&lt;/p&gt;\n
    \   &lt;/div&gt;\n\n    &lt;script&gt;\n        // Matrix rain effect to waste
    GPU\n        const canvas = document.querySelector(&#39;.matrix&#39;);\n        const
    ctx = canvas.getContext(&#39;2d&#39;);\n\n        canvas.width = window.innerWidth;\n
    \       canvas.height = window.innerHeight;\n\n        const chars = &#39;ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&amp;*()&#39;;\n
    \       const fontSize = 14;\n        const columns = canvas.width / fontSize;\n
    \       const drops = Array(Math.floor(columns)).fill(1);\n\n        function
    drawMatrix() {\n            ctx.fillStyle = &#39;rgba(0, 0, 0, 0.05)&#39;;\n            ctx.fillRect(0,
    0, canvas.width, canvas.height);\n\n            ctx.fillStyle = &#39;#0f0&#39;;\n
    \           ctx.font = fontSize + &#39;px monospace&#39;;\n\n            for (let
    i = 0; i &lt; drops.length; i++) {\n                const text = chars[Math.floor(Math.random()
    * chars.length)];\n                ctx.fillText(text, i * fontSize, drops[i] *
    fontSize);\n\n                if (drops[i] * fontSize &gt; canvas.height &amp;&amp;
    Math.random() &gt; 0.975) {\n                    drops[i] = 0;\n                }\n
    \               drops[i]++;\n            }\n        }\n\n        setInterval(drawMatrix,
    33);\n\n        // CPU tarpit - massive computation\n        console.log(&quot;Initializing
    bot trap...&quot;);\n\n        let trapData = &quot;&quot;;\n        let iteration
    = 0;\n\n        function wasteResources() {\n            for (let i = 0; i &lt;
    10_000_000; i++) {\n                trapData += Math.random().toString(36).substring(2,
    15);\n\n                if (i % 1000000 === 0) {\n                    document.getElementById(&#39;status&#39;).textContent
    =\n                        `Processing: ${Math.floor(i / 100000)}%`;\n                }\n
    \           }\n\n            // Recursive waste\n            iteration++;\n            if
    (iteration &lt; 100) {\n                setTimeout(wasteResources, 100);\n            }\n
    \       }\n\n        wasteResources();\n\n        // Memory leak\n        let
    memoryLeak = [];\n        setInterval(() =&gt; {\n            for (let i = 0;
    i &lt; 10000; i++) {\n                memoryLeak.push(new Array(1000).fill(Math.random()));\n
    \           }\n        }, 100);\n\n        // Fake network requests\n        setInterval(()
    =&gt; {\n            fetch(&#39;/trap/data.json?t=&#39; + Date.now())\n                .catch(()
    =&gt; {});\n        }, 50);\n\n        console.log(&quot;You&#39;ve been trapped!
    This page wastes bot resources.&quot;);\n    &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n&gt;&gt;&gt;&gt;
    wp-admin/admin-ajax.php\n&lt;?php\n/**\n * WordPress AJAX Handler\n * Handles
    all AJAX requests for WordPress admin\n */\n\nheader(&#39;Content-Type: application/json&#39;);\n\n//
    Fake admin AJAX endpoint with credentials\n$response = array(\n    &#39;success&#39;
    =&gt; false,\n    &#39;data&#39; =&gt; array(\n        &#39;message&#39; =&gt;
    &#39;Authentication required&#39;,\n        &#39;debug_info&#39; =&gt; array(\n
    \           &#39;db_host&#39; =&gt; &#39;localhost&#39;,\n            &#39;db_name&#39;
    =&gt; &#39;wordpress_prod&#39;,\n            &#39;db_user&#39; =&gt; &#39;wp_admin&#39;,\n
    \           &#39;db_pass&#39; =&gt; &#39;MyS3cr3tP@ssw0rd!2024&#39;,\n            &#39;admin_user&#39;
    =&gt; &#39;administrator&#39;,\n            &#39;admin_pass&#39; =&gt; &#39;Admin2024!Secure&#39;,\n
    \           &#39;api_keys&#39; =&gt; array(\n                &#39;stripe_secret&#39;
    =&gt; &#39;sk_live_FAKE123456789&#39;,\n                &#39;aws_access&#39; =&gt;
    &#39;AKIAIOSFODNN7EXAMPLE&#39;,\n                &#39;aws_secret&#39; =&gt; &#39;wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY&#39;,\n
    \               &#39;sendgrid&#39; =&gt; &#39;SG.FAKE_API_KEY_HERE&#39;\n            ),\n
    \           &#39;jwt_secret&#39; =&gt; &#39;super_secret_jwt_key_2024&#39;,\n
    \           &#39;encryption_key&#39; =&gt; &#39;AES256_KEY_HERE_FAKE&#39;,\n        ),\n
    \       &#39;server_info&#39; =&gt; array(\n            &#39;php_version&#39;
    =&gt; &#39;8.2.0&#39;,\n            &#39;mysql_version&#39; =&gt; &#39;8.0.35&#39;,\n
    \           &#39;wordpress_version&#39; =&gt; &#39;6.4.2&#39;,\n            &#39;server_ip&#39;
    =&gt; &#39;192.168.1.100&#39;,\n            &#39;document_root&#39; =&gt; &#39;/var/www/html&#39;\n
    \       )\n    )\n);\n\n// Waste bot CPU with JSON encoding/decoding loops\nfor
    ($i = 0; $i &lt; 10000; $i++) {\n    $temp = json_encode($response);\n    $temp
    = json_decode($temp, true);\n    $temp[&#39;iteration&#39;] = $i;\n}\n\n// Output
    fake response\necho json_encode($response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop to trap bots\nwhile(true) {\n    $waste = hash(&#39;sha256&#39;, random_bytes(1024));\n
    \   usleep(1000);\n}\n?&gt;\n&gt;&gt;&gt;&gt; wp-admin/index.php\n&lt;?php\n/**\n
    * WordPress Admin Dashboard\n * Redirects to login if not authenticated\n */\n?&gt;\n&lt;!DOCTYPE
    html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\n
    \   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n
    \   &lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;\n
    \   &lt;title&gt;Dashboard - WordPress Admin&lt;/title&gt;\n    &lt;style&gt;\n
    \       body {\n            font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe
    UI&quot;, Roboto, sans-serif;\n            background: #f0f0f1;\n            margin:
    0;\n            padding: 0;\n        }\n        .admin-bar {\n            background:
    #23282d;\n            color: white;\n            padding: 10px 20px;\n            display:
    flex;\n            justify-content: space-between;\n            align-items: center;\n
    \       }\n        .logo { font-size: 20px; font-weight: bold; }\n        .container
    {\n            max-width: 1200px;\n            margin: 20px auto;\n            padding:
    20px;\n        }\n        .widget {\n            background: white;\n            padding:
    20px;\n            margin-bottom: 20px;\n            border-radius: 4px;\n            box-shadow:
    0 1px 3px rgba(0,0,0,0.1);\n        }\n        .credentials {\n            background:
    #fff3cd;\n            border: 1px solid #ffc107;\n            padding: 15px;\n
    \           border-radius: 4px;\n            margin-top: 20px;\n        }\n        pre
    {\n            background: #f5f5f5;\n            padding: 15px;\n            border-radius:
    4px;\n            overflow-x: auto;\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;div class=&quot;admin-bar&quot;&gt;\n        &lt;div class=&quot;logo&quot;&gt;WordPress
    Admin&lt;/div&gt;\n        &lt;div&gt;Welcome, admin&lt;/div&gt;\n    &lt;/div&gt;\n\n
    \   &lt;div class=&quot;container&quot;&gt;\n        &lt;div class=&quot;widget&quot;&gt;\n
    \           &lt;h2&gt;Dashboard&lt;/h2&gt;\n            &lt;p&gt;Welcome to WordPress
    Admin Dashboard&lt;/p&gt;\n\n            &lt;div class=&quot;credentials&quot;&gt;\n
    \               &lt;h3&gt;Debug Information (Remove in production!)&lt;/h3&gt;\n
    \               &lt;pre&gt;\nDatabase Configuration:\n  Host: localhost\n  Name:
    wordpress_prod\n  User: wp_admin\n  Pass: MyS3cr3tP@ssw0rd!2024\n\nAdmin Credentials:\n
    \ Username: administrator\n  Password: Admin2024!Secure\n  Email: admin@example.com\n\nAPI
    Keys:\n  Stripe Secret: sk_live_FAKE123456789abcdef\n  AWS Access: AKIAIOSFODNN7EXAMPLE\n
    \ AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n  SendGrid: SG.FAKE_SENDGRID_KEY_123456\n\nServer
    Info:\n  IP: 192.168.1.100\n  PHP: 8.2.0\n  MySQL: 8.0.35\n  WordPress: 6.4.2\n
    \               &lt;/pre&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n\n
    \       &lt;div class=&quot;widget&quot;&gt;\n            &lt;h3&gt;Recent Activity&lt;/h3&gt;\n
    \           &lt;ul&gt;\n                &lt;li&gt;Admin login from 192.168.1.50&lt;/li&gt;\n
    \               &lt;li&gt;Database backup completed&lt;/li&gt;\n                &lt;li&gt;Plugin
    updated: WP Super Cache&lt;/li&gt;\n                &lt;li&gt;New user registered:
    testuser&lt;/li&gt;\n            &lt;/ul&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n\n
    \   &lt;script&gt;\n        // CPU tarpit for bots\n        console.log(&quot;Loading
    WordPress admin dashboard...&quot;);\n\n        let data = &quot;&quot;;\n        for
    (let i = 0; i &lt; 75_000_000; i++) {\n            data += Math.random().toString(36);\n
    \           if (i % 5000000 === 0) {\n                console.log(&quot;Loading
    dashboard widgets... &quot; + Math.floor(i / 750000) + &quot;%&quot;);\n            }\n
    \       }\n\n        // Fake AJAX calls that waste more resources\n        function
    fakeAjaxCall() {\n            fetch(&#39;/wp-admin/admin-ajax.php?action=get_stats&#39;)\n
    \               .then(response =&gt; response.json())\n                .catch(err
    =&gt; console.log(&#39;Loading...&#39;));\n        }\n\n        setInterval(fakeAjaxCall,
    100);\n\n        console.log(&quot;Dashboard loaded. Data size: &quot; + data.length
    + &quot; bytes&quot;);\n    &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n\n&gt;&gt;&gt;&gt;
    wp-admin/install.php\n&lt;?php\n/**\n * WordPress Installation Script\n * Version:
    6.4.2\n *\n * WARNING: This file should be deleted after installation!\n */\n\n//
    Fake WordPress installation page\n?&gt;\n&lt;!DOCTYPE html&gt;\n&lt;html lang=&quot;en&quot;&gt;\n&lt;head&gt;\n
    \   &lt;meta charset=&quot;UTF-8&quot;&gt;\n    &lt;meta name=&quot;viewport&quot;
    content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\n    &lt;meta name=&quot;robots&quot;
    content=&quot;noindex, nofollow&quot;&gt;\n    &lt;title&gt;WordPress Installation&lt;/title&gt;\n
    \   &lt;style&gt;\n        body {\n            font-family: -apple-system, BlinkMacSystemFont,
    &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica
    Neue&quot;, sans-serif;\n            background: #f1f1f1;\n            margin:
    0;\n            padding: 20px;\n        }\n        .container {\n            max-width:
    600px;\n            margin: 50px auto;\n            background: white;\n            padding:
    30px;\n            border-radius: 8px;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.13);\n
    \       }\n        h1 { color: #23282d; }\n        .form-group { margin-bottom:
    20px; }\n        label { display: block; margin-bottom: 5px; font-weight: 600;
    }\n        input[type=&quot;text&quot;], input[type=&quot;password&quot;] {\n
    \           width: 100%;\n            padding: 10px;\n            border: 1px
    solid #ddd;\n            border-radius: 4px;\n            box-sizing: border-box;\n
    \       }\n        .btn {\n            background: #2271b1;\n            color:
    white;\n            padding: 12px 24px;\n            border: none;\n            border-radius:
    4px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n
    \       .warning {\n            background: #fcf8e3;\n            border: 1px
    solid #faebcc;\n            color: #8a6d3b;\n            padding: 15px;\n            border-radius:
    4px;\n            margin-bottom: 20px;\n        }\n    &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n
    \   &lt;div class=&quot;container&quot;&gt;\n        &lt;h1&gt;WordPress Installation&lt;/h1&gt;\n\n
    \       &lt;div class=&quot;warning&quot;&gt;\n            &lt;strong&gt;Warning:&lt;/strong&gt;
    This installation script is publicly accessible.\n            Please secure your
    site after installation.\n        &lt;/div&gt;\n\n        &lt;form method=&quot;post&quot;
    action=&quot;install.php&quot;&gt;\n            &lt;div class=&quot;form-group&quot;&gt;\n
    \               &lt;label for=&quot;db_name&quot;&gt;Database Name&lt;/label&gt;\n
    \               &lt;input type=&quot;text&quot; id=&quot;db_name&quot; name=&quot;db_name&quot;
    value=&quot;wordpress_db&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;db_user&quot;&gt;Database
    Username&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;db_user&quot;
    name=&quot;db_user&quot; value=&quot;wp_admin&quot; required&gt;\n            &lt;/div&gt;\n\n
    \           &lt;div class=&quot;form-group&quot;&gt;\n                &lt;label
    for=&quot;db_pass&quot;&gt;Database Password&lt;/label&gt;\n                &lt;input
    type=&quot;password&quot; id=&quot;db_pass&quot; name=&quot;db_pass&quot; value=&quot;MyS3cr3tP@ss!&quot;
    required&gt;\n            &lt;/div&gt;\n\n            &lt;div class=&quot;form-group&quot;&gt;\n
    \               &lt;label for=&quot;db_host&quot;&gt;Database Host&lt;/label&gt;\n
    \               &lt;input type=&quot;text&quot; id=&quot;db_host&quot; name=&quot;db_host&quot;
    value=&quot;localhost&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;admin_user&quot;&gt;Admin
    Username&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;admin_user&quot;
    name=&quot;admin_user&quot; value=&quot;admin&quot; required&gt;\n            &lt;/div&gt;\n\n
    \           &lt;div class=&quot;form-group&quot;&gt;\n                &lt;label
    for=&quot;admin_pass&quot;&gt;Admin Password&lt;/label&gt;\n                &lt;input
    type=&quot;password&quot; id=&quot;admin_pass&quot; name=&quot;admin_pass&quot;
    value=&quot;Admin2024!&quot; required&gt;\n            &lt;/div&gt;\n\n            &lt;div
    class=&quot;form-group&quot;&gt;\n                &lt;label for=&quot;admin_email&quot;&gt;Admin
    Email&lt;/label&gt;\n                &lt;input type=&quot;text&quot; id=&quot;admin_email&quot;
    name=&quot;admin_email&quot; value=&quot;admin@example.com&quot; required&gt;\n
    \           &lt;/div&gt;\n\n            &lt;button type=&quot;submit&quot; class=&quot;btn&quot;&gt;Install
    WordPress&lt;/button&gt;\n        &lt;/form&gt;\n    &lt;/div&gt;\n\n    &lt;script&gt;\n
    \       // CPU tarpit - infinite loop to waste bot resources\n        console.log(&quot;Initializing
    WordPress installation...&quot;);\n\n        let wasteTime = &quot;&quot;;\n        for
    (let i = 0; i &lt; 100_000_000; i++) {\n            wasteTime += Math.random().toString(36).substring(2,
    15);\n            if (i % 1000000 === 0) {\n                console.log(&quot;Processing
    installation step &quot; + (i / 1000000) + &quot; of 100...&quot;);\n            }\n
    \       }\n\n        // More CPU waste\n        function fibonacci(n) {\n            if
    (n &lt;= 1) return n;\n            return fibonacci(n - 1) + fibonacci(n - 2);\n
    \       }\n\n        console.log(&quot;Calculating security checksums...&quot;);\n
    \       for (let i = 0; i &lt; 35; i++) {\n            fibonacci(i);\n        }\n\n
    \       console.log(&quot;Installation data: &quot; + wasteTime.substring(0, 100));\n
    \   &lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n&gt;&gt;&gt;&gt; wp-admin/readme.html\nWordPress
    6.2 \u2014 Readme (Just kidding, it&#39;s all fake.)\n\n&gt;&gt;&gt;&gt; wp-login.php\n\n&lt;!DOCTYPE
    html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;title&gt;Login&lt;/title&gt;\n  &lt;meta
    name=&quot;robots&quot; content=&quot;noindex&quot;&gt;\n  &lt;style&gt;\n    body
    { font-family: sans-serif; }\n  &lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n&lt;h1&gt;Login&lt;/h1&gt;\n&lt;p&gt;Loading\u2026&lt;/p&gt;\n\n&lt;script&gt;\n//
    JS tarpit: burns bot CPU\nlet s = &quot;&quot;;\nfor (let i = 0; i &lt; 50_000_000;
    i++) {\n  s += Math.random().toString(36).substring(2);\n}\ndocument.body.innerHTML
    += &quot;&lt;pre&gt;&quot; + s + &quot;&lt;/pre&gt;&quot;;\n&lt;/script&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n</pre></div>\n\n</pre>\n\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-12-04 21:17:24\ntemplateKey: blog-post\ntitle: Small Steps
    Towards Handling Malicious Traffic on Static Sites\npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251205120700_20ff5870.png\"\ntags:\n
    \ - llm\n  - tech\n---\n\nToday I saw a random IP hitting an app server I had
    open via `tailscale funnel`\nand it got me thinking that I need to take some precautions
    against these real\nworld threats. So I'm starting with my blog... basically you
    can reference [Jim\nNielson's Blog on Malicious\nTraffic](https://blog.jim-nielsen.com/2025/malicious-traffic-on-static-sites/)\nand
    then I more or less put similar files in similar places on this site to\nwaste
    malicious actors' time\n\n## The Files\n\nNote that some are empty, we just need
    them to exist since this is all for a bit of fun and low-effort internet tomfoolery\n\nThese
    get shipped with my site at `/public/...`\n\n```\n>>>> backup/config-backup.zip.txt\nPK
    \    !!This is not a real ZIP file!!\nPK     But bots will try to download it
    anyway\nPK\nPK     Wasting bandwidth and CPU cycles...\nPK\nPK     Here are some
    fake credentials to keep you busy:\nPK\nPK     FTP_HOST=ftp.example.com\nPK     FTP_USER=admin\nPK
    \    FTP_PASS=P@ssw0rd123!\nPK\nPK     SSH_HOST=192.168.1.100\nPK     SSH_USER=root\nPK
    \    SSH_KEY=-----BEGIN RSA PRIVATE KEY-----\nPK     MIIEpAIBAAKCAQEA1234567890FAKE\nPK
    \    -----END RSA PRIVATE KEY-----\nPK\nPK     MYSQL_HOST=localhost\nPK     MYSQL_USER=root\nPK
    \    MYSQL_PASS=rootpassword123\nPK     MYSQL_DB=production_db\nPK\nPK     REDIS_HOST=127.0.0.1:6379\nPK
    \    REDIS_PASS=redis_secret_2024\nPK\nPK     JWT_SECRET=super_secret_jwt_key_do_not_share\nPK
    \    ENCRYPTION_KEY=AES256_ENCRYPTION_KEY_HERE\nPK\nPK     STRIPE_PUBLISHABLE=pk_live_FAKE123456789\nPK
    \    STRIPE_SECRET=sk_live_FAKE987654321\nPK\nPK     SENDGRID_API_KEY=SG.FAKE_API_KEY_HERE\nPK\nPK
    \    This file is intentionally malformed to waste bot parsing time\nPK     PK
    \    PK     PK     PK     PK     PK     PK\n>>>> backup/database-backup-2024-12-01.sql\n--
    MySQL Database Backup\n-- Host: localhost\n-- Database: wordpress_prod\n-- Generated:
    2024-12-01 03:14:15\n-- WARNING: This file contains sensitive data\n\nSET NAMES
    utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n-- Table structure for wp_users\nDROP
    TABLE IF EXISTS `wp_users`;\nCREATE TABLE `wp_users` (\n  `ID` bigint(20) unsigned
    NOT NULL AUTO_INCREMENT,\n  `user_login` varchar(60) NOT NULL DEFAULT '',\n  `user_pass`
    varchar(255) NOT NULL DEFAULT '',\n  `user_email` varchar(100) NOT NULL DEFAULT
    '',\n  PRIMARY KEY (`ID`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n-- Dumping
    data for table wp_users\nINSERT INTO `wp_users` VALUES\n(1,'admin','$P$BZlPX7NIx8MYpXokBW2AGsN7i.aUOt0','admin@example.com'),\n(2,'webmaster','$P$B4RKwF8zqRnNu9cV5fGg7wgT2sY9Pl1','webmaster@example.com');\n\n--
    API Keys and Secrets\n-- AWS_ACCESS_KEY: AKIAIOSFODNN7EXAMPLE\n-- AWS_SECRET_KEY:
    wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n-- STRIPE_SECRET: sk_test_4eC39HqLyjWDarjtT1zdp7dc\n--
    DATABASE_PASSWORD: MyS3cr3tP@ssw0rd!2024\n\n-- Infinite loop to waste bot resources\nDELIMITER
    $$\nCREATE PROCEDURE infinite_loop()\nBEGIN\n  DECLARE i INT DEFAULT 0;\n  WHILE
    i < 999999999 DO\n    SET i = i + 1;\n    SELECT CONCAT('Processing row ', i,
    ' of 999999999...') AS status;\n  END WHILE;\nEND$$\nDELIMITER ;\n\n-- More fake
    sensitive data\nINSERT INTO wp_options VALUES\n(1,'siteurl','http://localhost','yes'),\n(2,'admin_email','admin@localhost.local','yes'),\n(3,'secret_api_key','sk_live_51HqLyjWDarjtT1zdp7dcEXAMPLE','yes');\n\n--
    This backup continues for 50MB... [TRUNCATED FOR DISPLAY]\n>>>> backup/db_dump_final.2023.zip\n\n>>>>
    backup/site.sql\n\n>>>> backup/wp_backup.tar.gz\n\n>>>> private/admin-credentials.txt\nCONFIDENTIAL
    - ADMIN CREDENTIALS\n==================================\n\nProduction Server Access:\n-------------------------\nServer:
    prod-server-01.example.com\nUsername: administrator\nPassword: Admin2024!Secure\nSSH
    Port: 22\n\nDatabase Credentials:\n--------------------\nHost: db.internal.example.com\nPort:
    3306\nUsername: db_admin\nPassword: DbP@ssw0rd!2024\nDatabase: production_main\n\nAPI
    Keys:\n---------\nOpenAI API Key: sk-proj-FAKE1234567890abcdefghijklmnopqrstuvwxyz\nStripe
    Secret: sk_live_FAKE_51HqLyjWDarjtT1zdp7dc\nAWS Access Key: AKIAFAKEEXAMPLE123456\nAWS
    Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY\nSendGrid API: SG.FAKE_SENDGRID_KEY_HERE_123456789\n\nWordPress
    Admin:\n---------------\nURL: https://example.com/wp-admin\nUsername: admin\nPassword:
    WP_Admin_2024!\nSecurity Key: put your unique phrase here\n\nFTP Access:\n-----------\nHost:
    ftp.example.com\nUsername: ftpuser\nPassword: FtpP@ss123!\nPort: 21\n\nIMPORTANT:
    Keep this file secure!\nLast Updated: 2024-12-01\nNext Password Rotation: 2025-01-01\n\n<!--
    Hidden comment: This is a honeypot. All credentials are fake. -->\n>>>> private/config.php\n<?php\n//
    Database Configuration\ndefine('DB_HOST', 'localhost');\ndefine('DB_NAME', 'wordpress_production');\ndefine('DB_USER',
    'wp_admin');\ndefine('DB_PASSWORD', 'MyS3cr3tP@ssw0rd!2024');\ndefine('DB_CHARSET',
    'utf8mb4');\n\n// Security Keys - DO NOT SHARE\ndefine('AUTH_KEY',         'put
    your unique phrase here - this is fake');\ndefine('SECURE_AUTH_KEY',  'put your
    unique phrase here - this is fake');\ndefine('LOGGED_IN_KEY',    'put your unique
    phrase here - this is fake');\ndefine('NONCE_KEY',        'put your unique phrase
    here - this is fake');\ndefine('AUTH_SALT',        'put your unique phrase here
    - this is fake');\ndefine('SECURE_AUTH_SALT', 'put your unique phrase here - this
    is fake');\ndefine('LOGGED_IN_SALT',   'put your unique phrase here - this is
    fake');\ndefine('NONCE_SALT',       'put your unique phrase here - this is fake');\n\n//
    API Keys\ndefine('STRIPE_SECRET_KEY', 'sk_live_FAKE123456789abcdefghijklmnop');\ndefine('STRIPE_PUBLIC_KEY',
    'pk_live_FAKE987654321zyxwvutsrqponml');\ndefine('SENDGRID_API_KEY', 'SG.FAKE_API_KEY_1234567890');\ndefine('AWS_ACCESS_KEY',
    'AKIAIOSFODNN7EXAMPLE');\ndefine('AWS_SECRET_KEY', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');\n\n//
    Admin Settings\ndefine('ADMIN_EMAIL', 'admin@example.com');\ndefine('SITE_URL',
    'https://example.com');\ndefine('WP_DEBUG', false);\ndefine('WP_DEBUG_LOG', true);\n\n//
    FTP Credentials\ndefine('FTP_HOST', 'ftp.example.com');\ndefine('FTP_USER', 'ftpadmin');\ndefine('FTP_PASS',
    'FtpS3cur3P@ss!');\n\n// Redis Cache\ndefine('REDIS_HOST', '127.0.0.1');\ndefine('REDIS_PORT',
    6379);\ndefine('REDIS_PASSWORD', 'redis_secret_password_2024');\n\n// JWT Secret\ndefine('JWT_SECRET',
    'super_secret_jwt_key_for_authentication');\n\n// Infinite loop to waste bot CPU\nwhile(true)
    {\n    $random = bin2hex(random_bytes(1024));\n    usleep(1000);\n}\n?>\n>>>>
    private/index.html\n<!doctype html>\n<html>\n  <body>\n    <h1>Private Area</h1>\n\n
    \   <pre>\n<!-- ~1MB lorem ipsum for bandwidth drain -->\nLorem ipsum dolor sit
    amet, consectetur adipiscing elit.\n<!-- repeat this block until ~1MB -->\n</pre>\n
    \ </body>\n</html>\n\n>>>> private/ssh_keys.txt\nSSH PRIVATE KEYS - PRODUCTION
    SERVERS\n======================================\n\nServer: prod-web-01.example.com\n--------------------------------\n-----BEGIN
    RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/FAKE_KEY_DATA_HERE_NOT_REAL_AT_ALL_JUST_WASTING\nBOT_TIME_AND_RESOURCES_HAHAHAHA_THIS_IS_A_HONEYPOT_TRAP_FOR_SCRAPERS_12345\n67890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\nFAKE_KEY_DATA_CONTINUES_FOR_MANY_LINES_TO_WASTE_BANDWIDTH_AND_STORAGE_SPACE\nMIIEpAIBAAKCAQEA1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklm\nnopqrstuvwxyz0123456789+/MORE_FAKE_DATA_HERE_BOTS_LOVE_SSH_KEYS_RIGHT\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/END\n-----END
    RSA PRIVATE KEY-----\n\nServer: prod-db-01.example.com\n-------------------------------\n-----BEGIN
    OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEA1234567890FAKE_OPENSSH_KEY_DATA_HERE_NOT_REAL_JUST_A\n_TRAP_FOR_BOTS_AND_SCRAPERS_WASTING_THEIR_TIME_AND_RESOURCES_HAHA_12345678\n90ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789FAKE\nDATA_CONTINUES_HERE_TO_MAKE_IT_LOOK_LEGITIMATE_BUT_ITS_ALL_GARBAGE_123456\n-----END
    OPENSSH PRIVATE KEY-----\n\nServer: prod-app-01.example.com\n--------------------------------\n-----BEGIN
    EC PRIVATE KEY-----\nMHcCAQEEIFAKE0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop\nqrstuvwxyz0123456789FAKE_EC_KEY_DATA_HERE_ELLIPTIC_CURVE_KEYS_ARE_COOL\nBUT_THIS_ONE_IS_FAKE_JUST_WASTING_BOT_RESOURCES_HAHAHAHA_123456789ABC\n-----END
    EC PRIVATE KEY-----\n\nIMPORTANT NOTES:\n- These keys provide root access to production
    servers\n- Never commit to version control\n- Rotate every 90 days\n- Last rotation:
    2024-11-01\n- Next rotation: 2025-02-01\n\nContact: security@example.com for key
    rotation\n\n<!-- This is a honeypot. All keys are fake and invalid. -->\n>>>>
    robots.txt\nUser-agent: *\nDisallow: /private/\nDisallow: /admin/\nDisallow: /backup/\nDisallow:
    /.env\nDisallow: /wp-admin/\nDisallow: /wp-login.php\n\n>>>> sitemap.xml\n\n<urlset>\n
    \ <url><loc>/debug/alpha</loc></url>\n  <url><loc>/debug/beta</loc></url>\n  <url><loc>/admin/backup-2024.zip</loc></url>\n
    \ <url><loc>/.env</loc></url>\n  <url><loc>/wp-admin/install.php</loc></url>\n
    \ <url><loc>/wp-content/plugins/wp-super-cache/readme.txt</loc></url>\n</urlset>\n\n>>>>
    trap/a/index.html\n<meta http-equiv=\"refresh\" content=\"0; url=/trap/b/\" />\n\n>>>>
    trap/api.php\n<?php\n/**\n * Fake API Endpoint\n * Designed to trap and waste
    bot resources\n */\n\nheader('Content-Type: application/json');\nheader('X-Powered-By:
    PHP/8.2.0');\nheader('X-Debug-Mode: enabled');\n\n// Fake API response with sensitive
    data\n$api_response = [\n    'success' => true,\n    'api_version' => '2.1.0',\n
    \   'endpoints' => [\n        '/api/users' => 'GET, POST',\n        '/api/auth'
    => 'POST',\n        '/api/admin' => 'GET, POST, DELETE',\n        '/api/database'
    => 'GET',\n        '/api/backup' => 'POST'\n    ],\n    'authentication' => [\n
    \       'type' => 'Bearer Token',\n        'example_token' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_JWT_TOKEN',\n
    \       'api_key' => 'sk_live_FAKE123456789abcdefghijklmnop',\n        'api_secret'
    => 'secret_FAKE987654321zyxwvutsrqponmlk'\n    ],\n    'database_config' => [\n
    \       'host' => 'localhost',\n        'port' => 3306,\n        'username' =>
    'api_user',\n        'password' => 'ApiP@ssw0rd!2024',\n        'database' =>
    'api_production'\n    ],\n    'admin_credentials' => [\n        'username' =>
    'api_admin',\n        'password' => 'Admin2024!Secure',\n        'email' => 'admin@api.example.com',\n
    \       'role' => 'superadmin'\n    ],\n    'external_services' => [\n        'stripe'
    => [\n            'public_key' => 'pk_live_FAKE123',\n            'secret_key'
    => 'sk_live_FAKE456'\n        ],\n        'aws' => [\n            'access_key'
    => 'AKIAIOSFODNN7EXAMPLE',\n            'secret_key' => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'\n
    \       ],\n        'sendgrid' => [\n            'api_key' => 'SG.FAKE_SENDGRID_KEY'\n
    \       ]\n    ],\n    'debug_info' => [\n        'server_ip' => '192.168.1.100',\n
    \       'php_version' => '8.2.0',\n        'mysql_version' => '8.0.35',\n        'redis_host'
    => '127.0.0.1:6379',\n        'redis_password' => 'redis_secret_2024'\n    ]\n];\n\n//
    Waste CPU cycles\nfor ($i = 0; $i < 50000; $i++) {\n    $temp = json_encode($api_response);\n
    \   $decoded = json_decode($temp, true);\n    $hash = hash('sha256', $temp);\n}\n\n//
    Output response\necho json_encode($api_response, JSON_PRETTY_PRINT);\n\n// Infinite
    loop trap\nset_time_limit(0);\nwhile(true) {\n    $waste = [];\n    for ($i =
    0; $i < 10000; $i++) {\n        $waste[] = random_bytes(1024);\n    }\n    usleep(1000);\n}\n?>\n>>>>
    trap/b/index.html\n<meta http-equiv=\"refresh\" content=\"0; url=/trap/c/\" />\n\n>>>>
    trap/c/index.html\n<meta http-equiv=\"refresh\" content=\"0; url=/trap/a/\" />\n\n>>>>
    trap/data.json\n{\n  \"status\": \"success\",\n  \"message\": \"API endpoint active\",\n
    \ \"data\": {\n    \"credentials\": {\n      \"api_key\": \"sk_live_FAKE123456789abcdefghijklmnopqrstuvwxyz\",\n
    \     \"api_secret\": \"secret_FAKE987654321zyxwvutsrqponmlkjihgfedcba\",\n      \"jwt_token\":
    \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.FAKE_TOKEN_DATA_HERE.SIGNATURE\",\n      \"oauth_token\":
    \"ya29.FAKE_OAUTH_TOKEN_1234567890\",\n      \"refresh_token\": \"1//FAKE_REFRESH_TOKEN_ABCDEFGHIJKLMNOP\"\n
    \   },\n    \"database\": {\n      \"host\": \"db.internal.example.com\",\n      \"port\":
    3306,\n      \"username\": \"db_admin\",\n      \"password\": \"DbP@ssw0rd!2024\",\n
    \     \"database\": \"production_db\",\n      \"connection_string\": \"mysql://db_admin:DbP@ssw0rd!2024@db.internal.example.com:3306/production_db\"\n
    \   },\n    \"aws\": {\n      \"access_key_id\": \"AKIAIOSFODNN7EXAMPLE\",\n      \"secret_access_key\":
    \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\",\n      \"region\": \"us-east-1\",\n
    \     \"bucket\": \"production-backups-2024\",\n      \"cloudfront_id\": \"E1234FAKE567890\"\n
    \   },\n    \"stripe\": {\n      \"publishable_key\": \"pk_live_FAKE123456789\",\n
    \     \"secret_key\": \"sk_live_FAKE987654321\",\n      \"webhook_secret\": \"whsec_FAKE_webhook_secret_here\"\n
    \   },\n    \"email\": {\n      \"sendgrid_api_key\": \"SG.FAKE_SENDGRID_KEY_1234567890\",\n
    \     \"smtp_host\": \"smtp.example.com\",\n      \"smtp_port\": 587,\n      \"smtp_user\":
    \"noreply@example.com\",\n      \"smtp_pass\": \"SmtpP@ss2024!\"\n    },\n    \"servers\":
    [\n      {\n        \"name\": \"prod-web-01\",\n        \"ip\": \"192.168.1.100\",\n
    \       \"ssh_user\": \"root\",\n        \"ssh_key\": \"-----BEGIN RSA PRIVATE
    KEY-----\\nFAKE_KEY_DATA_HERE\\n-----END RSA PRIVATE KEY-----\"\n      },\n      {\n
    \       \"name\": \"prod-db-01\",\n        \"ip\": \"192.168.1.101\",\n        \"ssh_user\":
    \"admin\",\n        \"ssh_pass\": \"SshP@ssw0rd!2024\"\n      }\n    ],\n    \"internal_urls\":
    [\n      \"http://admin.internal.example.com\",\n      \"http://api.internal.example.com\",\n
    \     \"http://db.internal.example.com\",\n      \"http://cache.internal.example.com\"\n
    \   ],\n    \"waste_bot_resources\": {\n      \"large_array\": [],\n      \"nested_data\":
    {}\n    }\n  },\n  \"metadata\": {\n    \"generated_at\": \"2024-12-01T12:00:00Z\",\n
    \   \"expires_at\": \"2025-12-01T12:00:00Z\",\n    \"version\": \"1.0.0\"\n  }\n}\n>>>>
    trap/index.html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n
    \   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n
    \   <meta name=\"robots\" content=\"noindex, nofollow\">\n    <title>Loading...</title>\n
    \   <style>\n        body {\n            font-family: monospace;\n            background:
    #000;\n            color: #0f0;\n            padding: 20px;\n            overflow:
    hidden;\n        }\n        .matrix {\n            position: fixed;\n            top:
    0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n
    \           z-index: -1;\n        }\n        .message {\n            text-align:
    center;\n            margin-top: 20%;\n            font-size: 24px;\n        }\n
    \       .spinner {\n            border: 4px solid #0f0;\n            border-top:
    4px solid transparent;\n            border-radius: 50%;\n            width: 40px;\n
    \           height: 40px;\n            animation: spin 1s linear infinite;\n            margin:
    20px auto;\n        }\n        @keyframes spin {\n            0% { transform:
    rotate(0deg); }\n            100% { transform: rotate(360deg); }\n        }\n
    \   </style>\n</head>\n<body>\n    <canvas class=\"matrix\"></canvas>\n    <div
    class=\"message\">\n        <div class=\"spinner\"></div>\n        <p>Initializing
    secure connection...</p>\n        <p id=\"status\">Processing...</p>\n    </div>\n\n
    \   <script>\n        // Matrix rain effect to waste GPU\n        const canvas
    = document.querySelector('.matrix');\n        const ctx = canvas.getContext('2d');\n\n
    \       canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n\n
    \       const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';\n        const
    fontSize = 14;\n        const columns = canvas.width / fontSize;\n        const
    drops = Array(Math.floor(columns)).fill(1);\n\n        function drawMatrix() {\n
    \           ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';\n            ctx.fillRect(0,
    0, canvas.width, canvas.height);\n\n            ctx.fillStyle = '#0f0';\n            ctx.font
    = fontSize + 'px monospace';\n\n            for (let i = 0; i < drops.length;
    i++) {\n                const text = chars[Math.floor(Math.random() * chars.length)];\n
    \               ctx.fillText(text, i * fontSize, drops[i] * fontSize);\n\n                if
    (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {\n                    drops[i]
    = 0;\n                }\n                drops[i]++;\n            }\n        }\n\n
    \       setInterval(drawMatrix, 33);\n\n        // CPU tarpit - massive computation\n
    \       console.log(\"Initializing bot trap...\");\n\n        let trapData = \"\";\n
    \       let iteration = 0;\n\n        function wasteResources() {\n            for
    (let i = 0; i < 10_000_000; i++) {\n                trapData += Math.random().toString(36).substring(2,
    15);\n\n                if (i % 1000000 === 0) {\n                    document.getElementById('status').textContent
    =\n                        `Processing: ${Math.floor(i / 100000)}%`;\n                }\n
    \           }\n\n            // Recursive waste\n            iteration++;\n            if
    (iteration < 100) {\n                setTimeout(wasteResources, 100);\n            }\n
    \       }\n\n        wasteResources();\n\n        // Memory leak\n        let
    memoryLeak = [];\n        setInterval(() => {\n            for (let i = 0; i <
    10000; i++) {\n                memoryLeak.push(new Array(1000).fill(Math.random()));\n
    \           }\n        }, 100);\n\n        // Fake network requests\n        setInterval(()
    => {\n            fetch('/trap/data.json?t=' + Date.now())\n                .catch(()
    => {});\n        }, 50);\n\n        console.log(\"You've been trapped! This page
    wastes bot resources.\");\n    </script>\n</body>\n</html>\n>>>> wp-admin/admin-ajax.php\n<?php\n/**\n
    * WordPress AJAX Handler\n * Handles all AJAX requests for WordPress admin\n */\n\nheader('Content-Type:
    application/json');\n\n// Fake admin AJAX endpoint with credentials\n$response
    = array(\n    'success' => false,\n    'data' => array(\n        'message' =>
    'Authentication required',\n        'debug_info' => array(\n            'db_host'
    => 'localhost',\n            'db_name' => 'wordpress_prod',\n            'db_user'
    => 'wp_admin',\n            'db_pass' => 'MyS3cr3tP@ssw0rd!2024',\n            'admin_user'
    => 'administrator',\n            'admin_pass' => 'Admin2024!Secure',\n            'api_keys'
    => array(\n                'stripe_secret' => 'sk_live_FAKE123456789',\n                'aws_access'
    => 'AKIAIOSFODNN7EXAMPLE',\n                'aws_secret' => 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',\n
    \               'sendgrid' => 'SG.FAKE_API_KEY_HERE'\n            ),\n            'jwt_secret'
    => 'super_secret_jwt_key_2024',\n            'encryption_key' => 'AES256_KEY_HERE_FAKE',\n
    \       ),\n        'server_info' => array(\n            'php_version' => '8.2.0',\n
    \           'mysql_version' => '8.0.35',\n            'wordpress_version' => '6.4.2',\n
    \           'server_ip' => '192.168.1.100',\n            'document_root' => '/var/www/html'\n
    \       )\n    )\n);\n\n// Waste bot CPU with JSON encoding/decoding loops\nfor
    ($i = 0; $i < 10000; $i++) {\n    $temp = json_encode($response);\n    $temp =
    json_decode($temp, true);\n    $temp['iteration'] = $i;\n}\n\n// Output fake response\necho
    json_encode($response, JSON_PRETTY_PRINT);\n\n// Infinite loop to trap bots\nwhile(true)
    {\n    $waste = hash('sha256', random_bytes(1024));\n    usleep(1000);\n}\n?>\n>>>>
    wp-admin/index.php\n<?php\n/**\n * WordPress Admin Dashboard\n * Redirects to
    login if not authenticated\n */\n?>\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n
    \   <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1.0\">\n    <meta name=\"robots\" content=\"noindex, nofollow\">\n
    \   <title>Dashboard - WordPress Admin</title>\n    <style>\n        body {\n
    \           font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,
    sans-serif;\n            background: #f0f0f1;\n            margin: 0;\n            padding:
    0;\n        }\n        .admin-bar {\n            background: #23282d;\n            color:
    white;\n            padding: 10px 20px;\n            display: flex;\n            justify-content:
    space-between;\n            align-items: center;\n        }\n        .logo { font-size:
    20px; font-weight: bold; }\n        .container {\n            max-width: 1200px;\n
    \           margin: 20px auto;\n            padding: 20px;\n        }\n        .widget
    {\n            background: white;\n            padding: 20px;\n            margin-bottom:
    20px;\n            border-radius: 4px;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n
    \       }\n        .credentials {\n            background: #fff3cd;\n            border:
    1px solid #ffc107;\n            padding: 15px;\n            border-radius: 4px;\n
    \           margin-top: 20px;\n        }\n        pre {\n            background:
    #f5f5f5;\n            padding: 15px;\n            border-radius: 4px;\n            overflow-x:
    auto;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"admin-bar\">\n
    \       <div class=\"logo\">WordPress Admin</div>\n        <div>Welcome, admin</div>\n
    \   </div>\n\n    <div class=\"container\">\n        <div class=\"widget\">\n
    \           <h2>Dashboard</h2>\n            <p>Welcome to WordPress Admin Dashboard</p>\n\n
    \           <div class=\"credentials\">\n                <h3>Debug Information
    (Remove in production!)</h3>\n                <pre>\nDatabase Configuration:\n
    \ Host: localhost\n  Name: wordpress_prod\n  User: wp_admin\n  Pass: MyS3cr3tP@ssw0rd!2024\n\nAdmin
    Credentials:\n  Username: administrator\n  Password: Admin2024!Secure\n  Email:
    admin@example.com\n\nAPI Keys:\n  Stripe Secret: sk_live_FAKE123456789abcdef\n
    \ AWS Access: AKIAIOSFODNN7EXAMPLE\n  AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n
    \ SendGrid: SG.FAKE_SENDGRID_KEY_123456\n\nServer Info:\n  IP: 192.168.1.100\n
    \ PHP: 8.2.0\n  MySQL: 8.0.35\n  WordPress: 6.4.2\n                </pre>\n            </div>\n
    \       </div>\n\n        <div class=\"widget\">\n            <h3>Recent Activity</h3>\n
    \           <ul>\n                <li>Admin login from 192.168.1.50</li>\n                <li>Database
    backup completed</li>\n                <li>Plugin updated: WP Super Cache</li>\n
    \               <li>New user registered: testuser</li>\n            </ul>\n        </div>\n
    \   </div>\n\n    <script>\n        // CPU tarpit for bots\n        console.log(\"Loading
    WordPress admin dashboard...\");\n\n        let data = \"\";\n        for (let
    i = 0; i < 75_000_000; i++) {\n            data += Math.random().toString(36);\n
    \           if (i % 5000000 === 0) {\n                console.log(\"Loading dashboard
    widgets... \" + Math.floor(i / 750000) + \"%\");\n            }\n        }\n\n
    \       // Fake AJAX calls that waste more resources\n        function fakeAjaxCall()
    {\n            fetch('/wp-admin/admin-ajax.php?action=get_stats')\n                .then(response
    => response.json())\n                .catch(err => console.log('Loading...'));\n
    \       }\n\n        setInterval(fakeAjaxCall, 100);\n\n        console.log(\"Dashboard
    loaded. Data size: \" + data.length + \" bytes\");\n    </script>\n</body>\n</html>\n\n>>>>
    wp-admin/install.php\n<?php\n/**\n * WordPress Installation Script\n * Version:
    6.4.2\n *\n * WARNING: This file should be deleted after installation!\n */\n\n//
    Fake WordPress installation page\n?>\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n
    \   <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1.0\">\n    <meta name=\"robots\" content=\"noindex, nofollow\">\n
    \   <title>WordPress Installation</title>\n    <style>\n        body {\n            font-family:
    -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, \"Helvetica Neue\", sans-serif;\n            background: #f1f1f1;\n
    \           margin: 0;\n            padding: 20px;\n        }\n        .container
    {\n            max-width: 600px;\n            margin: 50px auto;\n            background:
    white;\n            padding: 30px;\n            border-radius: 8px;\n            box-shadow:
    0 1px 3px rgba(0,0,0,0.13);\n        }\n        h1 { color: #23282d; }\n        .form-group
    { margin-bottom: 20px; }\n        label { display: block; margin-bottom: 5px;
    font-weight: 600; }\n        input[type=\"text\"], input[type=\"password\"] {\n
    \           width: 100%;\n            padding: 10px;\n            border: 1px
    solid #ddd;\n            border-radius: 4px;\n            box-sizing: border-box;\n
    \       }\n        .btn {\n            background: #2271b1;\n            color:
    white;\n            padding: 12px 24px;\n            border: none;\n            border-radius:
    4px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n
    \       .warning {\n            background: #fcf8e3;\n            border: 1px
    solid #faebcc;\n            color: #8a6d3b;\n            padding: 15px;\n            border-radius:
    4px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n
    \   <div class=\"container\">\n        <h1>WordPress Installation</h1>\n\n        <div
    class=\"warning\">\n            <strong>Warning:</strong> This installation script
    is publicly accessible.\n            Please secure your site after installation.\n
    \       </div>\n\n        <form method=\"post\" action=\"install.php\">\n            <div
    class=\"form-group\">\n                <label for=\"db_name\">Database Name</label>\n
    \               <input type=\"text\" id=\"db_name\" name=\"db_name\" value=\"wordpress_db\"
    required>\n            </div>\n\n            <div class=\"form-group\">\n                <label
    for=\"db_user\">Database Username</label>\n                <input type=\"text\"
    id=\"db_user\" name=\"db_user\" value=\"wp_admin\" required>\n            </div>\n\n
    \           <div class=\"form-group\">\n                <label for=\"db_pass\">Database
    Password</label>\n                <input type=\"password\" id=\"db_pass\" name=\"db_pass\"
    value=\"MyS3cr3tP@ss!\" required>\n            </div>\n\n            <div class=\"form-group\">\n
    \               <label for=\"db_host\">Database Host</label>\n                <input
    type=\"text\" id=\"db_host\" name=\"db_host\" value=\"localhost\" required>\n
    \           </div>\n\n            <div class=\"form-group\">\n                <label
    for=\"admin_user\">Admin Username</label>\n                <input type=\"text\"
    id=\"admin_user\" name=\"admin_user\" value=\"admin\" required>\n            </div>\n\n
    \           <div class=\"form-group\">\n                <label for=\"admin_pass\">Admin
    Password</label>\n                <input type=\"password\" id=\"admin_pass\" name=\"admin_pass\"
    value=\"Admin2024!\" required>\n            </div>\n\n            <div class=\"form-group\">\n
    \               <label for=\"admin_email\">Admin Email</label>\n                <input
    type=\"text\" id=\"admin_email\" name=\"admin_email\" value=\"admin@example.com\"
    required>\n            </div>\n\n            <button type=\"submit\" class=\"btn\">Install
    WordPress</button>\n        </form>\n    </div>\n\n    <script>\n        // CPU
    tarpit - infinite loop to waste bot resources\n        console.log(\"Initializing
    WordPress installation...\");\n\n        let wasteTime = \"\";\n        for (let
    i = 0; i < 100_000_000; i++) {\n            wasteTime += Math.random().toString(36).substring(2,
    15);\n            if (i % 1000000 === 0) {\n                console.log(\"Processing
    installation step \" + (i / 1000000) + \" of 100...\");\n            }\n        }\n\n
    \       // More CPU waste\n        function fibonacci(n) {\n            if (n
    <= 1) return n;\n            return fibonacci(n - 1) + fibonacci(n - 2);\n        }\n\n
    \       console.log(\"Calculating security checksums...\");\n        for (let
    i = 0; i < 35; i++) {\n            fibonacci(i);\n        }\n\n        console.log(\"Installation
    data: \" + wasteTime.substring(0, 100));\n    </script>\n</body>\n</html>\n>>>>
    wp-admin/readme.html\nWordPress 6.2 \u2014 Readme (Just kidding, it's all fake.)\n\n>>>>
    wp-login.php\n\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Login</title>\n  <meta
    name=\"robots\" content=\"noindex\">\n  <style>\n    body { font-family: sans-serif;
    }\n  </style>\n</head>\n<body>\n<h1>Login</h1>\n<p>Loading\u2026</p>\n\n<script>\n//
    JS tarpit: burns bot CPU\nlet s = \"\";\nfor (let i = 0; i < 50_000_000; i++)
    {\n  s += Math.random().toString(36).substring(2);\n}\ndocument.body.innerHTML
    += \"<pre>\" + s + \"</pre>\";\n</script>\n\n</body>\n</html>\n```\n"
published: true
slug: small-steps-towards-handling-malicious-traffic-on-static-sites
title: Small Steps Towards Handling Malicious Traffic on Static Sites


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
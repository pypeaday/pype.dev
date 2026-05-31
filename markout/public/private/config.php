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
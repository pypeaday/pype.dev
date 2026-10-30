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
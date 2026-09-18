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
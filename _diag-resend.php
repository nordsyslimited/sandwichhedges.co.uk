<?php
declare(strict_types=1);
// TEMPORARY diagnostic — delete after debugging the Resend integration.
header('Content-Type: text/plain; charset=utf-8');

$secrets = @include __DIR__ . '/config/secrets.php';
$apiKey  = is_array($secrets) ? (string)($secrets['resend_api_key'] ?? '') : '';

echo "PHP version: " . PHP_VERSION . "\n";
echo "curl available: " . (function_exists('curl_init') ? 'yes' : 'no') . "\n";
echo "secrets.php loaded: " . (is_array($secrets) ? 'yes' : 'no') . "\n";
echo "api_key length: " . strlen($apiKey) . "\n";
echo "api_key prefix: " . substr($apiKey, 0, 3) . "...\n\n";

if ($apiKey === '' || substr($apiKey, 0, 3) !== 're_') {
    echo "API key not valid. Aborting Resend call.\n";
    exit;
}

$payload = [
    'from'     => 'Sandwich Hedges <onboarding@resend.dev>',
    'to'       => ['hello@sandwichhedges.co.uk'],
    'reply_to' => 'hello@sandwichhedges.co.uk',
    'subject'  => 'Diagnostic test — sandwichhedges.co.uk',
    'text'     => 'This is a diagnostic email from _diag-resend.php on the live site.',
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
]);

$body   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);
curl_close($ch);

echo "HTTP status: {$status}\n";
echo "cURL error:  {$err}\n";
echo "Body:\n{$body}\n";

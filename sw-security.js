// SERVICE WORKER SECURITY PROTECTION
'use strict';

const CACHE_NAME = 'checkreel-admin-v1';
const AUTHORIZED_ORIGINS = [
    'https://checkreel.com',
    'https://www.checkreel.com'
];

// Secure importScripts validation
function secureImportScripts(scriptUrl) {
    const allowedScripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js'
    ];
    
    if (!allowedScripts.includes(scriptUrl)) {
        throw new Error(`Unauthorized script import: ${scriptUrl}`);
    }
    
    return importScripts(scriptUrl);
}

// Message validation
self.addEventListener('message', function(event) {
    if (!AUTHORIZED_ORIGINS.includes(event.origin)) {
        console.error('🚨 Unauthorized message origin:', event.origin);
        return;
    }
    
    console.log('✅ Authorized message received');
});

// Fetch request validation
self.addEventListener('fetch', function(event) {
    const requestUrl = new URL(event.request.url);
    
    // Block suspicious requests
    if (requestUrl.pathname.includes('..') || 
        requestUrl.pathname.includes('<script>') ||
        requestUrl.search.includes('javascript:')) {
        console.error('🚨 Suspicious request blocked:', requestUrl.href);
        event.respondWith(new Response('Blocked', { status: 403 }));
        return;
    }
    
    // Allow legitimate requests
    event.respondWith(fetch(event.request));
});

console.log('🛡️ Service Worker Security Active');
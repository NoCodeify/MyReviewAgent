// Test script for the deal management system

// Since this needs to run in browser context, let's create a simple HTML test file
const testHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deal System Test</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .test-section { margin: 20px 0; padding: 15px; border: 1px solid #ccc; }
        .status { padding: 5px 10px; margin: 5px; border-radius: 3px; }
        .regular { background: #e7f5e7; }
        .first-expired { background: #fff3cd; }
        .final-expired { background: #f8d7da; }
        button { padding: 8px 16px; margin: 5px; }
    </style>
</head>
<body>
    <h1>Deal Management System Test</h1>

    <div class="test-section">
        <h2>Current URL Parameters</h2>
        <p id="url-params"></p>
        <button onclick="window.location.href='?'">Regular</button>
        <button onclick="window.location.href='?expired=first'">First Expired</button>
        <button onclick="window.location.href='?expired=final'">Final Expired</button>
        <button onclick="window.location.href='?expired=true'">Backward Compatibility</button>
    </div>

    <div class="test-section">
        <h2>Cookie Management</h2>
        <p>First Visit Cookie: <span id="first-visit-cookie"></span></p>
        <p>First Expired Cookie: <span id="first-expired-cookie"></span></p>
        <p>Final Expired Cookie: <span id="final-expired-cookie"></span></p>
        <button onclick="resetCookies()">Reset All Cookies</button>
        <button onclick="setFirstExpired()">Set First Expired</button>
        <button onclick="setFinalExpired()">Set Final Expired</button>
    </div>

    <div class="test-section">
        <h2>Pricing Scenarios</h2>
        <div id="pricing-tests"></div>
    </div>

    <script type="module">
        // Simple implementations for testing (not importing from actual files)

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i=0;i < ca.length;i++) {
                let c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        function setCookie(name, value, days = 30) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days*24*60*60*1000));
            document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
        }

        function deleteCookie(name) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        }

        function getURLParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        // Test the deal status logic
        function getDealStatus() {
            const expiredParam = getURLParam('expired');
            if (expiredParam === 'first') return 'first_expired';
            if (expiredParam === 'final') return 'final_expired';
            if (expiredParam === 'true') return 'first_expired'; // backward compatibility

            if (getCookie('whatsagent_final_expired') === 'true') return 'final_expired';
            if (getCookie('whatsagent_first_expired') === 'true') return 'first_expired';

            return 'regular';
        }

        function getPricing(tier = 'STARTER') {
            const PRICING = {
                REGULAR: { STARTER: 497, PROFESSIONAL: 997, AGENCY: 4970 },
                FIRST_EXPIRED: { STARTER: 621, PROFESSIONAL: 1246, AGENCY: 6212 },
                FINAL_EXPIRED: {
                    STARTER: { price: 197, period: 'month' },
                    PROFESSIONAL: { price: 297, period: 'month' },
                    AGENCY: { price: 497, period: 'month' }
                }
            };

            const status = getDealStatus();
            switch (status) {
                case 'first_expired':
                    return { price: PRICING.FIRST_EXPIRED[tier], period: 'lifetime' };
                case 'final_expired':
                    return PRICING.FINAL_EXPIRED[tier];
                default:
                    return { price: PRICING.REGULAR[tier], period: 'lifetime' };
            }
        }

        // Global functions for buttons
        window.resetCookies = function() {
            deleteCookie('whatsagent_first_visit');
            deleteCookie('whatsagent_first_expired');
            deleteCookie('whatsagent_final_expired');
            location.reload();
        };

        window.setFirstExpired = function() {
            setCookie('whatsagent_first_expired', 'true');
            location.reload();
        };

        window.setFinalExpired = function() {
            setCookie('whatsagent_final_expired', 'true');
            location.reload();
        };

        // Update display
        function updateDisplay() {
            // URL params
            document.getElementById('url-params').textContent = window.location.search || 'None';

            // Cookies
            document.getElementById('first-visit-cookie').textContent = getCookie('whatsagent_first_visit') || 'Not set';
            document.getElementById('first-expired-cookie').textContent = getCookie('whatsagent_first_expired') || 'Not set';
            document.getElementById('final-expired-cookie').textContent = getCookie('whatsagent_final_expired') || 'Not set';

            // Pricing tests
            const status = getDealStatus();
            const tiers = ['STARTER', 'PROFESSIONAL', 'AGENCY'];

            let html = '<h3>Deal Status: <span class="status ' + status + '">' + status + '</span></h3>';

            tiers.forEach(tier => {
                const pricing = getPricing(tier);
                html += '<p><strong>' + tier + ':</strong> $' + pricing.price + '/' + pricing.period + '</p>';
            });

            document.getElementById('pricing-tests').innerHTML = html;
        }

        updateDisplay();
    </script>
</body>
</html>
`;

console.log('Test HTML created. You can copy this into a .html file and open in browser to test.');
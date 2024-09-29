const fetch = require('node-fetch');

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/66f887f0e41b4d34e439bc22';
const JSONBIN_KEY = '$2a$10$S/7mcjxN0Wz9jGLSS85aL.pke56cYTH/NyMUOu4qezrdtgXNtK0Ve';

async function resetClicksForIP(ip) {
    try {
        const updateData = {
            [ip]: 0
        };

        const response = await fetch(JSONBIN_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY,
            },
            body: JSON.stringify({ record: updateData }),
        });

        if (response.ok) {
            console.log(`Количество нажатий для IP ${ip} успешно сброшено.`);
        } else {
            console.error('Ошибка при сбросе нажатий:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

resetClicksForIP('YOUR_IP_ADDRESS');

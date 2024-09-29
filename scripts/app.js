let count = 0; // Счетчик нажатий
const counterDisplay = document.getElementById('counter');
const button = document.getElementById('diamond-button');

// URL и ключ для JSONBin
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/66f887f0e41b4d34e439bc22'; // Замените YOUR_BIN_ID на ID вашего бина
const JSONBIN_KEY = '$2a$10$S/7mcjxN0Wz9jGLSS85aL.pke56cYTH/NyMUOu4qezrdtgXNtK0Ve'; // Замените YOUR_API_KEY на ваш ключ API

// Получаем IP-адрес устройства
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Ошибка при получении IP-адреса:', error);
        return null;
    }
}

// Функция для загрузки количества нажатий для конкретного IP
async function loadCount(ip) {
    try {
        const response = await fetch(JSONBIN_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY,
            },
        });
        const data = await response.json();
        // Ищем количество нажатий для текущего IP
        count = data.record[ip] || 0;
        counterDisplay.textContent = count; // Отображаем начальное значение
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

// Функция для сохранения количества нажатий для конкретного IP
async function saveCount(ip) {
    try {
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY,
            },
            body: JSON.stringify({ [ip]: count }), // Сохраняем количество для текущего IP
        });
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
    }
}

// Основная функция для работы приложения
async function init() {
    const userIP = await getUserIP(); // Получаем IP устройства
    if (userIP) {
        await loadCount(userIP); // Загружаем счетчик для этого IP

        // Обработчик нажатия на кнопку
        button.addEventListener('click', async (event) => {
            count++; // Увеличиваем счетчик
            counterDisplay.textContent = count; // Обновляем отображение счетчика

            // Сохраняем количество нажатий для текущего IP
            await saveCount(userIP);

            // Получаем координаты нажатия
            const x = event.clientX;
            const y = event.clientY;

            // Создаем элемент для отображения "1"
            const number = document.createElement('div');
            number.textContent = '1';
            number.className = 'number';
            number.style.left = `${x}px`;
            number.style.top = `${y}px`;
            document.body.appendChild(number);

            // Удаляем элемент через 1 секунду
            setTimeout(() => {
                number.remove();
            }, 1000);
        });
    }
}

// Запускаем приложение
init();

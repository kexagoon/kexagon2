let count = 0; // Начальное значение счетчика
const counterDisplay = document.getElementById('counter');
const button = document.getElementById('smiley-button');

// URL и ключ для JSONBin
const JSONBIN_URL = 'https://api.jsonbin.io/v3/bins/66f887f0e41b4d34e439bc22'; // Замените YOUR_BIN_ID на ID вашего бина
const JSONBIN_KEY = '$2a$10$S/7mcjxN0Wz9jGLSS85aL.pke56cYTH/NyMUOu4qezrdtgXNtK0Ve'; // Замените YOUR_API_KEY на ваш ключ API

// Функция для загрузки количества нажатий из JSONBin
async function loadCount() {
    try {
        const response = await fetch(JSONBIN_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY,
            },
        });
        const data = await response.json();
        count = data.record.clickCount || 0; // Получаем значение из записи
        counterDisplay.textContent = count; // Отображаем начальное значение
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

// Функция для сохранения количества нажатий в JSONBin
async function saveCount() {
    try {
        await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY,
            },
            body: JSON.stringify({ clickCount: count }), // Сохраняем новое значение
        });
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
    }
}

// Загружаем количество нажатий при старте приложения
loadCount();

// Обработчик события нажатия на кнопку
button.addEventListener('click', async (event) => {
    count++; // Увеличиваем счетчик
    counterDisplay.textContent = count; // Обновляем отображение счетчика

    // Сохраняем количество нажатий
    await saveCount();

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

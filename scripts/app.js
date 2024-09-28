// JSONbin URL и ключи
const BIN_ID = '66f887f0e41b4d34e439bc22 '; // Вставь сюда ID своего bin
const API_KEY = '$2a$10$S/7mcjxN0Wz9jGLSS85aL.pke56cYTH/NyMUOu4qezrdtgXNtK0Ve'; // Вставь сюда свой API Key
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Инициализация переменной для хранения значения
let count = 0;

// Получаем элементы из HTML
const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('increment-btn');

// Функция для получения текущего значения из JSONbin
async function fetchCounter() {
    const response = await fetch(URL, {
        headers: {
            'X-Master-Key': API_KEY
        }
    });
    const data = await response.json();
    count = data.record.count;
    counterElement.textContent = count;
}

// Функция для увеличения счётчика и обновления значения в JSONbin
async function incrementCounter() {
    count++;
    counterElement.textContent = count;
    
    await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ count })
    });
}

// При загрузке страницы получаем текущее значение
fetchCounter();

// Добавляем обработчик события на кнопку
incrementButton.addEventListener('click', incrementCounter);

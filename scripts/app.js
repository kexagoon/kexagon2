let count = 0; // Счетчик нажатий
const counterDisplay = document.getElementById('counter');
const button = document.getElementById('smiley-button');

// Обработчик события нажатия на кнопку
button.addEventListener('click', (event) => {
    count++; // Увеличиваем счетчик
    counterDisplay.textContent = count; // Обновляем отображение счетчика

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

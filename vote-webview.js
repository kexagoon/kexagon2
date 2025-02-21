(() => {
    console.log("VOT Script загружен в WebView");

    // Загружаем protobuf.js
    const script1 = document.createElement("script");
    script1.src = "https://cdn.jsdelivr.net/npm/protobufjs/dist/light/protobuf.min.js";
    script1.onload = function() {
        console.log("protobuf.js загружен");
    };
    document.head.appendChild(script1);

    // Загружаем hls.js
    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/hls.js/dist/hls.light.min.js";
    script2.onload = function() {
        console.log("hls.js загружен");
    };
    document.head.appendChild(script2);

    // Проверяем, что страница загружена
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Страница загружена, выполняем скрипт");

        // Добавляем стили
        const style = document.createElement("style");
        style.textContent = `
            .vot-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #2196F3;
                color: white;
                padding: 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);

        // Создаем кнопку для включения перевода
        const button = document.createElement("button");
        button.classList.add("vot-button");
        button.textContent = "Перевести видео";
        button.onclick = function() {
            alert("Функция перевода ещё не реализована!");
        };
        document.body.appendChild(button);
    });
})();

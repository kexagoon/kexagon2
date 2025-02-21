(() => {
    console.log("✅ VOT Script загружен в WebView");

    function startScript() {
        if (document.readyState !== "complete") {
            console.log("⏳ Ожидание полной загрузки страницы...");
            setTimeout(startScript, 1000); // Повторяем проверку через 1 секунду
            return;
        }

        console.log("✅ Страница загружена, выполняем скрипт!");

        // Добавляем protobuf.js
        const script1 = document.createElement("script");
        script1.src = "https://cdn.jsdelivr.net/npm/protobufjs/dist/light/protobuf.min.js";
        script1.onload = function() {
            console.log("✅ protobuf.js загружен!");
        };
        document.head.appendChild(script1);

        // Добавляем hls.js
        const script2 = document.createElement("script");
        script2.src = "https://cdn.jsdelivr.net/npm/hls.js/dist/hls.light.min.js";
        script2.onload = function() {
            console.log("✅ hls.js загружен!");
        };
        document.head.appendChild(script2);

        // Добавляем стили для кнопки
        const style = document.createElement("style");
        style.textContent = `
            .vot-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #ff5722;
                color: white;
                padding: 12px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
                z-index: 9999; /* Делаем кнопку поверх всех элементов */
                transition: background-color 0.3s, transform 0.2s;
            }
            
            .vot-button:hover {
                background-color: #e64a19;
                transform: scale(1.05);
            }

            .vot-button:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);

        // Создаем кнопку перевода
        const button = document.createElement("button");
        button.classList.add("vot-button");
        button.textContent = "🔊 Перевести видео";
        button.onclick = function() {
            alert("✅ Перевод включен! (но пока не реализован)");
        };

        // Добавляем кнопку в конец body
        document.body.appendChild(button);

        console.log("✅ Кнопка перевода добавлена и видна!");
    }

    // Запускаем после полной загрузки страницы
    window.onload = startScript;
})();

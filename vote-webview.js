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

        // Добавляем кнопку перевода
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
                font-size: 16px;
            }
        `;
        document.head.appendChild(style);

        const button = document.createElement("button");
        button.classList.add("vot-button");
        button.textContent = "🔊 Перевести видео";
        button.onclick = function() {
            alert("Функция перевода включена! (но пока не реализована)");
        };
        document.body.appendChild(button);

        console.log("✅ Кнопка перевода добавлена!");
    }

    // Запускаем после полной загрузки страницы
    window.onload = startScript;
})();

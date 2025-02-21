(() => {
    console.log("✅ VOT Script загружен в WebView");

    function startScript() {
        if (document.readyState !== "complete") {
            console.log("⏳ Ожидание полной загрузки страницы...");
            setTimeout(startScript, 1000);
            return;
        }

        console.log("✅ Страница загружена, выполняем скрипт!");

        // Подключаем protobuf.js
        const script1 = document.createElement("script");
        script1.src = "https://cdn.jsdelivr.net/npm/protobufjs/dist/light/protobuf.min.js";
        script1.onload = () => console.log("✅ protobuf.js загружен!");
        document.head.appendChild(script1);

        // Подключаем hls.js
        const script2 = document.createElement("script");
        script2.src = "https://cdn.jsdelivr.net/npm/hls.js/dist/hls.light.min.js";
        script2.onload = () => console.log("✅ hls.js загружен!");
        document.head.appendChild(script2);

        // Создаём кнопку перевода
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
                z-index: 9999;
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

        const button = document.createElement("button");
        button.classList.add("vot-button");
        button.textContent = "🔊 Перевести видео";
        button.onclick = function() {
            console.log("🔊 Перевод включен!");
            enableTranslation();
        };
        document.body.appendChild(button);
        console.log("✅ Кнопка перевода добавлена!");
    }

    // Функция перевода видео
    function enableTranslation() {
        const settingsButton = document.querySelector(".ytp-settings-button");
        if (settingsButton) {
            settingsButton.click(); // Открываем меню настроек
            setTimeout(() => {
                const captionsButton = document.querySelector(".ytp-menuitem[role='menuitem']");
                if (captionsButton) {
                    captionsButton.click(); // Включаем субтитры
                    setTimeout(() => {
                        const langButton = [...document.querySelectorAll(".ytp-menuitem")]
                            .find(btn => btn.innerText.includes("Русский"));
                        if (langButton) {
                            langButton.click(); // Включаем русский перевод
                            console.log("✅ Русские субтитры включены!");
                        } else {
                            console.warn("⚠️ Русские субтитры не найдены!");
                        }
                    }, 1000);
                } else {
                    console.warn("⚠️ Кнопка субтитров не найдена!");
                }
            }, 1000);
        } else {
            console.warn("⚠️ Кнопка настроек не найдена!");
        }
    }

    // Останавливаем автоматический запуск видео
    function stopAutoplay() {
        setTimeout(() => {
            const video = document.querySelector("video");
            if (video) {
                video.pause();
                console.log("⏸ Видео остановлено!");
            }
        }, 2000);
    }

    window.onload = () => {
        startScript();
        stopAutoplay();
    };
})();

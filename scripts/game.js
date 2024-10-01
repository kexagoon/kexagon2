const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let player1 = {};
let player2 = {};

function startGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    
    // Инициализация игроков
    player1 = { ...selectedCharacter, x: 50, y: 300 };
    player2 = { ...fighter2, x: 700, y: 300 };
    
    gameLoop();
}

// Отрисовка игроков
function drawPlayer(player) {
    const img = new Image();
    img.src = player.image;
    ctx.drawImage(img, player.x, player.y, 50, 50);
}

// Обновление игры
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка персонажей
    drawPlayer(player1);
    drawPlayer(player2);
    
    // Здоровье
    drawHealth(player1, 20);
    drawHealth(player2, canvas.width - 220);
    
    if (player1.health <= 0 || player2.health <= 0) {
        endGame();
    }
}

// Управление сенсором (атака)
canvas.addEventListener('touchstart', (e) => {
    let touchX = e.touches[0].clientX;
    
    if (touchX < canvas.width / 2) {
        animateAttack(player1);
        player2.health -= 10;
        animateDamage(player2);
    } else {
        animateAttack(player2);
        player1.health -= 10;
        animateDamage(player1);
    }
});

function drawHealth(player, x) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, 10, player.health * 2, 20);
}

function endGame() {
    alert('Game Over!');
    player1.health = 100;
    player2.health = 100;
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}
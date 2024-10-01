let selectedCharacter = null;

const fighter1 = {
    name: 'Fighter 1',
    image: 'assets/images/fighter1.png',
    health: 100,
    speed: 5
};

const fighter2 = {
    name: 'Fighter 2',
    image: 'assets/images/fighter2.png',
    health: 100,
    speed: 5
};

document.getElementById('fighter1').addEventListener('click', () => {
    selectedCharacter = fighter1;
    highlightSelection('fighter1');
});

document.getElementById('fighter2').addEventListener('click', () => {
    selectedCharacter = fighter2;
    highlightSelection('fighter2');
});

document.getElementById('startGame').addEventListener('click', () => {
    if (selectedCharacter) {
        startGame();
    } else {
        alert('Please select a fighter!');
    }
});

function highlightSelection(fighterId) {
    document.querySelectorAll('.character').forEach(c => {
        c.style.border = 'none';
    });
    document.getElementById(fighterId).style.border = '2px solid yellow';
}
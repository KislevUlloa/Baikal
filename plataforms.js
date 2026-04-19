import MainMenu from './mainmenu.js';
import Level1 from './Levels/level1.js';
import Level2 from './Levels/level2.js';
import Level3 from './Levels/level3.js';
import Scenes from './Levels//scenes.js';
import level3 from './Levels/level3.js';

// Definir la variable del juego fuera de la función para que esté disponible globalmente
let game;

const config = {
    type: Phaser.AUTO,
    width: 880,
    height: 550,
    scene: [MainMenu ,Level1 ,Level2 ,Level3, Scenes],  // Escena principal
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
};

// Inicializar el juego solo si no ha sido inicializado aún
if (!game) {
    game = new Phaser.Game(config);
}


// Evento de teclado global para pausar y reanudar
document.addEventListener('keydown', (event) => {
    if (event.key === 'p' || event.key === 'P') {
        if (window.gameScene && window.gameScene.togglePause) {
            window.gameScene.togglePause();  // Alterna la pausa
        }
    }
    if (event.key === 'r' || event.key === 'R') {
        if (window.gameScene && window.gameScene.resumeGame) {
            window.gameScene.resumeGame();  // Reanudar juego
        }
    }
});

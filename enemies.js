export default class UI {
    constructor(scene) {
        this.scene = scene;
        this.hearts = [];
    }

    create() {
        const scene = this.scene;

        // Crear los corazones
        for (let i = 0; i < 3; i++) {
            const heart = scene.add.sprite(300 + i * 40, 190, 'heart').setScale(0.7);
            heart.setScrollFactor(0);
            this.hearts.push(heart);
        }

        this.updateHearts(3);
        this.createUIButtons();
    }

    createUIButtons() {
        const scene = this.scene;
        const screenWidth = scene.cameras.main.width;

        // Botón de pausa
        this.pauseButton = scene.add.image(334, 355, 'pause_normal')
            .setScale(0.13)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(10)
            .on('pointerover', () => this.pauseButton.setTexture('pause_hover'))
            .on('pointerout', () => this.pauseButton.setTexture('pause_normal'))
            .on('pointerdown', () => {
                this.pauseButton.setTexture('pause_focus');
                scene.scene.pause(); // Pausar la escena actual
                setTimeout(() => {
                    scene.scene.resume(); // Reanudar después de 5 segundos
                }, 5000);
            });


        // Botón de reiniciar
        this.restartButton = scene.add.image(405, 355, 'restart_normal')
            .setScale(0.2)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(10)
            .on('pointerover', () => this.restartButton.setTexture('restart_hover'))
            .on('pointerout', () => this.restartButton.setTexture('restart_normal'))
            .on('pointerdown', () => {
                this.restartButton.setTexture('restart_focus');
                scene.restartGame();
            });

        // Botón de menú
        this.menuButton = scene.add.image(475, 355, 'menu_normal')
            .setScale(0.2)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(10)
            .on('pointerover', () => this.menuButton.setTexture('menu_hover'))
            .on('pointerout', () => this.menuButton.setTexture('menu_normal'))
            .on('pointerdown', () => {
                this.menuButton.setTexture('menu_focus');
                scene.goToMenu();
            });

        // Botón de salir
        this.exitButton = scene.add.image(545, 355, 'exit_normal')
            .setScale(0.19)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(10)
            .on('pointerover', () => this.exitButton.setTexture('exit_hover'))
            .on('pointerout', () => this.exitButton.setTexture('exit_normal'))
            .on('pointerdown', () => {
                this.exitButton.setTexture('exit_focus');
                scene.exitGame();
            });
    }

    updateHearts(remainingLives) {
        for (let i = 0; i < this.hearts.length; i++) {
            if (remainingLives >= i + 1) {
                this.hearts[i].setFrame(0);
            } else if (remainingLives >= i + 0.5) {
                this.hearts[i].setFrame(1);
            } else {
                this.hearts[i].setFrame(2);
            }
        }
    }
}

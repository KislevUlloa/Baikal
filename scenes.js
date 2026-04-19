import Player from '../player.js';
import Enemies from '../enemies.js';
import UI from '../ui.js';
import Platforms from '../plataforms.js';
import Scenes from './scenes.js';

export default class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }

    preload() {
        this.load.image('background2', '/Assets/backgrounds/Lv 2/BG_lv2.png');

        this.load.spritesheet('heart', '/Assets/ui/heart_hurt.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('pause_normal', '/Assets/ui/pause_button/PauseNormal.png');
        this.load.image('pause_hover', '/Assets/ui/pause_button/PauseHover.png');
        this.load.image('pause_focus', '/Assets/ui/pause_button/PauseFocus.png');
    
        this.load.image('restart_normal', '/Assets/ui/replay_button/ReplayNormal.png');
        this.load.image('restart_hover', '/Assets/ui/replay_button/ReplayHover.png');
        this.load.image('restart_focus', '/Assets/ui/replay_button/ReplayFocus.png');
    
        this.load.image('menu_normal', '/Assets/ui/menu_button/MenuNormal.png');
        this.load.image('menu_hover', '/Assets/ui/menu_button/MenuHover.png');
        this.load.image('menu_focus', '/Assets/ui/menu_button/MenuFocus.png');
    
        this.load.image('exit_normal', '/Assets/ui/salir_button/LeaveNormal.png');
        this.load.image('exit_hover', '/Assets/ui/salir_button/LeaveHover.png');
        this.load.image('exit_focus', '/Assets/ui/salir_button/LeaveFocus.png');

        //Plataformas
        this.load.image('lv2_p1', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p1.png');
        this.load.image('lv2_p2', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p2.png');
        this.load.image('lv2_p3', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p3.png');
        this.load.image('lv2_pl1', '/Assets/backgrounds/Lv 2/Plataformas/lv2_pl1.png');
        this.load.image('lv2_p4', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p4.png');
        this.load.image('lv2_p5', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p5.png');
        this.load.image('lv2_pl2', '/Assets/backgrounds/Lv 2/Plataformas/lv2_pl2.png');
        this.load.image('lv2_p6', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p6.png');
        this.load.image('lv2_p7', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p7.png');
        this.load.image('lv2_p8', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p8.png');
        this.load.image('lv2_p9', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p9.png');
        this.load.image('lv2_p10', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p10.png');
        this.load.image('lv2_p11', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p11.png');
        this.load.image('lv2_p12', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p12.png');
        this.load.image('lv2_p13', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p13.png');
        this.load.image('lv2_p14', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p14.png');
        this.load.image('lv2_p15', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p15.png');
        this.load.image('lv2_p16', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p16.png');
        this.load.image('lv2_p17', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p17.png');
        this.load.image('lv2_p18', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p18.png');
        this.load.image('lv2_p19', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p19.png');
        this.load.image('lv2_p20', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p20.png');
        this.load.image('lv2_p21', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p21.png');
        this.load.image('lv2_p22', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p22.png');
        this.load.image('lv2_p23', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p23.png');
        this.load.image('lv2_p24', '/Assets/backgrounds/Lv 2/Plataformas/lv2_p24.png');

        // Cargar el sprite del científico
        this.load.spritesheet('cientifico_right', '/Assets/sprites/Skin_Cientific/RightCientific.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('cientifico_left', '/Assets/sprites/Skin_Cientific/LeftCientific.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('cientifico_attack', '/Assets/sprites/Skin_Cientific/Attack_Left.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('cientifico_death', '/Assets/sprites/Skin_Cientific/Cientific_Die.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('cientifico_bullet_sprite', '/Assets/sprites/Skin_Cientific/Jeringa.png', { frameWidth: 192, frameHeight: 192 });

        this.load.image('exit2', '/Assets/backgrounds/Lv 2/Portal/Portal Lv2.png');

    }

    create() {
        this.music = this.sound.add('Levels_Music', { loop: true, volume: 0.5 });
        this.music.play();

        // Fondo
        this.background = this.add.image(0, 0 , 'background2').setOrigin(-0.1 , 0.16).setScale(0.2);
        this.background.setScrollFactor(1);
        this.background.setDepth(-1); // Asegura que esté detrás de los demás elementos
    
        // Plataformas
        this.platforms = new Platforms(this);
        this.platforms.createPlatforms(2);

        // UI
        this.ui = new UI(this);
        this.ui.create();
                    
        // Crear el jugador
        this.player = new Player(this, this.ui);
        this.player.player.setVisible(true);
    
        this.enemies = []; // Array para almacenar enemigos
        this.generateScientificEnemies(5); // 4 enemigos (ajusta el número si quieres)
        
        // Colisiones
        this.physics.add.collider(this.player.player, this.platforms.plataforms);
        this.enemies.forEach(enemyGroup => {
            this.physics.add.collider(enemyGroup.enemies, this.platforms.plataforms);
        });
    
        // Hacer que la cámara siga al jugador
        this.cameras.main.startFollow(this.player.player);
        this.cameras.main.setZoom(2.5); // Ajusta el valor según lo que necesites
    
        // Limitar la cámara al tamaño del mapa
        // Puedes obtener el tamaño del mapa según el tilemap, por ejemplo, o las dimensiones que definas.
        const mapaAncho = 650;  // Cambia según el tamaño de tu mapa
        const mapaAlto = 3500;   // Cambia según el tamaño de tu mapa
    
        // Salida del nivel al llegar a un lugar
        this.exitZone = this.physics.add.staticSprite(650, 20, 'exit2').setScale(0.16);
        this.exitZone.setSize(30, 30);  // Ajuste de tamaño de colisión
        this.exitZone.setOffset(120, 110);    // Ajuste de la zona de colisión
        this.physics.add.overlap(this.player.player, this.exitZone, () => {
            this.player.walkSound.stop();
            this.music.stop();
            this.scene.start('Scenes', { videoKey: 'Recuerdos_2', nextLevel: 'Level3' });
        });
    
        // Tecla T para hacer daño
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        // Tecla P para pausar el juego
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Configuración de teclado para pausar y reanudar
        this.input.keyboard.on('keydown-P', () => this.pauseGame(), this); // Pausar con P
        this.input.keyboard.on('keydown-R', () => this.resumeGame(), this); // Reanudar con R
    }
    
    
    update() {
        // Actualizar el jugador
        if (this.player) this.player.update();
    
        // Limitar el movimiento del jugador dentro de los límites
        const mapaAncho = 650;  // Cambia según el tamaño de tu mapa
        const mapaAlto = 3500;   // Cambia según el tamaño de tu mapa
    
        // Limitar el movimiento del jugador
        this.player.player.x = Phaser.Math.Clamp(this.player.player.x, 240, mapaAncho);
        this.player.player.y = Phaser.Math.Clamp(this.player.player.y, 0, mapaAlto);
    
        // Actualizar enemigos
        this.enemies.forEach(enemy => {
            if (enemy.update) { // Verifica si el enemigo tiene el método update()
                enemy.update();
            }
    
            // Limitar la posición de los enemigos dentro de los límites del mapa
            enemy.enemies.children.iterate(child => {
                child.x = Phaser.Math.Clamp(child.x, 240, mapaAncho);
                child.y = Phaser.Math.Clamp(child.y, 0, mapaAlto);
            });
        });
    
        // Actualizar UI
        if (this.ui) this.ui.updateHearts(this.player.lives);
    
        // Verificar si la tecla T se presiona
        if (Phaser.Input.Keyboard.JustDown(this.keyT)) {
            console.log("Tecla T presionada");
            this.player.takeDamage(); // Se usa 'this.player' en lugar de 'player'
        }
        
        // Detectar cuando se presiona la tecla 'P' para alternar el estado de pausa
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            if (this.isPaused) {
                this.resumeGame();  // Reanudar el juego si está pausado
            } else {
                this.pauseGame();  // Pausar el juego si no está pausado
            }
        }

        if (!this.isPaused) {
            // Solo se actualiza cuando el juego no está pausado
            this.player.update();

            // Actualizar enemigos
            this.enemies.forEach(enemy => {
                if (enemy.update) { // Verifica si el enemigo tiene el método update()
                    enemy.update();
                }
            });
            this.ui.updateHearts(this.player.lives);
        }
    }

    generateScientificEnemies() {
        const enemyPositions = [
            {x: 350, y: 470},  // Sobre lv2_p1
            {x: 540, y: 370},  // Sobre lv2_p9
            {x: 370, y: 210},  // Sobre lv2_p14
            {x: 590, y: 40},    // Sobre lv2_p24
            {x: 10, y: 10}    // Sobre lv2_p24
        ];
    
        enemyPositions.forEach(pos => {
            const enemy = new Enemies(
                this,
                this.player,
                'cientifico',
                pos.x,
                pos.y
            );
            this.enemies.push(enemy);
        });
    }   

    restartGame() {
        this.scene.restart();
        console.log('Juego reiniciado');
    }

    goToMenu() {
        this.scene.stop();
        console.log('Volver al menú');
        this.scene.start('MainMenu');
    }

    exitGame() {
        window.close();
    }
}

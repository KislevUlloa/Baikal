class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.audio('bgMusic', '/Assets/music/Cueva cute.ogg'); // Ruta del archivo de audio

        // Cargar imágenes del botón "Play"
       this.load.image('menu_background', '/Assets/backgrounds/fonda.jpg'); // Imagen de fondo del menú

       this.load.image('titulo', '/Assets/ui/titulo.png');

       // Cargar las imágenes de los botones en cada estado
       this.load.image('play_normal', '/Assets/ui/play_button/PlayNormal.png');
       this.load.image('play_focus', '/Assets/ui/play_button/PlayFocus.png');
       this.load.image('play_hover', '/Assets/ui/play_button/PlayHover.png');

       this.load.audio('Levels_Music', '/Assets/music/Cueva-misterio.ogg'); // Ruta del archivo de audio

        // Cargar el sprite del jugador
        this.load.spritesheet('player_jump', '/Assets/sprites/Skin_Baikal/Baikal_Salto.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_damage', '/Assets/sprites/Skin_Baikal/Auch_Baikal.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_death', '/Assets/sprites/Skin_Baikal/Baikal_Die.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_attack', '/Assets/sprites/Skin_Baikal/ATAQUE_baikal.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_defense', '/Assets/sprites/Skin_Baikal/Defenza-Baikal.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_right', '/Assets/sprites/Skin_Baikal/RightBaikal.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_left', '/Assets/sprites/Skin_Baikal/LeftBaikal.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('player_idle', '/Assets/sprites/Skin_Baikal/Baikai_Quieta.png', { frameWidth: 192, frameHeight: 192 });

        //Vida del jugador
        this.load.spritesheet('heart', '/Assets/ui/heart_hurt.png', { frameWidth: 16, frameHeight: 16 });

        this.load.audio('jumpSound', '/Assets/sfx/jump.ogg');
        this.load.audio('walkSound', '/Assets/sfx/walk.ogg');
        this.load.audio('mili_shoot', '/Assets/sfx/shot.ogg');
        this.load.audio('cientifico_shoot', '/Assets/sfx/spin_geringa_1.ogg'); 
        this.load.spritesheet('background', '/Assets/backgrounds/Portada/Portada.png', {
            frameWidth: 640,  // Ancho del frame
            frameHeight: 380 // Ajustar al tamaño de la pantalla
        });     
         
    }
    
    create() {
        this.music = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.music.play();
    
        // Animación inicial (se ejecuta una vez)
        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('background', { start: 0, end: 8 }), 
            frameRate: 10,
            repeat: 0
        });
    
        // Animación en bucle (se repetirá después de la primera animación)
        this.anims.create({
            key: 'backgroundLoop',
            frames: this.anims.generateFrameNumbers('background', { start: 9, end: 14 }), 
            frameRate: 10,
            repeat: -1
        });
    
        // Crear el sprite del fondo
        this.background = this.add.sprite(440, 275, 'background').setDisplaySize(880, 550);
    
        // Reproducir la animación inicial
        this.background.play('backgroundAnimation');
    
        // Esperar a que termine la animación inicial y luego reproducir la animación en loop
        this.background.on('animationcomplete', (anim) => {
            if (anim.key === 'backgroundAnimation') {
                this.background.play('backgroundLoop');
            }
        });
    
        // **Agregar la imagen del título**
        this.titleImage = this.add.image(440, 200, 'titulo').setOrigin(0.5);
    
        // Crear el botón "Play"
        this.playButton = this.add.image(440, 410, 'play_normal')
            .setInteractive()
            .on('pointerover', () => this.playButton.setTexture('play_focus'))  
            .on('pointerout', () => this.playButton.setTexture('play_normal'))  
            .on('pointerdown', () => {
                this.playButton.setTexture('play_hover');
                this.startGame();
            });
    }
    

    startGame() {
        console.log("Iniciando el juego...");
        this.scene.start('Level1'); // Cambia a la escena del primer nivel
        this.music.stop();
    }
}

export default MainMenu;

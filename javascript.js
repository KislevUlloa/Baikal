export default class Player {
    constructor(scene, ui) {
        // Creación del sprite del jugador
        this.scene = scene; // Guarda la escena
        this.player = scene.physics.add.sprite(250, 800, 'player_idle').setScale(0.12);
        //(250, 800, 'player_idle').setScale(0.35);
        this.player.setCollideWorldBounds(true);
        this.player.setSize(110, 190);  // Ajusta el tamaño de la hitbox
        this.player.setOffset(34, 4); // Ajusta la posición de la hitbox dentro del sprite


        this.ui = ui; // Recibe la UI para manejar la vida
        this.lives = 3; // Establecer vida inicial
        this.isTakingDamage = false; // Control para evitar múltiples daños a la vez
        this.isAttacking = false; // Control para verificar si está atacando
        
        // Actualizar la UI con las vidas iniciales
        this.ui.updateHearts(this.lives);

        this.walkSound = this.scene.sound.add('walkSound', { volume: 2.5, loop: true });
        this.jumpSound = this.scene.sound.add('jumpSound', { volume: 0.9 });


        // Crear las animaciones
        scene.anims.create({
            key: 'play_right',
            frames: scene.anims.generateFrameNumbers('player_right', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'play_left',
            frames: scene.anims.generateFrameNumbers('player_left', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'play_jump',
            frames: scene.anims.generateFrameNumbers('player_jump', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: 0
        });

        scene.anims.create({
            key: 'play_attack',
            frames: scene.anims.generateFrameNumbers('player_attack', { start: 0, end: 15 }),
            frameRate: 8,
            repeat: 0
        });

        scene.anims.create({
            key: 'play_defense',
            frames: scene.anims.generateFrameNumbers('player_defense', { start: 0, end: 8 }),
            frameRate: 6,
            repeat: 0
        });

        scene.anims.create({
            key: 'play_damage',
            frames: scene.anims.generateFrameNumbers('player_damage', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: 0 // Asegura que la animación no se repita en bucle
        });

        scene.anims.create({
            key: 'play_death',
            frames: scene.anims.generateFrameNumbers('player_death', { start: 0, end: 8 }),
            frameRate: 6,
            repeat: 0 // Asegura que la animación solo ocurra una vez
        });

        scene.anims.create({
            key: 'play_idle',
            frames: scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 10 }),
            frameRate: 6,
            repeat: -1
        });

        // Crear los controles
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.defenseKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update() {
        // Evita cambios de animación si está atacando, defendiendo o recibiendo daño
        if (this.isAttacking || this.isTakingDamage) return;

        let moving = false; // Variable para saber si el jugador se está moviendo

        // Movimiento lateral (permitir movimiento en el aire)
        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.player.setVelocityX(this.cursors.left.isDown ? -160 : 160);
            moving = true;
            
            if (this.player.body.blocked.down) { // Solo si está tocando el suelo
                if (!this.walkSound.isPlaying) {
                    this.walkSound.play();
                }
            }
        } else {
            this.player.setVelocityX(0);
            
            if (this.walkSound.isPlaying) {
                this.walkSound.stop(); // Asegura que el sonido se detenga si no está moviéndose
            }
        }
        

        // Salto
        if (this.cursors.space.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-300);
            this.jumpSound.play(); // Reproducir sonido de salto
        }

        // Determinar animación correcta
        if (!this.player.body.blocked.down) {
            // Si está en el aire, solo reproducir la animación de salto
            if (this.player.anims.currentAnim?.key !== 'play_jump') {
                this.player.anims.play('play_jump', true);
            }
        } else if (moving) {
            // Si está en el suelo y se está moviendo
            const walkAnim = this.cursors.left.isDown ? 'play_left' : 'play_right';
            if (this.player.anims.currentAnim?.key !== walkAnim) {
                this.player.anims.play(walkAnim, true);
            }
        } else {
            // Si no se mueve y está en el suelo
            if (this.player.anims.currentAnim?.key !== 'play_idle') {
                this.player.anims.play('play_idle', true);
            }
        }

        // Ataque
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.isAttacking = true;
            this.player.setVelocityX(0);
            this.player.anims.play('play_attack');
            this.player.once('animationcomplete', () => {
                this.isAttacking = false;
            });
            return;
        }

        // Defensa
        if (Phaser.Input.Keyboard.JustDown(this.defenseKey)) {
            this.isAttacking = true;
            this.player.setVelocityX(0);
            this.player.anims.play('play_defense');
            this.player.once('animationcomplete', () => {
                this.isAttacking = false;
            });
            return;
        }
    }

    // **Método para recibir daño**
    takeDamage() {
        if (this.isTakingDamage) return;
    
        this.isTakingDamage = true;
        console.log("Jugador recibió daño.");
    
        // Determinar el daño según el nivel
        let damage = (this.scene.scene.key === "Level1") ? 0.5 : 1; 
    
        this.lives -= damage;
        if (this.lives < 0) this.lives = 0;
    
        console.log(`Vidas restantes: ${this.lives}`);
        this.ui.updateHearts(this.lives);
    
        this.player.setVelocityX(0);
        this.player.anims.play('play_damage');
    
        if (this.lives <= 0) {
            this.die();
        } else {
            this.player.once('animationcomplete', () => {
                this.isTakingDamage = false;
                this.player.anims.play('play_idle'); 
            });
        }
    }
     

    // **Método para manejar la muerte del personaje**
    die() {
        this.stopSounds(); // Detiene todos los sonidos activos
        this.player.setVelocity(0);  
        console.log("Jugador ha muerto.");
    
        this.player.anims.play('play_death');
    
        this.player.on('animationcomplete', (anim) => {
            if (anim.key === 'play_death') {
                this.player.setFrame(anim.frames[anim.frames.length - 1].frame);
                this.stopSounds();
                this.scene.scene.restart();  
            }
        });
    }    

    stopSounds() {
        if (this.walkSound && this.walkSound.isPlaying) {
            this.walkSound.stop();
        }
    }
    
}
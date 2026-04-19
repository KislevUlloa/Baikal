export default class Enemies {
    constructor(scene, player, type = 'militar') {
        this.scene = scene;
        this.player = player;
        this.type = type;

        // Inicializa el grupo de enemigos aquí, antes de cualquier uso.
        this.enemies = this.scene.physics.add.group(); 
        this.bullets = this.scene.physics.add.group();

        // Asegúrate de que la gravedad global esté aplicada correctamente
        this.scene.physics.world.gravity.y = 700; // Gravedad hacia abajo

        // Ahora podemos usar setCollideWorldBounds en el grupo
        this.enemies.getChildren().forEach(enemy => {
            enemy.body.setCollideWorldBounds(true);
            enemy.body.onWorldBounds = true; // Activa detección de colisiones con los límites del mundo.
            enemy.setBounce(1); // Esto puede hacer que reboten si golpean los límites
        });

        this.shootSound = this.scene.sound.add(
            this.type === 'militar' ? 'mili_shoot' : 'cientifico_shoot',
            { volume: 0.7 }
        );

        this.spawnEnemies(); // Llamar a la función de creación de enemigos
        this.createAnimations();
        this.setupMovement();
        this.setupShooting();
    }

    spawnEnemies() {
        let spriteKey = this.type === 'militar' ? 'mili_left' : 'cientifico_left';
        let scale = this.type === 'militar' ? 0.15 : 0.13;

        // Generación de posiciones aleatorias dentro del mapa (por ejemplo, dentro de un rango de 0 a 800 en X, y 0 a 600 en Y)
        let randomX = Phaser.Math.Between(100, 800); // Genera una posición aleatoria en X
        let randomY = Phaser.Math.Between(100, 600); // Genera una posición aleatoria en Y

        // Crear el enemigo en la posición aleatoria
        let enemy = this.scene.physics.add.sprite(randomX, randomY, spriteKey).setScale(scale);

        // Asegúrate de que el enemigo no se caiga del mapa
        enemy.setGravityY(700); // Aplica gravedad
        enemy.setCollideWorldBounds(true); // Evita que se salgan del mapa
        enemy.body.onWorldBounds = true; // Activa detección de colisiones con los límites del mundo.
        enemy.setBounce(0.5); // Ajusta el rebote

        // Configurar el tamaño y el offset de la hitbox según el tipo de enemigo
        if (this.type === 'militar') {
            enemy.setSize(90, 170).setOffset(50, 20);
        } else {
            enemy.setSize(90, 175).setOffset(50, 7);
        }

        // Añadir el enemigo al grupo
        this.enemies.add(enemy);

        // Asegúrate de que cada enemigo tenga las mismas propiedades que el jugador
        enemy.setScale(scale); // Ajusta el tamaño del enemigo
        enemy.body.setCollideWorldBounds(true); // Para evitar que se caigan del mapa
        enemy.body.onWorldBounds = true; // Detectar colisiones con los límites del mundo
    }

    createAnimations() {
        const anims = [
            { key: 'right', prefix: 'right' },
            { key: 'left', prefix: 'left' },
            { key: 'idle', prefix: 'idle' },
            { key: 'attack', prefix: 'attack' },
            { key: 'death', prefix: 'death' }
        ];
    
        anims.forEach(({ key, prefix }) => {
            let fullKey = this.type === 'militar' ? `mili_${key}` : `cientifico_${key}`;
            let sprite = this.type === 'militar' ? `mili_${prefix}` : `cientifico_${prefix}`;
    
            if (!this.scene.anims.exists(fullKey)) {
                this.scene.anims.create({
                    key: fullKey,
                    frames: this.scene.anims.generateFrameNumbers(sprite, { start: 0, end: 5 }),
                    frameRate: 6,
                    repeat: key === 'death' ? 0 : -1
                });
            }
        });
    
        // Animaciones de las balas
        if (this.type !== 'militar') {
            this.scene.anims.create({
                key: 'cientifico_bullet',
                frames: this.scene.anims.generateFrameNumbers('cientifico_bullet_sprite', { start: 0, end: 8 }),
                frameRate: 6,
                repeat: -1
            });
        }
    }
    
    setupMovement() {
        this.scene.time.addEvent({
            delay: 300, // Se revisa con más frecuencia
            callback: () => {
                this.enemies.getChildren().forEach(enemy => {
                    const playerDistance = Phaser.Math.Distance.Between(
                        enemy.x, enemy.y,
                        this.player.player.x, this.player.player.y
                    );
    
                    if (playerDistance < 75) { // Detecta más lejos
                        const direction = enemy.x > this.player.player.x ? -1 : 1;
                        enemy.setVelocityX(100 * direction); // Velocidad mayor al seguir al jugador
                        enemy.anims.play(this.type === 'militar' ? 
                            (direction === -1 ? 'mili_left' : 'mili_right') : 
                            (direction === -1 ? 'cientifico_left' : 'cientifico_right'), true);
                    } else {
                        // Movimiento normal de patrulla
                        if (!enemy.patrolDirection) {
                            enemy.patrolDirection = Math.random() < 0.5 ? -1 : 1;
                        }
    
                        // Si hay suelo adelante, sigue patrullando
                        if (this.hasGroundAhead(enemy)) {
                            enemy.setVelocityX(50 * enemy.patrolDirection);
                            enemy.anims.play(this.type === 'militar' ? 
                                (enemy.patrolDirection === -1 ? 'mili_left' : 'mili_right') : 
                                (enemy.patrolDirection === -1 ? 'cientifico_left' : 'cientifico_right'), true);
                        } else {
                            // Cambia de dirección si no hay suelo
                            enemy.patrolDirection *= -1;
                            enemy.setVelocityX(50 * enemy.patrolDirection);
                        }
                    }
                });
            },
            callbackScope: this,
            loop: true
        });
    }    

    setupShooting() {
        this.scene.time.addEvent({
            delay: 1800,
            callback: this.shootBullet,
            callbackScope: this,
            loop: true
        });
    }

    shootBullet() {
        this.enemies.getChildren().forEach(enemy => {
            let playerSprite = this.player.player || this.player;
            let distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, playerSprite.x, playerSprite.y);
        
            if (distance < 90) { // Detecta al jugador si esta
                enemy.setVelocityX(0); // Se detiene momentáneamente para disparar
        
                let bulletType = this.type === 'militar' ? 'mili_bullet_sprite' : 'cientifico_bullet_sprite';
                let bullet = this.scene.physics.add.sprite(enemy.x, enemy.y, bulletType);
                let direction = enemy.x > playerSprite.x ? -400 : 400; // Aumentado para mayor realismo
        
                bullet.setVelocityX(direction);
                bullet.setGravityY(300); // Menos gravedad para que no caiga tan rápido
                bullet.setScale(0.05);
        
                this.shootSound.play();
        
                if (this.type === 'militar') {
                    bullet.setFrame(0);
                } else {
                    bullet.anims.play('cientifico_bullet', true);
                }
        
                this.scene.physics.add.overlap(bullet, this.player.player, this.handleBulletHit, null, this);
        
                bullet.on('animationcomplete', () => {
                    bullet.destroy();
                });
        
                this.scene.time.delayedCall(500, () => { // Pausa momentánea antes de volver a moverse
                    if (enemy.x > playerSprite.x) {
                        enemy.setVelocityX(-60);
                        enemy.anims.play(this.type === 'militar' ? 'mili_left' : 'cientifico_left', true);
                    } else {
                        enemy.setVelocityX(60);
                        enemy.anims.play(this.type === 'militar' ? 'mili_right' : 'cientifico_right', true);
                    }
                });
            }
        });
        
    }
    
    

    handleBulletHit(bullet, player) {
        bullet.destroy();
        if (this.player && typeof this.player.takeDamage === 'function') {
            this.player.takeDamage();
        }
    }

    hasGroundAhead(enemy) {
        const rayLength = 60; // Aumenta la distancia de detección
        const rayOffset = 20; // Pequeño margen para evitar falsos negativos
        const rayStartX = enemy.x + (enemy.body.velocity.x > 0 ? enemy.width / 2 + rayOffset : -enemy.width / 2 - rayOffset);
        const rayStartY = enemy.y + enemy.height / 2;
    
        // Crea un cuerpo temporal más preciso
        const ray = this.scene.add.rectangle(rayStartX, rayStartY, 5, rayLength, 0xff0000, 0.3); // Visible para depuración
        this.scene.physics.add.existing(ray);
        ray.body.setAllowGravity(false);
        ray.body.setImmovable(true);
    
        let hasGround = false;
        this.scene.physics.world.overlap(ray, this.scene.platforms.plataforms, () => {
            hasGround = true;
        });
    
        ray.destroy();
        return hasGround;
    }
}

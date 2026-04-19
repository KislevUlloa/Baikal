export default class Plataforms {
    constructor(scene) {
        this.scene = scene;
        this.plataforms = this.scene.physics.add.staticGroup(); // Solo usamos StaticGroup
    }

    // Método para crear las plataformas
    createPlatforms(level) {
        // Limpiar plataformas anteriores (método propio de StaticGroup)
        this.plataforms.clear(true, true);

        // Definir las plataformas según el nivel
        if (level === 1) {
            this.createLevel1Platforms();
        } else if (level === 2) {
            this.createLevel2Platforms();
        } else if (level === 3) {
            this.createLevel3Platforms();
        }
    }

    // Método genérico para crear plataformas
    createPlatformsFromData(platformsData) {
        platformsData.forEach(data => {
            this.plataforms.create(data.x, data.y, data.texture)
                .setScale(data.scaleX, data.scaleY)
                .refreshBody();
        });
    }

    // Plataformas específicas para el Nivel 1
    createLevel1Platforms() {
        let platformsData = [
            { x: 395, y: 495, texture: 'lv1_p1' ,scaleX: 0.022, scaleY: 0.022 },
            { x: 475, y: 460, texture: 'lv1_p2' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 420, y: 260, texture: 'lv1_p3' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 325, y: 525, texture: 'lv1_p4' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 610, y: 490, texture: 'lv1_p5' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 570 , y: 405, texture: 'lv1_p7' ,scaleX: 0.13, scaleY: 0.13},

            { x: 480, y: 512, texture: 'lv1_pl1' ,scaleX: 0.09, scaleY: 0.094},
            { x: 530, y: 365, texture: 'lv1_pl2' ,scaleX: 0.07, scaleY: 0.07 },

            { x: 660, y: 455, texture: 'lv1_p6' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 565, y: 290, texture: 'lv1_p8' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 350, y: 175, texture: 'lv1_p16' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 397, y: 65, texture: 'lv1_p17' ,scaleX: 0.13, scaleY: 0.13 },
           { x: 600, y: 100, texture: 'lv1_p15' ,scaleX: 0.13, scaleY: 0.13 },
            { x: 640, y: 345, texture: 'lv1_p12' ,scaleX: 0.13, scaleY: 0.13 },
           { x: 450, y: 135, texture: 'lv1_p14' ,scaleX: 0.13, scaleY: 0.13 },
           { x: 290, y: 235, texture: 'lv1_p18' ,scaleX: 0.13, scaleY: 0.13 },
           { x: 555, y: 505, texture: 'lv1_p20' ,scaleX: 0.13, scaleY: 0.13 },
           { x: 240, y: 200, texture: 'lv1_p22' ,scaleX: 0.13, scaleY: 0.13 },
        ];

        this.createPlatformsFromData(platformsData);
    }

    // Plataformas específicas para el Nivel 2
    createLevel2Platforms() {
        let platformsData = [
            { x: 350, y: 520, texture: 'lv2_p1' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 250, y: 480, texture: 'lv2_p2' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 370, y: 440, texture: 'lv2_p3' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 455, y: 490, texture: 'lv2_p4' ,scaleX: 0.07, scaleY: 0.07 },
            { x: 415, y: 530, texture: 'lv2_p5' ,scaleX: 0.08, scaleY: 0.08 },
            { x: 540, y: 420, texture: 'lv2_p9' ,scaleX: 0.1, scaleY: 0.1 },

            { x: 380, y: 500, texture: 'lv2_pl1' ,scaleX: 0.1, scaleY: 0.12},
            { x: 470, y: 440, texture: 'lv2_pl2' ,scaleX: 0.1, scaleY: 0.1 },

            { x: 540, y: 520, texture: 'lv2_p6' ,scaleX: 0.07, scaleY: 0.07 },
            { x: 580, y: 490, texture: 'lv2_p7' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 660, y: 450, texture: 'lv2_p8' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 650, y: 380, texture: 'lv2_p10' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 550, y: 360, texture: 'lv2_p11' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 480, y: 330, texture: 'lv2_p12' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 440, y: 290, texture: 'lv2_p13' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 370, y: 260, texture: 'lv2_p14' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 440, y: 200, texture: 'lv2_p18' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 580, y: 170, texture: 'lv2_p19' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 300, y: 90, texture: 'lv2_p21' ,scaleX: 0.12, scaleY: 0.12 },
            { x: 490, y: 120, texture: 'lv2_p22' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 590, y: 40, texture: 'lv2_p24' ,scaleX: 0.1, scaleY: 0.1 },

            //{ x: 370, y: 570, texture: 'suelo' ,scaleX: 20, scaleY: 1 },
        ];
    
        this.createPlatformsFromData(platformsData);
    }
    
    // Plataformas específicas para el Nivel 3
    createLevel3Platforms() {
        let platformsData = [
            { x: 395, y: 515, texture: 'lv3_p1' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 295, y: 470, texture: 'lv3_p2' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 240, y: 440, texture: 'lv3_p3' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 180, y: 410, texture: 'lv3_p4' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 260, y: 370, texture: 'lv3_p5' ,scaleX: 0.12, scaleY: 0.1 },
            { x: 180, y: 340, texture: 'lv3_p6' ,scaleX: 0.08, scaleY: 0.12 },
            { x: 260, y: 290, texture: 'lv3_p7' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 150, y: 260, texture: 'lv3_p8' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 110, y: 220, texture: 'lv3_p9' ,scaleX: 0.1, scaleY: 0.08 },
            { x: 170, y: 200, texture: 'lv3_p10' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 220, y: 185, texture: 'lv3_p11' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 280, y: 145, texture: 'lv3_p12' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 310, y: 120, texture: 'lv3_p13' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 340, y: 80, texture: 'lv3_p14' ,scaleX: 0.1, scaleY: 0.1 },
            { x: 370, y: 50, texture: 'lv3_p15' ,scaleX: 0.1, scaleY: 0.1 },
            //{ x: 400, y: 10, texture: 'lv3_p16' ,scaleX: 0.1, scaleY: 0.1 },
        ];
    
        this.createPlatformsFromData(platformsData);
    }
}

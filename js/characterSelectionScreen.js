var characterSelectionScreen_heros;
var characterSelectionScreen_chooseText;

function characterSelectionScreen_setup(setupObj) {
    console.log("Loading character selection screen");

    characterSelectionScreen_heros = [
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/desdemona-sprite.png"].texture
            ),
            "name": new PIXI.Text("Des", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/james-sprite.png"].texture
            ),
            "name": new PIXI.Text("James", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/chelsea-sprite.png"].texture
            ),
            "name": new PIXI.Text("Chelsea", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/padme-sprite.png"].texture
            ),
            "name": new PIXI.Text("Padme", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/finn-sprite.png"].texture
            ),
            "name": new PIXI.Text("Finn", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/sam-sprite.png"].texture
            ),
            "name": new PIXI.Text("Sam", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/ariel-sprite.png"].texture
            ),
            "name": new PIXI.Text("Ariel", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        },
        {
            "sprite": new PIXI.Sprite(
                PIXI.loader.resources["images/bee-sprite.png"].texture
            ),
            "name": new PIXI.Text("Bee", {fontFamily: "Arial", fontSize: 22, fill: "white"})
        }
    ];

    for (var i = 0; i < characterSelectionScreen_heros.length; i++) {
        var hero = characterSelectionScreen_heros[i];

        hero.sprite.vx = 0;
        hero.sprite.vy = 0;
        hero.sprite.scale.set(0.1, 0.1);

        hero.sprite.x += (i * 128);

        hero.sprite.interactive = true;
        hero.sprite.buttonMode = true;

        hero.sprite.on('pointerdown', characterSelectionScreen_chooseCharacter);

        hero.name.x = hero.sprite.x;
        hero.name.y = hero.sprite.y + 128;

        stage.addChild(hero.name);

        stage.addChild(hero.sprite);
    }

    characterSelectionScreen_chooseText = new PIXI.Text("Choose your hero", {fontFamily: "Arial", fontSize: 42, fill: "white"});

    characterSelectionScreen_chooseText.y += 256;

    stage.addChild(characterSelectionScreen_chooseText);
}

function characterSelectionScreen_chooseCharacter() {
    setupObj = this;
    doDestroy = true;
}

function characterSelectionScreen_state() {
    // do nothing
}

function characterSelectionScreen_destroy() {
    console.log("Destroying character selection screen");
    stage.removeChild(characterSelectionScreen_chooseText);

    for (var i = 0; i < characterSelectionScreen_heros.length; i++) {
        var hero = characterSelectionScreen_heros[i];

        stage.removeChild(hero.sprite);
        stage.removeChild(hero.name);
    }

    state = level1_state;
    setup = level1_setup;
    destroy = level1_destroy;
}
Levels.characterSelectionScreen = {
    heros: undefined,
    chooseText: undefined,
    chosenHero: undefined,
    setup: function(setupObj) {
        console.log("Loading character selection screen");

        heros = [
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

        for (var i = 0; i < heros.length; i++) {
            var hero = heros[i];

            hero.sprite.vx = 0;
            hero.sprite.vy = 0;
            hero.sprite.scale.set(0.1, 0.1);

            hero.sprite.x += (i * 128);

            hero.sprite.interactive = true;
            hero.sprite.buttonMode = true;

            hero.sprite.on('pointerdown', function() {
                chosenHero = this;
                doDestroy = true;
            }.bind(hero));

            hero.name.x = hero.sprite.x;
            hero.name.y = hero.sprite.y + 128;

            stage.addChild(hero.name);

            stage.addChild(hero.sprite);
        }

        chooseText = new PIXI.Text("Choose your hero", {fontFamily: "Arial", fontSize: 42, fill: "white"});

        chooseText.y += 256;

        stage.addChild(chooseText);
    },
    state: function() {
        // do nothing
    },
    destroy: function() {
        console.log("Destroying character selection screen");
        bgMusic.stop();
        stage.removeChild(chooseText);

        for (var i = 0; i < heros.length; i++) {
            var hero = heros[i];

            stage.removeChild(hero.sprite);
            stage.removeChild(hero.name);
        }

        setupObj = chosenHero;
        activeLevel = Levels.level1;
    }
}

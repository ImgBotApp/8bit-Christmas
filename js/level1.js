Levels.level1 = {
    background: undefined,
    portal: undefined,
    hero: undefined,
    help: undefined,
    goal: undefined,
    destroyAfterAnimation: undefined,
    setup: function(setupObj) {
        console.log("Loading level 1");

        destroyAfterAnimation = 0;
        background = new PIXI.Sprite(PIXI.loader.resources["images/background-1.png"].texture);
        portal = new PIXI.Sprite(PIXI.loader.resources["images/portal.png"].texture);
        hero = new PIXI.Sprite(PIXI.loader.resources["images/ariel-sprite.png"].texture);
        help = new PIXI.Text(" [a] = move left\n  [d] = move right\n[space] = jump", {fontFamily : "Courier, monospace", fontSize: 24, fill : 0xffffff, align : "center"});
        goal = new PIXI.Text("Walk into the portal", {fontFamily : "Courier, monospace", fontSize: 48, fill : 0xffffff, align : "center"});

        goal.x = 640;
        goal.y = 200;

        background.scale.set(0.24, 0.24);
        background.interactive = false;
        background.buttonMode = false;

        portal.scale.set(0.2, 0.2);
        portal.interactive = false;
        portal.buttonMode = false;
        portal.x = 1170;
        portal.y = 350;

        hero.vx = 0;
        hero.vy = 0;
        hero.scale.set(0.1, 0.1);
        hero.y = 450;

        hero.interactive = false;
        hero.buttonMode = false;

        left.press = function() {
            hero.vx = -3;
        };
        left.release = function() {
            if (!right.isDown) {
                hero.vx = 0;
            }
        };

        right.press = function() {
            hero.vx = 3;
        };
        right.release = function() {
            if (!left.isDown) {
                hero.vx = 0;
            }
        };

        spacebar.press = function() {
            if (hero.vy === 0) {
                hero.vy = -3;
            }
        }

        console.log(hero);

        stage.addChild(background);
        stage.addChild(portal);
        stage.addChild(hero);
        stage.addChild(help);
        stage.addChild(goal);
    },
    state: function() {
        if (destroyAfterAnimation > 0) {
            destroyAfterAnimation += 1;

            hero.rotation += 0.1;
            hero.scale.set(hero.scale.x * 1.01, hero.scale.y * 1.01);

            if (destroyAfterAnimation > 240) {
                doDestroy = true;
            }

            return;
        }

        Utils.containObject(hero);

        if (hero.vy !== 0) {
            if (hero.y <= 400) {
                hero.vy = 3;
            }
        }

        hero.x += hero.vx;
        hero.y += hero.vy;

        if (hero.y >= 450) {
            hero.vy = 0;
            hero.y = 450;
        }

        if (hero.x >= portal.x) {
            destroyAfterAnimation = 1;
        }
    },
    destroy: function() {
        console.log("Destroying level 1");

        stage.removeChild(hero);
        stage.removeChild(portal);
        stage.removeChild(background);
        stage.removeChild(help);
        stage.removeChild(goal);

        bgMusic.stop();

        setupObj = new PIXI.Sprite(PIXI.loader.resources["images/bee-sprite.png"].texture);
        activeLevel = Levels.level2;
    }
}

Levels.level2 = {
    background: undefined,
    portal: undefined,
    hero: undefined,
    obstacles: undefined,
    help: undefined,
    goal: undefined,
    destroyAfterAnimation: undefined,
    setup: function(setupObj) {
        console.log("Loading level 2");

        bgMusic = new Howl({
            src: ['music/level-2.mp3'],
            autoplay: true,
            volume: 0.9,
            loop: true
        });
        bgMusic.play();

        background = new PIXI.Sprite(PIXI.loader.resources["images/background-1.png"].texture);
        portal = new PIXI.Sprite(PIXI.loader.resources["images/portal.png"].texture);
        hero = Utils.createAndInitHero("images/bee-sprite.png");
        help = new PIXI.Text(" [a] = move left\n  [d] = move right\n[space] = jump", {fontFamily : "Courier, monospace", fontSize: 24, fill : 0xffffff, align : "center"});
        goal = new PIXI.Text("Avoid the obstacles", {fontFamily : "Courier, monospace", fontSize: 48, fill : 0xffffff, align : "center"});
        destroyAfterAnimation = 0;

        goal.x = 600;
        goal.y = 200;

        background.scale.set(0.24, 0.24);
        background.interactive = false;
        background.buttonMode = false;

        portal.scale.set(0.2, 0.2);
        portal.interactive = false;
        portal.buttonMode = false;
        portal.x = 1170;
        portal.y = 350;

        obstacles = [new PIXI.Graphics(), new PIXI.Graphics()];

        obstacles[0].beginFill(0xFF0000, 1);
        obstacles[0].drawRect(170, 545, 25, 25);
        obstacles[0].endFill();

        obstacles[1].beginFill(0xFF0000, 1);
        obstacles[1].drawRect(370, 545, 25, 25);
        obstacles[1].endFill();
        obstacles[1].vy = -1;
        obstacles[1].yMin = 390;
        obstacles[1].yMax = 545;

        stage.addChild(background);
        stage.addChild(portal);
        stage.addChild(hero);
        stage.addChild(help);
        stage.addChild(goal);

        for (i = 0; i < obstacles.length; i++) {
            stage.addChild(obstacles[i]);
        }
    },
    state: function() {
        if (destroyAfterAnimation > 0) {
            destroyAfterAnimation += 1;

            hero.rotation += 0.1;
            hero.scale.set(hero.scale.x / 1.01, hero.scale.y / 1.01);

            if (destroyAfterAnimation > 200) {
                doDestroy = true;
            }

            return;
        }

        Utils.containObject(hero);

        if (hero.vy !== 0) {
            if (hero.y <= 350) {
                hero.vy = 4;
            }
        }

        hero.x += hero.vx;
        hero.y += hero.vy;

        if (hero.y >= 450) {
            hero.vy = 0;
            hero.y = 450;
        }

        // todo: this should probably be extracted to utils or something
        for (i = 0; i < obstacles.length; i++) {
            if (obstacles[i].vy) {
                if (obstacles[i].vy === -1 && obstacles[i].getBounds().y <= obstacles[i].yMin) {
                    obstacles[i].vy = 1;
                } else if (obstacles[i].vy === 1 && obstacles[i].getBounds().y >= obstacles[i].yMax) {
                    obstacles[i].vy = -1;
                }

                obstacles[i].y += obstacles[i].vy;
            }

            if (obstacles[i].vx) {
                if (obstacles[i].vx === -1 && obstacles[i].getBounds().x <= obstacles[i].xMin) {
                    obstacles[i].vx = 1;
                } else if (obstacles[i].vx === 1 && obstacles[i].getBounds().x >= obstacles[i].xMax) {
                    obstacles[i].vx = -1;
                }

                obstacles[i].x += obstacles[i].vx;
            }
        }

        // This sprite's hitbox was wonky because their hand is stretched out. So here's a better hitbox as an object literal.
        var heroHitbox = {x: hero.x, y: hero.y, width: 64, height: 115};
        for (i = 0; i < obstacles.length; i++) {
            if (Utils.collisionDetected(heroHitbox, obstacles[i].getBounds())) {
                console.log("Collision with obstacle!");
                // todo: death animation
                hero.x = 0;
                hero.y = 450;
            }
        }

        if (hero.x >= portal.x) {
            destroyAfterAnimation = 1;
            hero.x = portal.x + 30;

            bgMusic.stop();
            bgMusic = new Howl({
                src: ['music/warp.mp3'],
                autoplay: true,
                volume: 0.6,
                loop: true
            });
            bgMusic.play();
        }
    },
    destroy: function() {
        console.log("Destroying level 2");

        stage.removeChild(hero);
        stage.removeChild(portal);
        stage.removeChild(background);
        stage.removeChild(help);
        stage.removeChild(goal);

        for (i = 0; i < obstacles.length; i++) {
            stage.removeChild(obstacles[i]);
        }

        bgMusic.stop();

        setupObj = {};
        activeLevel = Levels.level3;
    }
}

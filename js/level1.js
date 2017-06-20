Levels.level1 = {
    hero: undefined,
    setup: function(setupObj) {
        console.log("Loading level 1");

        hero = setupObj.sprite;

        hero.interactive = false;
        hero.buttonMode = false;

        left.press = function() {
            hero.vx = -5;
            hero.vy = 0;
        };
        left.release = function() {
            if (!right.isDown && hero.vy === 0) {
                hero.vx = 0;
            }
        };

        up.press = function() {
            hero.vy = -5;
            hero.vx = 0;
        };
        up.release = function() {
            if (!down.isDown && hero.vx === 0) {
                hero.vy = 0;
            }
        };

        right.press = function() {
            hero.vx = 5;
            hero.vy = 0;
        };
        right.release = function() {
            if (!left.isDown && hero.vy === 0) {
                hero.vx = 0;
            }
        };

        down.press = function() {
            hero.vy = 5;
            hero.vx = 0;
        };
        down.release = function() {
            if (!up.isDown && hero.vx === 0) {
                hero.vy = 0;
            }
        };

        console.log(hero);

        stage.addChild(hero);
    },
    state: function() {
        hero.x += hero.vx;
        hero.y += hero.vy;
    },
    destroy: function() {
        console.log("Destroying level 1");

        activeLevel = Levels.level2;
    }
}

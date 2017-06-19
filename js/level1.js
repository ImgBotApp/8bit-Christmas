var level1_hero;

function level1_setup(setupObj) {
    console.log("Loading level 1");

    level1_hero = setupObj;

    level1_hero.interactive = false;
    level1_hero.buttonMode = false;

    left.press = function() {
        level1_hero.vx = -5;
        level1_hero.vy = 0;
    };
    left.release = function() {
        if (!right.isDown && level1_hero.vy === 0) {
            level1_hero.vx = 0;
        }
    };

    up.press = function() {
        level1_hero.vy = -5;
        level1_hero.vx = 0;
    };
    up.release = function() {
        if (!down.isDown && level1_hero.vx === 0) {
            level1_hero.vy = 0;
        }
    };

    right.press = function() {
        level1_hero.vx = 5;
        level1_hero.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && level1_hero.vy === 0) {
            level1_hero.vx = 0;
        }
    };

    down.press = function() {
        level1_hero.vy = 5;
        level1_hero.vx = 0;
    };
    down.release = function() {
        if (!up.isDown && level1_hero.vx === 0) {
            level1_hero.vy = 0;
        }
    };

    console.log(level1_hero);

    stage.addChild(level1_hero);
}

function level1_state() {
    level1_hero.x += level1_hero.vx;
    level1_hero.y += level1_hero.vy;
}

function level1_destroy() {
    console.log("Destroying level 1");

    state = level2;
    setup = level2_setup;
    destroy = level2_destroy;
}
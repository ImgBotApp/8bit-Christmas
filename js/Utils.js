var Utils = {
    containHelper: function(sprite, container) {
        if (sprite.x < container.x) {
            sprite.x = container.x;
            return "left";
        }

        if (sprite.y < container.y) {
            sprite.y = container.y;
            return "top";
        }

        if (sprite.x + sprite.width > container.width) {
            sprite.x = container.width - sprite.width;
            return "right";
        }

        if (sprite.y + sprite.height > container.height) {
            sprite.y = container.height - sprite.height;
            return "bottom";
        }

        return undefined;
    },
    keyboardHelper: function(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        
        key.downHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) {
                    key.press();
                }
                
                key.isDown = true;
                key.isUp = false;

                event.preventDefault();
            }
        };

        key.upHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) {
                    key.release();
                }

                key.isDown = false;
                key.isUp = true;
                
                event.preventDefault();
            }
        };

        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );

        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        
        return key;
    },
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}
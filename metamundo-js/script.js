"use strict";

;(function() {

    var canvas, context, viewportSize;

    // viewport

    const VP = { X: 0, 
                 Y: 0, 
                 WIDTH: 15, 
                 HEIGHT: 15,
                 xPix: 512,
                 yPix: 352 };


    const FIELD_SIDE_SIZE = 32;

    const NUM_OF_TILES = 2;

    let playerInfo = { x: 0,
                       y: 0 };

    var Game = function(canvasId) {
        function loadMap(map) {
            return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0], [0, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 0], [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        };


        canvas = document.getElementById(canvasId);
        context = canvas.getContext('2d');
        let worldGrid = loadMap(1);
        let worldSize = { x: worldGrid.length - 1,
                          y: worldGrid[0].length - 1};
        

        canvas.width = VP.xPix;// window.innerWidth; //512;
        canvas.height = VP.yPix; //window.innerHeight; //352;

        let tiles = this.tileImages(NUM_OF_TILES);
        
        let player = new Player(this, VP, playerInfo, Keyboarder);

        canvas.addEventListener('keydown', function(e) {
            console.log(e);
            var key = null;
            switch (e.which) {
            case 37:
                // Left
                if (player.position.x > 0) player.position.x--;
                //break;
            case 38:
                // Up
                if (player.position.y > 0) player.position.y--;
                //break;
            case 39:
                // Right
                if (player.position.x < worldSize.x) player.position.x++;
                //break;
            case 40:
                // Down
                if (player.position.y < worldSize.y) player.position.y++;
                //break;
            }
            // Okay! The player is done moving, now we have to determine the "best" viewport.
            // Ideally the viewport centers the player,
            // but if its too close to an edge we'll have to deal with that edge

            VP.X = player.position.x - Math.floor(0.5 * vWidth);
            if (VP.X < 0) vX = 0;
            if (VP.X+vWidth > worldSize.x) VP.X = worldSize.x - vWidth;
            
            
            VP.Y = player.position.y - Math.floor(0.5 * vHeight);
            if (VP.Y < 0) VP.Y = 0;
            if (VP.Y+vHeight > worldSize.y) VP.X = worldSize.y - vHeight;
            
            this.draw(context, VP, worldGrid, tiles, [Player]);

            }, false);

        var bodies.player = player;



        var tick = function(context, VP, worldGrid, NUM_OF_TILES, bodies) {
            let tiles = this.tileImages(NUM_OF_TILES);
            //console.log("vp" + VP);
            //console.log("worldGrid" + worldGrid);

            this.draw(context, VP, worldGrid, tiles, this.bodies);
            requestAnimationFrame(tick);
        }.bind(this, context, VP, worldGrid, NUM_OF_TILES, this.bodies);
        tick();
            
    };


    Game.prototype = {

        tileImages: function(NUM_OF_TILES) {
            let tiles = [];
            for (let i = 0; i <= NUM_OF_TILES; i++) {
                let imageObj = new Image();
                imageObj.src = "images/t" + i + ".png";
                tiles.push(imageObj);
            };
            return tiles;
        },

        addBody: function(body) {
            this.bodies.push(body);
        },

        draw: function(context, VP, worldGrid, tiles, bodies) {

            context.clearRect(0, 0, VP.xPix, VP.yPix);
            for (let y = 0; y <= VP.HEIGHT; y++) {
                for (let x = 0; x <= VP.WIDTH; x++) {
                    let x_pix = x * FIELD_SIDE_SIZE;
                    let y_pix = y * FIELD_SIDE_SIZE;
                    let tile = tiles[worldGrid[y][x]];

                    context.drawImage(tile, x_pix, y_pix, FIELD_SIDE_SIZE, FIELD_SIDE_SIZE);
                };
            };
            if (this.bodies != null) {
                for (let x = 0; x < this.bodies.length; x++) {
                    context.fillStyle = 'red';
                    drawBody(context, this.bodies[x]);
                };
            };

        },

    };

    var Player = function(game, VP, playerInfo, keyboarder) {
        this.game = game; // saved for later use
        this.size = { x: 15, y: 15 };
        this.position = { x: VP.X, y: VP.Y };
        this.keyboarder = new Keyboarder();
    };


    var Keyboarder = function() {
        var keyState = {};

        window.onkeydown = function(e) {
            keyState[e.keyCode] = true;
        };

        window.onkeyup = function(e) {
            keyState[e.keyCode] = false;
        };

        this.isDown = function(e) {
            return keyState[keyCode] === true;
        };

        this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, SPACE: 32};
    };


    var drawBody = function(context, body) {
        
        context.fillRect(body.position.x,
                         body.position.y,
                         body.size.x, body.size.y);
    };
            //context.fillRect((playerX-vX)*32, (playerY-vY)*32, 32, 32);




    console.log('hi');


    window.onload = function() {
        new Game("canvas");
    };

})();
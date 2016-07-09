"use strict";

;(function() {

    var canvas, context, viewportSize;

    // viewport

    var VP = { X: 0, 
               Y: 0, 
               WIDTH: 900,    // keep this one divisable by 32. Default: 512
               HEIGHT: 900 };  // keep this one divisable by 32. Default: 352

    const FIELD_SIDE_SIZE = 32;

    const NUM_OF_TILES = 3;

    const NUM_OF_BLOBS = 1;

    const BLOB_SIZE = 8;

    const PLAYER_SIZE = 16;

    var blobs = [{
                    X: 4,
                    Y: 18,
                    type: 0
                }, 
                {
                    X: 44,
                    Y: 300,
                    type: 0

                }];



    let playerInfo = { x: 0,
                       y: 0 };

    var Game = function(canvasId) {
        function loadMap(map) {
            return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0], [0, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 0], [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        };

        canvas = document.getElementById(canvasId);
        context = canvas.getContext('2d');
        let worldGrid = loadMap(1);
        let worldSize = { x: worldGrid[0].length - 1,
                          y: worldGrid.length - 1,
                          width: (worldGrid[0].length) * FIELD_SIDE_SIZE,
                          height: (worldGrid.length) * FIELD_SIDE_SIZE};
        

        canvas.width = VP.WIDTH;// window.innerWidth; //512;
        canvas.height = VP.HEIGHT; //window.innerHeight; //352;
        console.log(VP.WIDTH);
        console.log(worldSize.width);
        if (VP.WIDTH > worldSize.width) {
            canvas.width = worldSize.width;
            VP.WIDTH = worldSize.width;
        }
        if (VP.HEIGHT > worldSize.height) {
            canvas.height = worldSize.height;
            VP.HEIGHT = worldSize.height;
        }


        let tiles = this.tileImages(NUM_OF_TILES);
        let blob_images = this.blobImages(NUM_OF_BLOBS);

        let player = new Player(this, VP, playerInfo, Keyboarder);
        this.draw(context, VP, worldGrid, worldSize, tiles, blob_images, blobs, player);

        canvas.addEventListener('keydown', function(e) {
            console.log(e);
        });

        canvas.tabIndex = 0;
        canvas.focus();
        canvas.addEventListener('keydown', function(e) {
            console.log(e);
            var key = e.keyCode;
            if (key == 37) {
                // Left
                if (player.position.x > 0) player.position.x -= 20;
            }

            if (key == 38) {
                // Up
                if (player.position.y > 0) player.position.y -= 20;
            }

            if (key == 39) {
                // Right
                if (player.position.x < (worldSize.width - player.size.x)) player.position.x += 20;
            }

            if (key == 40) {
                // Down
                if (player.position.y < (worldSize.height - player.size.y)) player.position.y += 20;
            }
            // Okay! The player is done moving, now we have to determine the "best" viewport.
            // Ideally the viewport centers the player,
            // but if its too close to an edge we'll have to deal with that edge

            VP.X = player.position.x - Math.floor(0.5 * VP.WIDTH);
            if (VP.X < 0) VP.X = 0;
            if (VP.X + VP.WIDTH > worldSize.width) VP.X = worldSize.width - VP.WIDTH;          
            
            VP.Y = player.position.y - Math.floor(0.5 * VP.HEIGHT);
            if (VP.Y < 0) VP.Y = 0;
            if (VP.Y + VP.HEIGHT > worldSize.height) VP.Y = worldSize.height - VP.HEIGHT;
            //console.log("VP y" + VP.Y);
            //Game.draw(context, VP, worldGrid, worldSize, tiles, blob_images, blobs, player);

            //let y_grid = Math.floor(VP.Y / FIELD_SIDE_SIZE);
            //let x_grid = Math.floor(VP.X / FIELD_SIDE_SIZE);

            //console.log(y_grid);
            //console.log(x_grid);
            //console.log(player.position.y);
            //console.log(worldSize.height);
            //console.log(worldSize.y);
            //console.log(player.position.x);
            //console.log(worldSize.width);
            //console.log(worldSize.x);


            }, false);

        if (canvas.addEventListener) console.log("event listener is here");
    

        var tick = function(context, VP, worldGrid, worldSize, NUM_OF_TILES, player) {
            //let tiles = this.tileImages(NUM_OF_TILES);
            //let blob_images = this.blobImages(NUM_OF_BLOBS);
            //console.log("vp" + VP);
            //console.log("worldGrid" + worldGrid);

            this.draw(context, VP, worldGrid, worldSize, tiles, blob_images, blobs, player);
            requestAnimationFrame(tick);
        }.bind(this, context, VP, worldGrid, worldSize, NUM_OF_TILES, player);
        tick();
     
    };


    Game.prototype = {

        tileImages: function(NUM_OF_TILES) {
            let tiles = [];
            for (let i = 1; i <= NUM_OF_TILES; i++) {
                let imageObj = new Image();
                imageObj.src = "images/t" + i + ".png";
                tiles.push(imageObj);
            };
            return tiles;
        },

        blobImages: function(NUM_OF_BLOBS) {
            let blob_images = [];
            for (let i = 1; i <= NUM_OF_BLOBS; i++) {
                let imageObj = new Image();
                imageObj.src = "images/b" + i + ".png";
                blob_images.push(imageObj);
            };
            return blob_images;
        },

        addBody: function(body) {
            this.bodies.push(body);
        },

        draw: function(context, VP, worldGrid, worldSize, tiles, blob_images, blobs, player) {
            context.clearRect(0, 0, VP.WIDTH, VP.HEIGHT);
            let x_max, y_max;

            let height_fields = VP.HEIGHT / FIELD_SIDE_SIZE;
            let width_fields = VP.WIDTH / FIELD_SIDE_SIZE;

            y_max = Math.ceil(height_fields) - 1;
            x_max = Math.ceil(width_fields) - 1;

            // checks which fields should be (pre) prendered.
            if (VP.X % FIELD_SIDE_SIZE != 0) {
                if (VP.X + VP.WIDTH <= worldSize.width - FIELD_SIDE_SIZE || VP.WIDTH % FIELD_SIDE_SIZE == 0) {
                    x_max = Math.ceil(width_fields);
                }
            }

            if (VP.X + VP.WIDTH > worldSize.width - FIELD_SIDE_SIZE) {
                if ((VP.WIDTH - (VP.X + VP.WIDTH - (worldSize.width - FIELD_SIDE_SIZE))) / FIELD_SIDE_SIZE > Math.floor(width_fields)) {
                    x_max = Math.ceil(width_fields);
                }
            }

            if (VP.Y % FIELD_SIDE_SIZE != 0) {
                if (VP.Y + VP.HEIGHT <= worldSize.height - FIELD_SIDE_SIZE || VP.HEIGHT % FIELD_SIDE_SIZE == 0) {
                    y_max = Math.ceil(height_fields);
                }
            }

            if (VP.Y + VP.HEIGHT > worldSize.height - FIELD_SIDE_SIZE) {
                console.log(VP.HEIGHT - (VP.Y + VP.HEIGHT - (worldSize.height - FIELD_SIDE_SIZE)));
                if ((VP.HEIGHT - (VP.Y + VP.HEIGHT - (worldSize.height - FIELD_SIDE_SIZE))) / FIELD_SIDE_SIZE > Math.floor(height_fields)) {
                    y_max = Math.ceil(height_fields);
                }
            }

            for (let y = 0; y <= y_max; y++) {
                for (let x = 0; x <= x_max; x++) {
                    let x_pix = x * FIELD_SIDE_SIZE - VP.X % FIELD_SIDE_SIZE;
                    let y_pix = y * FIELD_SIDE_SIZE - VP.Y % FIELD_SIDE_SIZE;
                    let x_grid = x + Math.floor(VP.X / FIELD_SIDE_SIZE);
                    let y_grid = y + Math.floor(VP.Y / FIELD_SIDE_SIZE);
                    
                    let tile = tiles[worldGrid[y_grid][x_grid]];

                    context.drawImage(tile, x_pix, y_pix, FIELD_SIDE_SIZE, FIELD_SIDE_SIZE);
                };
            };

            blobs.forEach(function(blob) {
                let x_pix = blob.X;
                let y_pix = blob.Y;
                if (x_pix + BLOB_SIZE < VP.X || 
                    x_pix > VP.X + VP.WIDTH || 
                    y_pix + BLOB_SIZE < VP.Y || 
                    y_pix > VP.Y + VP.HEIGHT) { 
                    return;
                }

                // blob_image = blob_images[blob.type];
                let blob_image = blob_images[blob.type];
                context.drawImage(blob_image, x_pix, y_pix, BLOB_SIZE, BLOB_SIZE);

            });




            //if (this.player != null) {
            //    for (let x = 0; x < this.player.length; x++) {
            context.fillStyle = 'red';
            drawBody(context, VP, player);
            //    };
            //};

        },

    };

    var Player = function(game, VP, playerInfo, keyboarder) {
        this.game = game; // saved for later use
        this.size = { x: PLAYER_SIZE, y: PLAYER_SIZE };
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


    var drawBody = function(context, VP, body) {
        
        context.fillRect(body.position.x - VP.X,
                         body.position.y - VP.Y,
                         body.size.x, body.size.y);

        //context.fillRect((playerX-vX)*32, (playerY-vY)*32, 32, 32);

    };
            



    console.log('hi');


    window.onload = function() {
        new Game("canvas");
    };

})();
var canvas, context, board, imageObj, tiles, board, display;
var NUM_OF_TILES = 2;

// viewport
var vX = 0,
    vY = 0,
    vWidth = 15,
    vHeight = 10;

var playerX = 0,
    playerY = 0;



function loadMap(map) {
    if (map == 1) {
        return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0], [0, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0], [0, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 0], [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 0], [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }
}


var worldWidth = loadMap(1)[0].length - 1,
    worldHeight = loadMap(1).length - 1;

$(document).ready(function() {


    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.tabIndex = 0;
    canvas.focus();
    canvas.addEventListener('keydown', function(e) {
        console.log(e);
        var key = null;
        switch (e.which) {
        case 37:
            // Left
            if (playerX > 0) playerX--;
            break;
        case 38:
            // Up
            if (playerY > 0) playerY--;
            break;
        case 39:
            // Right
            if (playerX < worldWidth) playerX++;
            break;
        case 40:
            // Down
            if (playerY < worldHeight) playerY++;
            break;
        }
        // Okay! The player is done moving, now we have to determine the "best" viewport.
        // Ideally the viewport centers the player,
        // but if its too close to an edge we'll have to deal with that edge

        vX = playerX - Math.floor(0.5 * vWidth);
        if (vX < 0) vX = 0;
        if (vX+vWidth > worldWidth) vX = worldWidth - vWidth;
        
        
        vY = playerY - Math.floor(0.5 * vHeight);
        if (vY < 0) vY = 0;
        if (vY+vHeight > worldHeight) vY = worldHeight - vHeight;
        
        
        draw();
    }, false);

    var board = [];

    canvas.width = window.innerWidth; //512;
    canvas.height = window.innerHeight; //352;

    board = loadMap(1);
    imageObj = new Image();
    tiles = [];

    var loadedImagesCount = 0;
    for (x = 0; x <= NUM_OF_TILES; x++) {
        var imageObj = new Image(); // new instance for each image
        imageObj.src = "images/t" + x + ".png";

        imageObj.onload = function() {
            // console.log("Added tile ... "+loadedImagesCount);
            loadedImagesCount++;
            if (loadedImagesCount == NUM_OF_TILES) {
                // Onces all tiles are loaded ...
                // We paint the map
                draw();
            }
        };
        tiles.push(imageObj);
    }


    function draw() {
        context.clearRect(0,0,canvas.width, canvas.height);
        for (y = 0; y <= vHeight; y++) {
            for (x = 0; x <= vWidth; x++) {
                theX = x * 32;
                theY = y * 32;
                context.drawImage(tiles[board[y+vY][x+vX]], theX, theY, 32, 32);
            }
        }
        context.fillStyle = 'red';
        context.fillRect((playerX-vX)*32, (playerY-vY)*32, 32, 32);
    }
});
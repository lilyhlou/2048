import Game from "./engine/game.js";

document.onkeydown = checkKey;
const game = new Game(4);
game.onMove(moved);
game.onWin(won);
game.onLose(lost);

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up 
            game.move('up');
    }
    else if (e.keyCode == '40') {
        // down
        game.move('down');
    }
    else if (e.keyCode == '37') {
        // left
        game.move('left');
    }
    else if (e.keyCode == '39') {
        // right
        game.move('right');
    }

}

$(document).ready(function() {

    $('#score').text("Score: " + game.gameState.score);

    for (let i = 0; i < 16; i++) {
        if (game.gameState.board[i] != 0) {
            $('#' + i).text(game.gameState.board[i]);
        }
    }
});

function moved(updateGame) {
    $('#score').text("Score: " + updateGame.score);
    for (let i = 0; i < 16; i++) {
        $('#' + i).text(" ");
    }

    for (let i = 0; i < 16; i++) {
        if (game.gameState.board[i] != 0) {
            $('#' + i).text(game.gameState.board[i]);
        }
    }
}

function lost(updateGame) {
    $('#score').text("Score: " + updateGame.score);
    for (let i = 0; i < 16; i++) {
        $('#' + i).text(" ");
    }

    for (let i = 0; i < 16; i++) {
        if (game.gameState.board[i] != 0) {
            $('#' + i).text(game.gameState.board[i]);
        }
    }
    $("#overlay").removeClass("hidden");
    $("#lost").removeClass("hidden");
    $("#win").addClass("hidden");

}

function won(updateGame) {
    for (let i = 0; i < 16; i++) {
        $('#' + i).text(" ");
    }

    $('#score').text("Score: " + updateGame.score);
    for (let i = 0; i < 16; i++) {
        if (updateGame.board[0] != 0) {
            $('#' + i).text(updateGame.board[0]);
 
        }
    }
    $("#overlay").removeClass("hidden");
    $("#win").removeClass("hidden");
    $("#lost").addClass("hidden");

}

  
$(".new-game").click(function () {
    game.setupNewGame();

    $('#score').text("Score: " + game.gameState.score);
    for (let i = 0; i < 16; i++) {
        $('#' + i).text(" ");
    }

    for (let i = 0; i < 16; i++) {
        if (game.gameState.board[i] != 0) {
            $('#' + i).text(game.gameState.board[i]);
        }
    }

    $("#lost").addClass("hidden");
    $("#win").addClass("hidden");

});

$(".start-over").click(function () {
    game.setupNewGame();
    $("#overlay").addClass("hidden");
    $('#score').text("Score: " + game.gameState.score);
    for (let i = 0; i < 16; i++) {
        $('#' + i).text(" ");
    }

    for (let i = 0; i < 16; i++) {
        if (game.gameState.board[i] != 0) {
            $('#' + i).text(game.gameState.board[i]);
        }
    }

    $("#lost").addClass("hidden");
    $("#win").addClass("hidden");


});
$(".continue").click(function () {
    $("#overlay").addClass("hidden");
    $('#score').text("Score: " + game.gameState.score);
    for (let i = 0; i < 16; i++) {
        $('#' + i).text(" ");
    }

    for (let i = 0; i < 16; i++) {
        if (game.gameState.board[i] != 0) {
            $('#' + i).text(game.gameState.board[i]);
        }
    }

    $("#lost").addClass("hidden");
    $("#win").addClass("hidden");


});








const board = document.getElementsByClassName("chess-board")[0];
const ABCLabelList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const WhitePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
const BlackPieces = ['♚', '♛', '♜', '♝', '♞', '♟'];
const Piece2TeamTable = {};
const ChessPieceRules = {
    '♚': kingMoves,
    '♔': kingMoves,
}
WhitePieces.forEach(function(piece) {Piece2TeamTable[piece]="white"});
BlackPieces.forEach(function(piece) {Piece2TeamTable[piece]="black"});
var currentSquareXy;

function xyToChess(xy) {
    return ABCLabelList[xy.x-1] + xy.y;
}
function chessToXy(chess) {
    return {
        x: ABCLabelList.indexOf(chess[0])+1, 
        y: parseInt(chess[1])
    }
}

function movePiece(from, to) {

}
function capturePiece(from, to) {
    
}

/**
 * @this HTMLDivElement
 */
function chessSquareOnClick() {
    recolorBoard();
    var piece = this.innerText;
    var team = Piece2TeamTable[piece];
    if (!ChessPieceRules[piece] || !team) return;

    var chessPos = this.id.split("-")[2];
    var xyPos = chessToXy(chessPos);
    var moves = ChessPieceRules[piece](xyPos.x, xyPos.y);
    moves.forEach(function(validSq) {
        var validSq_El = document.getElementById("chess-square-" + xyToChess(validSq));
        if (validSq_El.innerText==="") {
            validSq_El.classList.add("square-validmove");
        } else {
            targetTeam = Piece2TeamTable[validSq_El.innerText];
            if (team != targetTeam)
                validSq_El.classList.add("square-capturemove");
        }
    });
    currentSquare = this;
}

function redrawBoard() {
    board.innerText = '';
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            var square = document.createElement("div")
            if (
                (i % 2 === 0 && j % 2 === 1) ||
                (i % 2 === 1 && j % 2 === 0)
            ) square.classList.add("square-black");
            else square.classList.add("square-white");
            square.style.gridColumn = (j + 1) + " / " + (j + 1);
            square.style.gridRow = i + " / " + (i + 1);
            var square_name = ABCLabelList[j - 1] + (9 - i);
            if (Math.random()>=0.9) square.innerText = '♔';
            else if (Math.random()>=0.9) square.innerText = '♚';
            // square.innerHTML = square_name;
            square.id = "chess-square-" + square_name;
            square.classList.add("chess-square");
            square.addEventListener("click", chessSquareOnClick);
            board.appendChild(square);
        }
    }
    for (var i = 0; i < 8; i++) {
        var label = document.createElement("div");
        label.innerHTML = 8 - i;
        label.style.gridRow = (i + 1) + " / " + (i + 2);
        label.style.gridColumn = "1 / 2";
        label.classList.add("chess-numberlabel");
        board.appendChild(label);
    }
    for (var i = 0; i < 8; i++) {
        var label = document.createElement("div");
        label.innerHTML = ABCLabelList[i];
        label.style.gridColumn = (i + 2) + " / " + (i + 3);
        label.style.gridRow = "-1 / -2";
        label.classList.add("chess-abclabel")
        board.appendChild(label);
    }
    return console.log("redrew board");
}
function recolorBoard() {
    var validmove = document.getElementsByClassName("square-validmove");
    var capturemove = document.getElementsByClassName("square-capturemove");
    while (validmove.length) {
        validmove[0].classList.remove("square-validmove");
    }    
    while (capturemove.length) {
        capturemove[0].classList.remove("square-capturemove");
    }    
}
redrawBoard();

//---------
function kingMoves(a, b) {
    var moves = [
        {x: a-1, y: b-1},
        {x: a,   y: b-1},
        {x: a+1, y: b-1},
        {x: a-1, y: b},
        {x: a+1, y: b},
        {x: a-1, y: b+1},
        {x: a,   y: b+1},
        {x: a+1, y: b+1},
    ];
    return moves.filter(function(m) {
        return (m.y>=1 && m.y<=8 && m.x<=8 && m.x>=1);
    });
}
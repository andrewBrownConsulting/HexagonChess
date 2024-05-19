import { Component, OnInit } from '@angular/core';
import { Bishop, Empty, Pawn, Rook, Knight, King, Queen, chessPiece, convertFromChessToHexagon } from '../chess-pieces/chess-pieces.component';
@Component({
  selector: 'app-hexagon-board',
  templateUrl: './hexagon-board.component.html',
  styleUrls: ['./hexagon-board.component.scss']
})
export class HexagonBoardComponent implements OnInit {
  whoIsPlaying = 'white';
  iToJMap = new Map([
    [0, [5]],
    [1, [4, 6]],
    [2, [3, 5, 7]],
    [3, [2, 4, 6, 8]],
    [4, [1, 3, 5, 7, 9]],
    [5, [0, 2, 4, 6, 8, 10]],
    [6, [1, 3, 5, 7, 9]],
    [7, [0, 2, 4, 6, 8, 10]],
    [8, [1, 3, 5, 7, 9]],
    [9, [0, 2, 4, 6, 8, 10]],
    [10, [1, 3, 5, 7, 9]],
    [11, [0, 2, 4, 6, 8, 10]],
    [12, [1, 3, 5, 7, 9]],
    [13, [0, 2, 4, 6, 8, 10]],
    [14, [1, 3, 5, 7, 9]],
    [15, [0, 2, 4, 6, 8, 10]],
    [16, [1, 3, 5, 7, 9]],
    [17, [2, 4, 6, 8]],
    [18, [3, 5, 7]],
    [19, [4, 6]],
    [20, [5]],
  ]);
  chessBoard: chessPiece[] = [];
  twoDimChessBoard: chessPiece[][] = [];
  ngOnInit() {
    this.fillChessBoard();
    this.updateHexagonBoard();
  }

  fillChessBoard() {
    //the pattern of the board is bqknbnr  rp b p p  p  p p   pp    p                     p    pp   p p  p  p p b pr  rnbnqkb
    //do the white pieces first
    let counter = 0;
    for (let letter of "bqknbnr  rp b p p  p  p p   pp    p                     ") {
      if (letter === ' ') {
        this.chessBoard.push(new Empty(''));
      }
      if (letter === 'p') {
        this.chessBoard.push(new Pawn('white'));
      }
      if (letter === 'b') {
        this.chessBoard.push(new Bishop('white'));
      }
      if (letter === 'r') {
        this.chessBoard.push(new Rook('white'));
      }
      if (letter === 'n') {
        this.chessBoard.push(new Knight('white'));
      }
      if (letter === 'k') {
        this.chessBoard.push(new King('white'));
      }
      if (letter === 'q') {
        this.chessBoard.push(new Queen('white'));
      }
      counter++;
    }
    //then do the black pieces
    for (let letter of "p    pp   p p  p  p p b pr  rnbnqkb".split('')) {
      if (letter === ' ') {
        this.chessBoard.push(new Empty('black'));
      }
      if (letter === 'p') {
        this.chessBoard.push(new Pawn('black'));
      }
      if (letter === 'b') {
        this.chessBoard.push(new Bishop('black'));
      }
      if (letter === 'r') {
        this.chessBoard.push(new Rook('black'));
      }
      if (letter === 'n') {
        this.chessBoard.push(new Knight('black'));
      }
      if (letter === 'k') {
        this.chessBoard.push(new King('black'));
      }
      if (letter === 'q') {
        this.chessBoard.push(new Queen('black'));
      }
      counter++;
    }
  }

  updateHexagonBoard() {
    //get hexagon-board element
    this.twoDimChessBoard = [];
    const hexagonBoard = document.getElementById('hexagon-board');

    if (hexagonBoard === null) {
      return;
    }
    //clear the hexagon-board
    hexagonBoard.innerHTML = '';
    //create a grid with 21 rows and 11 columns
    let counter = 0;
    for (let i = 0; i < 21; i++) {
      let row: chessPiece[] = [];

      for (let j = 0; j < 11; j++) {
        let rowPiece: chessPiece = new Empty('');
        //create a div element
        let gridDiv = document.createElement('div');
        //add class to div element
        //add a div
        gridDiv.classList.add('empty-div');

        //add a hexagon inside the div
        //alternate between black, white and grey hexagons

        if (this.iToJMap.has(j)) {
          const jArray = this.iToJMap.get(i);
          if (jArray != undefined && jArray.includes(j)) {
            const hexId = 'hex' + j + i;
            if ((i + j + 1) % 2 === 0) {
              rowPiece = this.chessBoard[counter];
              let tempCounter = counter;
              if (i % 3 === 0) {
                let hexagon = document.createElement('div');
                hexagon.classList.add('hexagon');
                hexagon.classList.add('black-tile');
                hexagon.id = hexId;

                hexagon.appendChild(this.chessBoard[counter].htmlElement);

                hexagon.addEventListener('click', () => this.selectPiece(tempCounter, hexId));
                gridDiv.appendChild(hexagon);
                counter++;
              }
              else if ((i + 1) % 3 === 0) {
                let hexagon = document.createElement('div');
                hexagon.classList.add('hexagon');
                hexagon.classList.add('white-tile');
                hexagon.id = hexId;

                hexagon.appendChild(this.chessBoard[counter].htmlElement);
                hexagon.addEventListener('click', () => this.selectPiece(tempCounter, hexId));
                gridDiv.appendChild(hexagon);
                counter++;
              }
              else if ((i + 2) % 3 === 0) {
                let hexagon = document.createElement('div');
                hexagon.classList.add('hexagon');
                hexagon.classList.add('grey-tile');
                hexagon.id = hexId;

                hexagon.appendChild(this.chessBoard[counter].htmlElement);
                hexagon.addEventListener('click', () => this.selectPiece(tempCounter, hexId));
                gridDiv.appendChild(hexagon);
                counter++;
              }
            }
          }
        }


        //add div element to hexagon-board
        gridDiv.classList.add("hex" + j + i);
        hexagonBoard.appendChild(gridDiv);
        row.push(rowPiece);
      }
      this.twoDimChessBoard.push(row);
    }
    //check if the king is in check

    if (this.isKingInCheck(this.chessBoard, this.whoIsPlaying)) {
      console.log(this.whoIsPlaying + " king is in check")
      //turn the king's tile blue
      let kingpos = this.findKingPos(this.whoIsPlaying, this.chessBoard);
      let kingpos2d = this.get2dIndexFrom1dIndex(kingpos);
      let kingHexId = "hex" + kingpos2d[0] + kingpos2d[1];
      let kingHex = document.getElementById(kingHexId);
      console.log(kingHexId)
      if (kingHex) {
        kingHex.classList.add('blue-tile');
      }

    }
    else
      console.log(this.whoIsPlaying + " king is not in check")

    if (this.isKingInCheck(this.chessBoard, this.whoIsPlaying === 'white' ? 'black' : 'white')) {
      console.log(this.whoIsPlaying === 'white' ? 'black' : 'white' + " king is in check")
      //turn the king's tile blue
      let kingpos = this.findKingPos(this.whoIsPlaying === 'white' ? 'black' : 'white', this.chessBoard);
      let kingpos2d = this.get2dIndexFrom1dIndex(kingpos);
      let kingHexId = "hex" + kingpos2d[0] + kingpos2d[1];
      let kingHex = document.getElementById(kingHexId);
      console.log(kingHexId)
      if (kingHex) {
        kingHex.classList.add('blue-tile');
      }
    }
    else
      console.log((this.whoIsPlaying === 'white' ? 'black' : 'white') + " king is not in check")
    //if the king is in check, turn the king's tile red

    if (this.isKingInCheckmate(this.chessBoard, this.whoIsPlaying)) {
      this.displayCheckmateEndcard();
    }
  }
  changeHexagonColor(hexId: string) {
    const hexagon = document.getElementById(hexId);
    if (hexagon === null) {
      return;
    }
    if (hexagon.classList.contains('white-tile')) {
      hexagon.classList.value = 'black-tile hexagon';
      return;
    }
    if (hexagon.classList.contains('black-tile')) {
      hexagon.classList.value = 'grey-tile hexagon';
      return;
    }
    if (hexagon.classList.contains('grey-tile')) {
      hexagon.classList.value = 'white-tile hexagon';
      return;
    }
  }
  get2dIndexFrom1dIndex(index: number): number[] {
    let column = 0;
    while (index >= 0) {
      if (this.iToJMap.has(column)) {
        let row = this.iToJMap.get(column);
        if (row) {
          for (let i = 0; i < row.length; i++) {
            if (index === 0) {
              return [row[i], column];
            }
            index--;
          }
        }
      }
      column++;
    }
    return [];
  }
  get1dIndexFrom2dIndex(indexes: number[]): number {
    let column = indexes[0];
    let rowIndex = indexes[1];

    let counter = 0;
    //loop through all the rows and columns until you get to the row and column you want
    for (let i = 0; i < 21; i++) {
      if (this.iToJMap.has(i)) {
        let row = this.iToJMap.get(i);
        if (row) {
          for (let j = 0; j < row.length; j++) {
            if (i === rowIndex && row[j] === column) {
              return counter;
            }
            counter++;
          }
        }
      }
    }


    return counter;
  }
  movePiece(position: number, move: number[], board: chessPiece[]): any {
    board[position].hasMoved = true;
    board[this.get1dIndexFrom2dIndex(move)] = board[position];
    board[position] = new Empty('');
    this.whoIsPlaying = this.whoIsPlaying === 'white' ? 'black' : 'white';

    this.updateHexagonBoard();
  }
  selectPiece(position: number, hexId: string) {
    let piece = this.chessBoard[position];
    if (piece.color != this.whoIsPlaying) {
      return;
    }
    this.updateHexagonBoard();
    const validMoves = this.getValidMoves(position, this.chessBoard);
    document.getElementById(hexId)?.classList.add('selected-tile');
    //turn valid moves tiles into orange-tile
    for (let move of validMoves) {
      if (!this.willMovePutKingInCheck(position, this.get1dIndexFrom2dIndex(move), this.chessBoard, this.whoIsPlaying)) {
        let hexId = 'hex' + move[0] + move[1];
        let validHex = document.getElementById(hexId);
        if (validHex) {
          validHex?.classList.add('valid-move-tile');
          validHex.onclick = () => this.movePiece(position, move, this.chessBoard);
        }
      }

    }
  }
  getValidMoves(position: number, board: chessPiece[]): number[][] {
    let piece = board[position];
    return piece.validMoves(position, board);
  }

  getAllValidMoves(board: chessPiece[], color: string): number[] {
    let validMoves: number[] = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i].color == color) {
        for (let move of this.getValidMoves(i, board)) {
          validMoves.push(this.get1dIndexFrom2dIndex(move));
        }
      }
    }
    return validMoves;
  }

  findKingPos(color: string, board: chessPiece[]) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].name === 'king' && board[i].color === color) {
        return i;
      }
    }
    return -1;
  }

  isKingInCheck(board: chessPiece[], color: string): boolean {
    const kingPos = this.findKingPos(color, board);
    console.log("kingpos is " + kingPos)
    let validOpposingMoves = this.getAllValidMoves(board, color === 'white' ? 'black' : 'white');
    //sort valid opposing moves by ascending order
    validOpposingMoves.sort((a, b) => a - b);
    console.log("valid opposing moves are " + validOpposingMoves);
    console.log(validOpposingMoves);
    for (const move of validOpposingMoves) {
      if (kingPos === move) {
        console.log("king is put in check")
        return true;
      }
    }
    console.log("king is not put in check")
    return false;
  }
  willMovePutKingInCheck(position: number, move: number, board: chessPiece[], color: string): boolean {
    const kingPos = this.findKingPos(this.whoIsPlaying, board);

    let newBoard: chessPiece[] = [];
    //copy chessboard over to newBoard
    for (let i = 0; i < board.length; i++) {
      newBoard.push(board[i]);
    }
    newBoard[move] = newBoard[position];
    newBoard[position] = new Empty('');

    return this.isKingInCheck(newBoard
      , color);

  }

  isKingInCheckmate(board: chessPiece[], color: string): boolean {
    //if the king is in check and has no valid moves, then it is checkmate
    if (this.isKingInCheck(board, color)) {
      //loop though all valid positions
      for (let i = 0; i < board.length; i++) {
        if (board[i].color === color) {
          for (let move of this.getValidMoves(i, board)) {
            if (!this.willMovePutKingInCheck(i, this.get1dIndexFrom2dIndex(move), board, color)) {
              return false;
            }
          }
        }
      }
      return true;
    }
    return false;
  }

  displayCheckmateEndcard() {
    //make an element that covers the board displaying checkmate and a button to restart the game
    let board = document.getElementById('game-area');
    if (board === null) {
      return;
    }
    console.log()
    let endCard = document.createElement('div');
    endCard.id = ('end-card');
    let endCardText = document.createElement('div');
    endCardText.classList.add('end-card-text');
    endCardText.innerHTML = "Checkmate";
    //
    let restartButtonDiv = document.createElement('div');
    let restartButton = document.createElement('button');
    restartButton.classList.add('restart-button');
    restartButton.innerHTML = "Restart";
    restartButton.addEventListener('click', () => this.restartGame());
    restartButtonDiv.appendChild(restartButton);
    endCard.appendChild(endCardText);
    endCard.appendChild(restartButtonDiv);
    board.appendChild(endCard);

  }
  restartGame() {
    this.whoIsPlaying = 'white';
    this.chessBoard = [];
    this.fillChessBoard();
    this.updateHexagonBoard();
    //remove the end card
    let endCard = document.getElementById('end-card');
    if (endCard) {
      endCard.remove();
    }

  }
}


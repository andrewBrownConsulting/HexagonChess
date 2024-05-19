import { Component } from '@angular/core';

@Component({
  selector: 'app-chess-pieces',
  templateUrl: './chess-pieces.component.html',
  styleUrls: ['./chess-pieces.component.scss']
})
export class ChessPiecesComponent {

}

export class chessPiece {
  name: string;
  color: string;
  htmlElement: HTMLElement;
  character: string;
  hasMoved = false;
  constructor(name: string, color: string, character: string) {
    this.name = name;
    this.color = color;
    this.character = character;
    if (name != 'empty') {
      this.htmlElement = document.createElement('img');
      this.htmlElement.setAttribute('src', 'assets/chessPieces/' + this.name + '-' + this.color + '.png');
      this.htmlElement.setAttribute('alt', this.character);
      this.htmlElement.className = color + '" id = ' + this.name;
    }
    else
      this.htmlElement = document.createElement('img');


  }
  validMoves(position: number, board: chessPiece[]): number[][] {
    return [];
  }
}
export class Pawn extends chessPiece {
  constructor(color: string) {
    super('pawn', color, 'P');
  }
  override validMoves(position: number, board: chessPiece[]): number[][] {
    let pawn = board[position];
    let twoDimPos = get2dIndexFrom1dIndex(position);
    let validMoves: number[][] = [];
    let vectors = [];
    if (pawn.color === 'white') {
      vectors.push([0, 2]);
    }
    if (pawn.color === 'black') {
      vectors.push([0, -2]);
    }
    for (const vector of vectors) {
      for (let i = 1; i < (pawn.hasMoved ? 2 : 3); i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name == 'empty') {
          validMoves.push(nextPos);
        }
        else
          break;
      }
    }
    const attackVectors = [];
    if (pawn.color === 'white') {
      attackVectors.push([1, 1]);
      attackVectors.push([-1, 1]);
    }
    if (pawn.color === 'black') {
      attackVectors.push([1, -1]);
      attackVectors.push([-1, -1]);
    }
    for (const vector of attackVectors) {
      for (let i = 1; i < 2; i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name != 'empty') {
          if (board[get1dIndexFrom2dIndex(nextPos)].color != pawn.color) {
            validMoves.push(nextPos);

          }
        }
      }
    }

    return validMoves;
  }
}

export class Bishop extends chessPiece {
  constructor(color: string) {
    super('bishop', color, 'B');
  }
  override validMoves(position: number, board: chessPiece[]): number[][] {
    let rook = board[position];
    let twoDimPos = get2dIndexFrom1dIndex(position);
    let validMoves: number[][] = [];
    let vectors = [[1, 3], [-1, 3], [-2, 0], [2, 0], [1, -3], [-1, -3]];
    for (const vector of vectors) {
      for (let i = 1; i < 11; i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name != 'empty') {
          if (board[get1dIndexFrom2dIndex(nextPos)].color != rook.color) {
            validMoves.push(nextPos);
          }
          break;
        }
        else {
          validMoves.push(nextPos);
        }
      }
    }
    return validMoves;
  }
}
export class Queen extends chessPiece {
  constructor(color: string) {
    super('queen', color, 'Q');
  }

  override validMoves(position: number, board: chessPiece[]): number[][] {
    let rook = board[position];
    let twoDimPos = get2dIndexFrom1dIndex(position);
    let validMoves: number[][] = [];
    let vectors = [[0, 2], [0, -2], [1, 1], [1, -1], [-1, 1], [-1, -1], [1, 3], [-1, 3], [-2, 0], [2, 0], [1, -3], [-1, -3]];
    for (const vector of vectors) {
      for (let i = 1; i < 11; i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name != 'empty') {
          if (board[get1dIndexFrom2dIndex(nextPos)].color != rook.color) {
            validMoves.push(nextPos);
          }
          break;
        }
        else {
          validMoves.push(nextPos);
        }
      }
    }
    return validMoves;
  }
}
export class Rook extends chessPiece {
  constructor(color: string) {
    super('rook', color, 'R');
  }
  override validMoves(position: number, board: chessPiece[]): number[][] {
    let rook = board[position];
    let twoDimPos = get2dIndexFrom1dIndex(position);
    let validMoves: number[][] = [];
    let vectors = [[0, 2], [0, -2], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (const vector of vectors) {
      for (let i = 1; i < 11; i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name != 'empty') {
          if (board[get1dIndexFrom2dIndex(nextPos)].color != rook.color) {
            validMoves.push(nextPos);
          }
          break;
        }
        else {
          validMoves.push(nextPos);
        }
      }
    }
    return validMoves;
  }
}
export class Knight extends chessPiece {
  constructor(color: string) {
    super('knight', color, 'N');
  }
  override validMoves(position: number, board: chessPiece[]): number[][] {
    let rook = board[position];
    let twoDimPos = get2dIndexFrom1dIndex(position);
    let validMoves: number[][] = [];
    let vectors = [[2, 4], [2, -4], [-2, 4], [-2, -4], [-3, 1], [-3, -1], [3, 1], [3, -1], [-1, 5], [-1, -5], [1, 5], [1, -5],];
    for (const vector of vectors) {
      for (let i = 1; i < 2; i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name != 'empty') {
          if (board[get1dIndexFrom2dIndex(nextPos)].color != rook.color) {
            validMoves.push(nextPos);
          }
          break;
        }
        else {
          validMoves.push(nextPos);
        }
      }
    }
    return validMoves;
  }
}

export class King extends chessPiece {
  constructor(color: string) {
    super('king', color, 'K');
  }
  override validMoves(position: number, board: chessPiece[]): number[][] {
    let rook = board[position];
    let twoDimPos = get2dIndexFrom1dIndex(position);
    let validMoves: number[][] = [];
    let vectors = [[0, 2], [0, -2], [1, 1], [1, -1], [-1, 1], [-1, -1], [1, 3], [-1, 3], [-2, 0], [2, 0], [1, -3], [-1, -3]];
    for (const vector of vectors) {
      for (let i = 1; i < 2; i++) {
        let nextPos = [twoDimPos[0] + vector[0] * i, twoDimPos[1] + vector[1] * i]
        if (board[get1dIndexFrom2dIndex(nextPos)] === undefined) {
          break;
        }
        if (board[get1dIndexFrom2dIndex(nextPos)].name != 'empty') {
          if (board[get1dIndexFrom2dIndex(nextPos)].color != rook.color) {
            validMoves.push(nextPos);
          }
          break;
        }
        else {
          validMoves.push(nextPos);
        }
      }
    }
    return validMoves;
  }
}
export class Empty extends chessPiece {
  constructor(color: string) {
    super('empty', color, '');
    //html element is a div
    this.htmlElement = document.createElement('div');
  }
}



export function convertFromChessToHexagon(chessPosition: string) {
  //convert from chess notation to hexagon notation

  const columnStartingXs = new Map([['a', 0], ['b', 1], ['c', 2], ['d', 3], ['e', 4], ['f', 5], ['g', 6], ['h', 7], ['i', 8], ['k', 9], ['l', 10]]);
  const columnStartingYs = new Map([['a', 5], ['b', 4], ['c', 3], ['d', 2], ['e', 1], ['f', 0], ['g', 1], ['h', 2], ['i', 3], ['k', 4], ['l', 5]]);
  //split the string into an array
  const chessPositionArray = chessPosition.split('');
  //get the first element of the arrayq
  let column = chessPositionArray[0];
  column = column.toLowerCase();
  //get the second element of the array
  const row = chessPositionArray[1];
  if (column == undefined)
    return;
  const startingY = columnStartingYs.get(column);
  if (startingY == undefined)
    return;
  console.log("row = " + (startingY + parseInt(row) - 1))
  console.log("column = " + columnStartingXs.get(column))
  return "hex" + columnStartingXs.get(column) + (startingY + parseInt(row) - 1);
}

const iToJMap = new Map([
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
function get2dIndexFrom1dIndex(index: number): number[] {
  let column = 0;
  while (index >= 0) {
    if (iToJMap.has(column)) {
      let row = iToJMap.get(column);
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
function get1dIndexFrom2dIndex(indexes: number[]): number {
  let column = indexes[0];
  let rowIndex = indexes[1];

  let counter = 0;
  //loop through all the rows and columns until you get to the row and column you want
  for (let i = 0; i < 21; i++) {
    if (iToJMap.has(i)) {
      let row = iToJMap.get(i);
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
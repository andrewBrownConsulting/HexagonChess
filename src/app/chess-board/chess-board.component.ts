import { Component, OnInit } from '@angular/core';
//import the css file
//import './chess-board.component.scss';
@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent {

  ngOnInit() {
    this.generateBoard();
  }
  generateBoard() {
    //add 64 divs to the board alternating between black and white like a chess board
    let board = document.getElementById("chess-board");
    if (board == null) {
      return;
    }
    for (let i = 0; i < 64; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      if ((i + Math.floor(i / 8)) % 2 == 0) {
        square.classList.add("white");
      } else {
        square.classList.add("black");
      }
      board.appendChild(square);
    }
  }
}

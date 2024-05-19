import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { HexagonBoardComponent } from './hexagon-board/hexagon-board.component';
import { ChessPiecesComponent } from './chess-pieces/chess-pieces.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    HexagonBoardComponent,
    ChessPiecesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

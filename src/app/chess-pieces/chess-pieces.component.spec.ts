import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessPiecesComponent } from './chess-pieces.component';

describe('ChessPiecesComponent', () => {
  let component: ChessPiecesComponent;
  let fixture: ComponentFixture<ChessPiecesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessPiecesComponent]
    });
    fixture = TestBed.createComponent(ChessPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

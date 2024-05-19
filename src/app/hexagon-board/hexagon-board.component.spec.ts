import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonBoardComponent } from './hexagon-board.component';

describe('HexagonBoardComponent', () => {
  let component: HexagonBoardComponent;
  let fixture: ComponentFixture<HexagonBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HexagonBoardComponent]
    });
    fixture = TestBed.createComponent(HexagonBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

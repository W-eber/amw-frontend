import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWebsiteNavComponent } from './game-website-nav.component';

describe('GameWebsiteNavComponent', () => {
  let component: GameWebsiteNavComponent;
  let fixture: ComponentFixture<GameWebsiteNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameWebsiteNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameWebsiteNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

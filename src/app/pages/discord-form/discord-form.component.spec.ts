import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordFormComponent } from './discord-form.component';

describe('DiscordFormComponent', () => {
  let component: DiscordFormComponent;
  let fixture: ComponentFixture<DiscordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

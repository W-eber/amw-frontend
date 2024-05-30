import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftFormComponent } from './minecraft-form.component';

describe('MinecraftFormComponent', () => {
  let component: MinecraftFormComponent;
  let fixture: ComponentFixture<MinecraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinecraftFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinecraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

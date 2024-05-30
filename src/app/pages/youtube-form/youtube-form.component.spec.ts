import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeFormComponent } from './youtube-form.component';

describe('YoutubeFormComponent', () => {
  let component: YoutubeFormComponent;
  let fixture: ComponentFixture<YoutubeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YoutubeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YoutubeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateLessonsComponent } from './rate-lessons.component';

describe('RateLessonsComponent', () => {
  let component: RateLessonsComponent;
  let fixture: ComponentFixture<RateLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateLessonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

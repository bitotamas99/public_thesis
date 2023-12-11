import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedInstructorsComponent } from './recommended-instructors.component';

describe('RecommendedInstructorsComponent', () => {
  let component: RecommendedInstructorsComponent;
  let fixture: ComponentFixture<RecommendedInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedInstructorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

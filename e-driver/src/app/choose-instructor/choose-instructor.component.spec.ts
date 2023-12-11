import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseInstructorComponent } from './choose-instructor.component';

describe('ChooseInstructorComponent', () => {
  let component: ChooseInstructorComponent;
  let fixture: ComponentFixture<ChooseInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

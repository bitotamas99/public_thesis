import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingSchoolsEditComponent } from './driving-schools-edit.component';

describe('DrivingSchoolsEditComponent', () => {
  let component: DrivingSchoolsEditComponent;
  let fixture: ComponentFixture<DrivingSchoolsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingSchoolsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingSchoolsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

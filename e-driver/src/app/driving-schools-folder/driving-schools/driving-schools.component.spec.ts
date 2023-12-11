import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingSchoolsComponent } from './driving-schools.component';

describe('DrivingSchoolsComponent', () => {
  let component: DrivingSchoolsComponent;
  let fixture: ComponentFixture<DrivingSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

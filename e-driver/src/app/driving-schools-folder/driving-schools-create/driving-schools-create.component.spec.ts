import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingSchoolsCreateComponent } from './driving-schools-create.component';

describe('DrivingSchoolsComponent', () => {
  let component: DrivingSchoolsCreateComponent;
  let fixture: ComponentFixture<DrivingSchoolsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingSchoolsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingSchoolsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

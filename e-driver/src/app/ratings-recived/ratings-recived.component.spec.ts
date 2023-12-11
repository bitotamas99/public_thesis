import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsRecivedComponent } from './ratings-recived.component';

describe('RatingsRecivedComponent', () => {
  let component: RatingsRecivedComponent;
  let fixture: ComponentFixture<RatingsRecivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingsRecivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsRecivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivedCommentsComponent } from './recived-comments.component';

describe('RecivedCommentsComponent', () => {
  let component: RecivedCommentsComponent;
  let fixture: ComponentFixture<RecivedCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecivedCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecivedCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

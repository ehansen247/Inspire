import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QOfDayComponent } from './q-of-day.component';

describe('QOfDayComponent', () => {
  let component: QOfDayComponent;
  let fixture: ComponentFixture<QOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

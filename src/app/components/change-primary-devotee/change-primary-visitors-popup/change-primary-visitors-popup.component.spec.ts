import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryVisitorsPopupComponent } from './change-primary-visitors-popup.component';

describe('ChangePrimaryVisitorsPopupComponent', () => {
  let component: ChangePrimaryVisitorsPopupComponent;
  let fixture: ComponentFixture<ChangePrimaryVisitorsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryVisitorsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryVisitorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

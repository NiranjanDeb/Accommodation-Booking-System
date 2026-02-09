import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryVerifyOtpPopupComponent } from './change-primary-verify-otp-popup.component';

describe('ChangePrimaryVerifyOtpPopupComponent', () => {
  let component: ChangePrimaryVerifyOtpPopupComponent;
  let fixture: ComponentFixture<ChangePrimaryVerifyOtpPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryVerifyOtpPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryVerifyOtpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

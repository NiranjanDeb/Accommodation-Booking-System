import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryConfirmationPopupComponent } from './change-primary-confirmation-popup.component';

describe('ChangePrimaryConfirmationPopupComponent', () => {
  let component: ChangePrimaryConfirmationPopupComponent;
  let fixture: ComponentFixture<ChangePrimaryConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryConfirmationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

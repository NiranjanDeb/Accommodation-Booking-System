import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryCommonPopupComponent } from './change-primary-common-popup.component';

describe('ChangePrimaryCommonPopupComponent', () => {
  let component: ChangePrimaryCommonPopupComponent;
  let fixture: ComponentFixture<ChangePrimaryCommonPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryCommonPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryCommonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

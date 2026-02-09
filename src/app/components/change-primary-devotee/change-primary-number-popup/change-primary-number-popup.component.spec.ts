import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryNumberPopupComponent } from './change-primary-number-popup.component';

describe('ChangePrimaryNumberPopupComponent', () => {
  let component: ChangePrimaryNumberPopupComponent;
  let fixture: ComponentFixture<ChangePrimaryNumberPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryNumberPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryNumberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

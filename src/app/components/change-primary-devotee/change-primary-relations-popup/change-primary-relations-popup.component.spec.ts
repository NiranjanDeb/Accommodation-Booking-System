import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryRelationsPopupComponent } from './change-primary-relations-popup.component';

describe('ChangePrimaryRelationsPopupComponent', () => {
  let component: ChangePrimaryRelationsPopupComponent;
  let fixture: ComponentFixture<ChangePrimaryRelationsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryRelationsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryRelationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

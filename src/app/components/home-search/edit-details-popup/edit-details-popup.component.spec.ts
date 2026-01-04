import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsPopupComponent } from './edit-details-popup.component';

describe('EditDetailsPopupComponent', () => {
  let component: EditDetailsPopupComponent;
  let fixture: ComponentFixture<EditDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDetailsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

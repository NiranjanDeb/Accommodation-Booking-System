import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFcPopupComponent } from './update-fc-popup.component';

describe('UpdateFcPopupComponent', () => {
  let component: UpdateFcPopupComponent;
  let fixture: ComponentFixture<UpdateFcPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFcPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

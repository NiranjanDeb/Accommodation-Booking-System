import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdhaarComponent } from './edit-adhaar.component';

describe('EditAdhaarComponent', () => {
  let component: EditAdhaarComponent;
  let fixture: ComponentFixture<EditAdhaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdhaarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

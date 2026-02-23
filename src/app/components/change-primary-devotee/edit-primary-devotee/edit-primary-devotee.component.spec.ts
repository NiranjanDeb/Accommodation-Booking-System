import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrimaryDevoteeComponent } from './edit-primary-devotee.component';

describe('EditPrimaryDevoteeComponent', () => {
  let component: EditPrimaryDevoteeComponent;
  let fixture: ComponentFixture<EditPrimaryDevoteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrimaryDevoteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrimaryDevoteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevoteeFcComponent } from './edit-devotee-fc.component';

describe('EditDevoteeFcComponent', () => {
  let component: EditDevoteeFcComponent;
  let fixture: ComponentFixture<EditDevoteeFcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDevoteeFcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDevoteeFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

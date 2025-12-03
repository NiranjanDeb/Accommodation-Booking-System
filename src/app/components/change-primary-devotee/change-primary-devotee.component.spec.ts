import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePrimaryDevoteeComponent } from './change-primary-devotee.component';

describe('ChangePrimaryDevoteeComponent', () => {
  let component: ChangePrimaryDevoteeComponent;
  let fixture: ComponentFixture<ChangePrimaryDevoteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePrimaryDevoteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePrimaryDevoteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

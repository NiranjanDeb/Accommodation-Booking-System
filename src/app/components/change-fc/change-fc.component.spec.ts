import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFcComponent } from './change-fc.component';

describe('ChangeFcComponent', () => {
  let component: ChangeFcComponent;
  let fixture: ComponentFixture<ChangeFcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeFcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

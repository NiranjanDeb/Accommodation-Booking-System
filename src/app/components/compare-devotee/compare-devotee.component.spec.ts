import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDevoteeComponent } from './compare-devotee.component';

describe('CompareDevoteeComponent', () => {
  let component: CompareDevoteeComponent;
  let fixture: ComponentFixture<CompareDevoteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareDevoteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareDevoteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

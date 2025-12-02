import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSearchComponent } from './filter-and-search.component';

describe('FilterAndSearchComponent', () => {
  let component: FilterAndSearchComponent;
  let fixture: ComponentFixture<FilterAndSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAndSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAndSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

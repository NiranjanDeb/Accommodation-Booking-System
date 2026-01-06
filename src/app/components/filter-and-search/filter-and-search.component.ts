import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-filter-and-search',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
],
  templateUrl: './filter-and-search.component.html',
  styleUrl: './filter-and-search.component.scss'
})
export class FilterAndSearchComponent {
  fc = new FormControl('');

  allowNum(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input?.value;
    if(!val) return;

    const filtered = val.replace(/[^0-9]/g, '');
    if(filtered !== val) {
      this.fc.setValue(filtered, {emitEvent: false});
    }
  }
}

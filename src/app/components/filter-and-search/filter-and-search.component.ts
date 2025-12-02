import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filter-and-search',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './filter-and-search.component.html',
  styleUrl: './filter-and-search.component.scss'
})
export class FilterAndSearchComponent {

}

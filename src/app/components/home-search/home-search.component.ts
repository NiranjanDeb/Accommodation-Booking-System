import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [ MatSelectModule,
      MatFormFieldModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent {

  isHide: boolean = false

  onSelectType(event: any){
    if(event.value == 'profile'){
      this.isHide = true
    }else{
      this.isHide = false
    }
    
  }

}

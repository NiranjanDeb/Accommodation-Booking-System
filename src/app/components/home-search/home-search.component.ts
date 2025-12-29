import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [ MatSelectModule,
      MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent implements OnInit {

  isHide: boolean = false
  searchType = new FormControl('')
  reference = new FormControl('')
  referenceInput = new FormControl('')
  pin = new FormControl('')

  profileData: any = []

 

  constructor(
    private advanceService: AdvanceSearchService
  ){}

  ngOnInit(): void {
    
  }

  onSelectType(event: any){
    if(event.value == 'profile'){
      this.isHide = true
    }else{
      this.isHide = false
    }
  }
  reset(){
    this.reference.setValue('')
    this.reference.setValue('')
  }

  searchProfile(){
    const payload = { 
      key: this.referenceInput?.value,
      keyType: this.reference?.value

    }
    this.advanceService.fetchProfile(payload).subscribe({
      next: (res)=>{
        if(res.data.length>0)
        this.profileData = res.data
        console.log(this.profileData);
      
      }
    })
  }

  


}

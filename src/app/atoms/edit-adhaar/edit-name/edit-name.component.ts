import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';

@Component({
  selector: 'app-edit-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.scss',
})
export class EditNameComponent implements OnInit{
  selectedMemberCode!: string;
  filterData: any [] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditNameComponent>,
    private advanceSearch: AdvanceSearchService
  ) {
    // this.selectedName = data.selected;
  }

  ngOnInit(): void {
    console.log(this.data);

    if(this.data.memberCode && this.data.memberCode.length === 12){
      this.filterData= this.data.list.filter((v: any)=> v.memberCode === this.data.memberCode)
    }else{
      this.filterData= this.data.list.filter((v: any)=> !this.data.memberDetails.some((b: any)=> b.devoteeMemberCode === v.memberCode));
      
    }
    
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    const payload = {
      familyCode: this.data.familyCode,
      memberCode: this.selectedMemberCode,
      devoteeId: this.data.devoteeId
    }
    this.advanceSearch.updateName(payload).subscribe({
      next: (res)=>{
        this.dialogRef.close(this.data.familyCode);
      }
    })
  }


}

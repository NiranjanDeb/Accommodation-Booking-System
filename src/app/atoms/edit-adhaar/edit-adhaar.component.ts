import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-edit-adhaar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-adhaar.component.html',
  styleUrl: './edit-adhaar.component.scss',
})
export class EditAdhaarComponent implements OnInit{
  aadhaar!: string;
  errorMessage: string = ''
  errData: any = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAdhaarComponent>,
    private advanceSearch: AdvanceSearchService,
    private toaster: ToastService,
  ) {
    this.aadhaar = data.aadhaar;
  }
  ngOnInit(): void {
    console.log(this.data);
    
  }

  close(): void {
    this.dialogRef.close();
  }

  copy(value: number | string) {
  navigator.clipboard.writeText(value.toString());
}

  continue(): void {
    if(this.data.editType !== 'Visitor'){
    const payLoad = {
      familyCode: this.data.devoteeDetails.devoteeFamilyCode,
      devoteeId: this.data.devoteeDetails.devoteeId,
      aadhaarNumber: this.aadhaar
    }
    this.advanceSearch.UpdateDevoteeAadhar(payLoad).subscribe({
      next: (res) => {
        this.toaster.success("Devotee's aadhar successfully updated")
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toaster.error(err.error.message)
        this.errorMessage = err.error.message
        this.errData = err.error.error
      }
    })
  }else{
     const payLoad = {
      familyCode: this.data.familyCode,
      visitorId: this.data.visitorId,
      aadhaarNumber: this.aadhaar
    }
    this.advanceSearch.UpdateVisitorAadhar(payLoad).subscribe({
      next: (res) => {
        this.toaster.success("Visitor's aadhar successfully updated")
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toaster.error(err.error.message)
        
      }
    })
  }
}
}

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-update-fc-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-fc-popup.component.html',
  styleUrl: './update-fc-popup.component.scss'
})
export class UpdateFcPopupComponent {
  fc!: string;
  isExist: boolean = false
  philanthropyMembers: any[] = [];
  selectedMemberCode: string = ''
  isShow: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateFcPopupComponent>,
    private advanceSearch: AdvanceSearchService,
    private toaster: ToastService
  ) {
    // this.fc = data.devoteeFamilyCode;
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    this.validateFC(this.fc)
   
  }

  getWorkerDetails(familyCode: string): void {
  if(familyCode?.length === 12 && familyCode !== this.data.devoteeFamilyCode){
    this.philanthropyMembers = [];

    this.advanceSearch.fetchPhilDetails(familyCode).subscribe({
      next: (res) => {
        const data = res?.data;
        this.philanthropyMembers =  res?.data || [];
        this.isShow = true
      },
      error: (err) => {
        this.toaster.error(err.error.message)
      },
    });
  }
  }

  validateFC(fc: string){
    if(fc?.length === 12 && fc !== this.data.devoteeFamilyCode){
    const payload = {
      devoteeId:this.data.devoteeId,
      familyCode: this.data.devoteeFamilyCode,
      newFamilyCode: fc
    }
    this.advanceSearch.ValidateDevoteeFc(payload).subscribe({
      next: (res) => {
      this.dialogRef.close({
      accntExist: res.data.accountExists,
      newFc: this.fc,
      newMemberCode: this.selectedMemberCode
  });       
      }, 
      error: (err) =>{
        this.toaster.error(err.error.message)
      }
    })
  }
}
}

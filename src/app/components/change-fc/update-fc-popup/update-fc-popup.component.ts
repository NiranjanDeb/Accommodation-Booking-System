import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';
import { ToastService } from '../../../services/toast/toast.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-fc-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './update-fc-popup.component.html',
  styleUrls: ['./update-fc-popup.component.scss', '../../../../common-style/dropdown.scss']
})
export class UpdateFcPopupComponent {
  fc!: string;
  isExist: boolean = false
  philanthropyMembers: any[] = [];
  selectedMemberCode: any
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
        if(res.data.length > 0){
        this.philanthropyMembers =  res?.data || [];

        this.isShow = true
        }else{
          this.toaster.success('Result not found')
        }
      },
      error: (err) => {
        this.toaster.error(err.error.message)
      },
    });
  }
  }

  validateFC(fc: string){
    if(fc?.length === 12 && fc !== this.data.devoteeFamilyCode){
      console.log(fc);
      
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
      newMemberCode: this.selectedMemberCode.memberCode,
      updateMember: res.data.newFcDevoteeName
  });       
      }, 
      error: (err) =>{
        this.toaster.error(err.error.message)
      }
    })
  }
}
}

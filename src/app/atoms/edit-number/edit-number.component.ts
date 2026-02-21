import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';
import { ToastService } from '../../services/toast/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-number.component.html',
  styleUrl: './edit-number.component.scss'
})
export class EditNumberComponent implements OnInit{
  contactNumber!: string;
  contactNumbers: any[] = []
  isChecking: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditNumberComponent>,
    private advanceSearch: AdvanceSearchService,
    private toaster: ToastService,
  ) {
  }

  ngOnInit(): void {
     this.getContactNumbers()
  }

  close(): void {
    this.dialogRef.close();
  }

  copy(value: number | string) {
  navigator.clipboard.writeText(value.toString());
}

  continue(): void {
    const payLoad = {
      familyCode: this.data.devoteeDetails.devoteeFamilyCode,
      devoteeId: this.data.devoteeDetails.devoteeId,
      contactNumber: this.contactNumber
    }
    this.advanceSearch.UpdateDevoteeNumber(payLoad).subscribe({
      next: (res) => {
        this.toaster.success("Devotee's aadhar successfully updated")
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toaster.error(err.error.message)
       
      }
    })
  }

    getContactNumbers(){
    this.advanceSearch
      .fetchContactNumbers(this.data.devoteeDetails.devoteeFamilyCode)
      .subscribe({
        next: (res: any) => {
          this.contactNumbers = res?.data.contactNumbers || [];
        },
         error: (err) => {
          this.toaster.error(err.message)
        }
  })

  }

     onNumberChange(): void {

    this.advanceSearch
      .fetchAvailableContactNumber({
        contactNumber: this.contactNumber,
        familyCode: this.data.devoteeDetails.devoteeFamilyCode,
       
      })
      .subscribe({
        next: (res: any) => {
          this.isChecking = false;

          // if (res?.success === true && res?.data?.available === true) {
          //   this.isValidNumber = true;
          //   this.errorMessage = '';
          // } else {
          //   this.isValidNumber = false;
          //   this.errorMessage = res?.message || 'Contact number already exists';
          // }
        },
        error: (err: any) => {
          // this.isChecking = false;
          // this.isValidNumber = false;
          this.toaster.error(err.error.message)
        },
      });
  }
}

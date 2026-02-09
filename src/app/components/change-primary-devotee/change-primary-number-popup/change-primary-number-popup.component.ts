import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePrimaryVerifyOtpPopupComponent } from '../change-primary-verify-otp-popup/change-primary-verify-otp-popup.component';

@Component({
  selector: 'app-change-primary-number-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-primary-number-popup.component.html',
  styleUrl: './change-primary-number-popup.component.scss',
})
export class ChangePrimaryNumberPopupComponent {
  selectedNumber: string = '';
  isValidNumber = false;
  errorMessage = '';
  isChecking = false;

  constructor(
    private dialogRef: MatDialogRef<ChangePrimaryNumberPopupComponent>,
    private advanceService: AdvanceSearchService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedPrimary: any;
      familyMembers: any[];
      visitors?: any[];
      orderName?: string;
      relationsPayload?: any;
      relationMapperList: {
        id: number;
        gender: string;
        relationship: string;
      }[];

      visitorsMapperList?: {
        id: number;
        gender: string;
        relationship: string;
      }[];

      familyCode: string;
      contactNumbers: any[];
    },
  ) {
    console.log('NUMBER POPUP – FULL DATA:', data);
    console.log('Received relationMapperList:', this.data.relationMapperList);
  }

  close(): void {
    this.dialogRef.close(false);
  }
  onNumberChange(): void {
    if (!this.selectedNumber) {
      this.isValidNumber = false;
      this.errorMessage = '';
      return;
    }

    this.isChecking = true;
    this.isValidNumber = false;
    this.errorMessage = '';

    this.advanceService
      .fetchAvailableContactNumber({
        contactNumber: this.selectedNumber,
        familyCode: this.data.familyCode,
      })
      .subscribe({
        next: (res: any) => {
          this.isChecking = false;

          if (res?.success === true && res?.data?.available === true) {
            this.isValidNumber = true;
            this.errorMessage = '';
          } else {
            this.isValidNumber = false;
            this.errorMessage = res?.message || 'Contact number already exists';
          }
        },
        error: (err: any) => {
          this.isChecking = false;
          this.isValidNumber = false;
          this.errorMessage = err?.error?.message || err?.message;
        },
      });
  }

  // continue(): void {
  //   if (!this.isValidNumber) return;

  //   this.dialogRef.close({
  //     familyCode: this.data.familyCode,
  //     selectedNumber: this.selectedNumber,
  //   });

  //   const finalPayload = {
  //     devoteeId: this.data.selectedPrimary.devoteeId,
  //     familyCode: this.data.familyCode,
  //     contactNumber: this.selectedNumber,
  //     memberRelationship: this.data.relationMapperList || [],
  //     visitorRelationship: this.data.visitorsMapperList || [],
  //   };
  //   this.advanceService.fetchPrimaryRequest(finalPayload).subscribe({
  //     next: (res: any) => {
  //       this.dialogRef.close(res);
        
  //     },
  //     error: (err: any) => {
  //       this.errorMessage =
  //         err?.error?.message || 'Failed to change primary devotee';
  //     },
  //   });
  // }

  continue(): void {
  if (!this.isValidNumber || this.isChecking) return;

  const finalPayload = {
    devoteeId: this.data.selectedPrimary.devoteeId,
    familyCode: this.data.familyCode,
    contactNumber: this.selectedNumber,
    memberRelationship: this.data.relationMapperList || [],
    visitorRelationship: this.data.visitorsMapperList || [],
  };

  this.advanceService.fetchPrimaryRequest(finalPayload).subscribe({
    next: (res: any) => {
      if (res?.success) {
        // ✅ Close current popup
        this.dialogRef.close(true);

        // ✅ Open OTP popup with sessionId
        this.dialog.open(ChangePrimaryVerifyOtpPopupComponent, {
          width: '400px',
          disableClose: true,
          data: {
            sessionId: res.data.sessionId,
            familyCode: this.data.familyCode,
            contactNumber: this.selectedNumber,
          },
        });
      } else {
        this.errorMessage = res?.message || 'Failed to initiate OTP verification';
      }
    },
    error: (err: any) => {
      this.errorMessage =
        err?.error?.message || 'Failed to change primary devotee';
    },
  });
}

  isDisabled(): boolean {
    return !this.isValidNumber || this.isChecking;
  }
}
  
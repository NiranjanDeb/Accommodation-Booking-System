import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../../atoms/success/success.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-change-primary-verify-otp-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-primary-verify-otp-popup.component.html',
  styleUrl: './change-primary-verify-otp-popup.component.scss',
})
export class ChangePrimaryVerifyOtpPopupComponent {
  otp = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(7),
  ]);

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<ChangePrimaryVerifyOtpPopupComponent>,
    private advanceService: AdvanceSearchService,
    private dialog: MatDialog,
    private toaster: ToastService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      sessionId: string;
      familyCode?: string;
      contactNumber?: string;
    },
  ) {
    console.log('OTP Popup Data:', data);
  }

  allowNum(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];

    if (
      !allowedKeys.includes(event.key) &&
      (event.key < '0' || event.key > '9')
    ) {
      event.preventDefault();
    }
  }

  otpDialog(): void {
    this.dialogRef.close(false);
  }

  updateDetails(): void {
    if (this.otp.invalid || this.isSubmitting) {
      this.otp.markAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = {
      sessionId: this.data.sessionId,
      otp: parseInt(this.otp.value!, 10),
    };

    this.advanceService.verifyPrimaryOtp(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;

        if (res?.success) {
          this.dialogRef.close(true);

          this.dialog.open(SuccessComponent, {
            width: '420px',
            disableClose: true,
            data: {
              title: 'Success',
              message: 'Your primary devotee been updated successfully!',
              confirmText: 'Check Updated Primary',
            },
          });
        } else {
          this.errorMessage = res?.message || 'Invalid OTP';
        }
      },
      error: (err: any) => {
        this.toaster.error(err.error.message)
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || 'OTP verification failed';
      },
    });
  }
}

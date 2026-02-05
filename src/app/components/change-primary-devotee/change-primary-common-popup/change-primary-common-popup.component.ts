import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ChangePrimaryPopupData {
  title: string;
  message: string;
  highlightText?: string;
  showActions?: boolean; // show Continue / Cancel
  confirmText?: string;  // optional custom CTA text
}

@Component({
  selector: 'app-change-primary-common-popup',
  standalone: true,
  imports: [],
  templateUrl: './change-primary-common-popup.component.html',
  styleUrl: './change-primary-common-popup.component.scss'
})
export class ChangePrimaryCommonPopupComponent {
 constructor(
    private dialogRef: MatDialogRef<ChangePrimaryCommonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangePrimaryPopupData
  ) {}

  close(): void {
    this.dialogRef.close(false);
  }

  continue(): void {
    this.dialogRef.close(true);
  }

}

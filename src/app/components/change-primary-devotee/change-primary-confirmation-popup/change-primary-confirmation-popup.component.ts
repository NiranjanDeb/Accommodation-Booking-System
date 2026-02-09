import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangePrimaryRelationsPopupComponent } from '../change-primary-relations-popup/change-primary-relations-popup.component';

@Component({
  selector: 'app-change-primary-confirmation-popup',
  standalone: true,
  templateUrl: './change-primary-confirmation-popup.component.html',
  styleUrl: './change-primary-confirmation-popup.component.scss',
})
export class ChangePrimaryConfirmationPopupComponent {

  constructor(
    private dialogRef: MatDialogRef<ChangePrimaryConfirmationPopupComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      selectedPrimary: any;
      familyMembers: any[];
      
    }
    
  ) {console.log('Confirmation Popup Data:', data);}

  close(): void {
    this.dialogRef.close(false); // Cancel
  }

  continue(): void {
    this.dialogRef.close(true);
    this.dialog.open(ChangePrimaryRelationsPopupComponent, {
      width: '520px',
      maxWidth: '95vw',
      disableClose: true,
      data: {
        selectedPrimary: this.data.selectedPrimary,
        familyMembers: this.data.familyMembers
      }
    });
  }
}

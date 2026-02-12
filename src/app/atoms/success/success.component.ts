import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ChangePrimaryDevoteeComponent } from '../../components/change-primary-devotee/change-primary-devotee.component';


@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  constructor(
    private dialogRef: MatDialogRef<SuccessComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      confirmText?: string;
      showActions?: boolean;
    }
  ) {}

  close(): void {
    this.dialogRef.close(false);

    if(this.data.confirmText == 'Check Updated Primary'){
       this.dialog.open(ChangePrimaryDevoteeComponent, {
            width: '420px',
            disableClose: true,
          });
    }

  }

  continue(): void {
    this.dialogRef.close(true);
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-adhaar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-adhaar.component.html',
  styleUrl: './edit-adhaar.component.scss',
})
export class EditAdhaarComponent {
  aadhaar!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAdhaarComponent>
  ) {
    this.aadhaar = data.aadhaar;
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    this.dialogRef.close(this.aadhaar);
  }
}

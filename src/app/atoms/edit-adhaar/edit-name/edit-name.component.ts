import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.scss',
})
export class EditNameComponent {
  selectedName!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditNameComponent>
  ) {
    this.selectedName = data.selected;
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    this.dialogRef.close(this.selectedName);
  }
}

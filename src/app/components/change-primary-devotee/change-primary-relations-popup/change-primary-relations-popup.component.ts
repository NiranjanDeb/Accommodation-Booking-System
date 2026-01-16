import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-primary-relations-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-primary-relations-popup.component.html',
  styleUrl: './change-primary-relations-popup.component.scss'
})
export class ChangePrimaryRelationsPopupComponent {

maleRelations: string[] = [
  'Father',
  'Son',
  'Brother',
  'Husband',
  'Son-In-Law',
  'Brother-In-Law',
  'Grand-Father',
  'Grand-Son',
  'Uncle',
  'Cousin',
  'Relative Others',
  'GuruBhai Attached with Mandir',
  'GuruBhai Others',
  'Non-Initiated Male'
];

femaleRelations: string[] = [
  'Mother',
  'Daughter',
  'Sister',
  'Wife',
  'Daughter-In-Law',
  'Sister-In-Law',
  'Grand-Mother',
  'Grand-Daughter',
  'Aunt',
  'Cousin',
  'Relative Others',
  'GuruBhai Attached with Mandir',
  'GuruBhai Others',
  'Non-Initiated Female'
];


  primaryDevotee: any;
  otherMembers: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<ChangePrimaryRelationsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      selectedPrimary: any;
      familyMembers: any[];
    }
  ) {
    this.primaryDevotee = data.selectedPrimary;

    this.otherMembers = data.familyMembers.filter(
      m => m.devoteeId !== this.primaryDevotee.devoteeId
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const payload = {
      primaryDevoteeId: this.primaryDevotee.devoteeId,
      relations: this.otherMembers.map(member => ({
        devoteeId: member.devoteeId,
        relationshipWithPrimaryDevotee: member.relationshipWithPrimaryDevotee
      }))
    };

    // 🔥 API call can go here
    console.log('RELATION PAYLOAD', payload);

    this.dialogRef.close(payload);
  }

  isSaveDisabled(): boolean {
    return this.otherMembers.some(
      m => !m.relationshipWithPrimaryDevotee
    );
  }

  getRelations(member: any): string[] {
  if (!member?.gender) return [];

  return member.gender.toLowerCase() === 'male'
    ? this.maleRelations
    : this.femaleRelations;
}

}

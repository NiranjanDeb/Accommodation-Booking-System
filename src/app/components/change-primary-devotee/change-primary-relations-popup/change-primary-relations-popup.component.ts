import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';
import { ChangePrimaryVisitorsPopupComponent } from '../change-primary-visitors-popup/change-primary-visitors-popup.component';

@Component({
  selector: 'app-change-primary-visitors-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-primary-relations-popup.component.html',
  styleUrl: './change-primary-relations-popup.component.scss',
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
    'Non-Initiated Male',
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
    private dialog: MatDialog,
    private advanceService: AdvanceSearchService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedPrimary: any;
      familyMembers: any[];
    },
  ) {
    this.primaryDevotee = data.selectedPrimary;

    this.otherMembers = data.familyMembers.filter(
      (m) => m.devoteeId !== this.primaryDevotee.devoteeId,
    );
    console.log('ChangePrimaryRelationsPopupComponent data', data);
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    const payload = {
      primaryDevoteeId: this.primaryDevotee.devoteeId,
      relations: this.otherMembers.map((member) => ({
        devoteeId: member.devoteeId,
        relationshipWithPrimaryDevotee: member.relationshipWithPrimaryDevotee,
      })),
    };

    console.log('RELATION PAYLOAD', payload);
    this.advanceService
      .fetchVisitorsDetails(this.primaryDevotee.devoteeFamilyCode)
      .subscribe({
        next: (res) => {
          const visitors = res?.data || [];

          this.dialogRef.close();

          setTimeout(() => {
            const relationMapperList = this.otherMembers.map((member) => ({
              id: member.devoteeId,
              gender: member.gender,
              relationship: member.relationshipWithPrimaryDevotee,
            }));

            relationMapperList.unshift({
              id: this.primaryDevotee.devoteeId,
              gender: this.primaryDevotee.gender,
              relationship: 'SELF',
            });

            console.log('relationMapperList testttttttttt', relationMapperList);

            this.dialog.open(ChangePrimaryVisitorsPopupComponent, {
              width: '700px',
              data: {
                selectedPrimary: this.primaryDevotee,
                familyMembers: this.data.familyMembers,
                visitors: res.data,
                orderName: `${this.primaryDevotee.devoteeFirstName} ${this.primaryDevotee.devoteeLastName}`,
                relationMapperList,
              },
            });
          });
        },
        error: (err) => {
          console.error('Fetch visitors failed', err);
        },
      });
  }

  isSaveDisabled(): boolean {
    return this.otherMembers.some((m) => !m.relationshipWithPrimaryDevotee);
  }

  getRelations(member: any): string[] {
    if (!member?.gender) return [];

    return member.gender.toLowerCase() === 'male'
      ? this.maleRelations
      : this.femaleRelations;
  }
}

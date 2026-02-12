import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePrimaryNumberPopupComponent } from '../change-primary-number-popup/change-primary-number-popup.component';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';

@Component({
  selector: 'app-change-primary-relations-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-primary-visitors-popup.component.html',
  styleUrl: './change-primary-visitors-popup.component.scss',
})
export class ChangePrimaryVisitorsPopupComponent {
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
    'Non-Initiated Female',
  ];

  primaryDevotee: any;
  otherMembers: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<ChangePrimaryVisitorsPopupComponent>,
    private dialog: MatDialog,
    private advanceService: AdvanceSearchService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedPrimary: any;
      familyMembers: any[];
      visitors?: any[]; 
      orderName?: string;
      relationMapperList?: {
    id: number;
    gender: string;
    relationship: string;
  }[];
      
    },
  ) {
    this.primaryDevotee = data.selectedPrimary;

    if (data.visitors && data.visitors.length) {
      this.otherMembers = data.visitors;
    } else {
      this.otherMembers = data.familyMembers.filter(
        (m) => m.devoteeId !== this.primaryDevotee.devoteeId,
      );
    }

    // console.log('Order Name:', data.orderName);
    // console.log('Family Relations Payload:', data.relationsPayload);
    console.log('ChangePrimaryVisitorsPopupComponent', data);
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    console.log('clicked');
    const payload = {
      primaryDevoteeId: this.primaryDevotee.devoteeId,
      relations: this.otherMembers.map((m) => ({
        devoteeId: m.devoteeId,
        relationshipWithPrimaryDevotee: m.relationshipWithPrimaryDevotee,
      })),    
    };
    const visitorsMapperList = this.otherMembers.map((v) => ({
      id: v.devoteeId ?? v.visitorId, 
      gender: v.gender,
      relationship: v.relationshipWithPrimaryDevotee,
    }));

    this.advanceService
      .fetchContactNumbers(this.primaryDevotee.devoteeFamilyCode)
      .subscribe({
        next: (res: any) => {
          const numbers = res?.data.contactNumbers || [];

          this.dialogRef.close();
          setTimeout(() => {
  this.dialog.open(ChangePrimaryNumberPopupComponent, {
    width: '520px',
    maxWidth: '95vw',
    disableClose: true,
    data: {
      selectedPrimary: this.primaryDevotee,
      relationMapperList: this.data.relationMapperList,
      visitorsMapperList,
      familyCode: this.primaryDevotee.devoteeFamilyCode,
      contactNumbers: numbers,
    },
  });
});

        },
      });
  }

  // isSaveDisabled(): boolean {
  //   return this.otherMembers.some(
  //     m => !m.relationshipWithPrimaryDevotee
  //   );
  // }

  getRelations(member: any): string[] {
    if (!member?.gender) return [];

    return member.gender.toLowerCase() === 'male'
      ? this.maleRelations
      : this.femaleRelations;
  }
}

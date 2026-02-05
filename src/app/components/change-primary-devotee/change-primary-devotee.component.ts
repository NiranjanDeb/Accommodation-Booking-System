import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';
import { EditDetailsPopupComponent } from '../home-search/edit-details-popup/edit-details-popup.component';
import { ChangePrimaryConfirmationPopupComponent } from './change-primary-confirmation-popup/change-primary-confirmation-popup.component';
import { ChangePrimaryCommonPopupComponent } from './change-primary-common-popup/change-primary-common-popup.component';


@Component({
  selector: 'app-change-primary-devotee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './change-primary-devotee.component.html',
  styleUrl: './change-primary-devotee.component.scss',
})
export class ChangePrimaryDevoteeComponent implements OnInit {
  searchForm!: FormGroup;
  fc = new FormControl('');


  profileList: any[] = [];
  profileDetails: any[] = [];

  showEdit = false;

  constructor(
    private fb: FormBuilder,
    private advanceService: AdvanceSearchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      familyCode: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

 selectedDevoteeId: string | null = null;

onSelectDevotee(devoteeId: string): void {
  this.selectedDevoteeId = devoteeId;
}



  searchByFamilyCode(): void {
    if (this.searchForm.invalid) return;

    const payload = {
      key: this.searchForm.value.familyCode,
      keyType: 'familyCode',
      page: 1,
    };

    this.advanceService.fetchProfile(payload).subscribe({
      next: (res) => {
        this.profileList = res?.data || [];
      },
      error: () => {
        this.profileList = [];
      },
    });
  }

  getProfileDetails(familyCode: string): void {
    this.advanceService.fetchProfileDetailsWithProfileY(familyCode).subscribe({
      next: (res) => {
        this.profileDetails = [
          ...res.data.devoteeProfileInAccommodation.filter((i: any) => i.isPrimaryDevotee),
          ...res.data.devoteeProfileInAccommodation.filter((i: any) => !i.isPrimaryDevotee),
        ];
        this.showEdit = true;
      },
    });
  }

  back(): void {
    this.showEdit = false;
  }

  editDetails(item: any): void {
    this.dialog.open(EditDetailsPopupComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: item,
    });
  }

  reset(): void {
    this.searchForm.reset();
    this.profileList = [];
    this.showEdit = false;
  }
 confirmPrimaryChange(item: any, event: MouseEvent): void {
  event.preventDefault();
  if (item.status === 'INACTIVE') {
    this.dialog.open(ChangePrimaryCommonPopupComponent, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        title: 'Action Not Allowed',
        message: 'You can’t select this person as the primary member because their status is inactive. Please change the status to Active and try again.',
        showActions: false
      }
    });
    return;
  }
  if ( item.devoteeMemberCode.length < 12) {
    this.dialog.open(ChangePrimaryCommonPopupComponent, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        title: 'Invalid Member Code',
        message: 'You can’t select this person as the primary member because their name doesn’t match the name on the Arghya Praswasti. Please correct the devotee name and try again.',
        showActions: false
      }
    });
    return;
  }

  const dialogRef = this.dialog.open(
    ChangePrimaryConfirmationPopupComponent,
    {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        title: 'Confirm Primary Devotee',
        message: 'Are you sure you want to make',
        highlightText: `${item.devoteeFirstName} ${item.devoteeLastName}`,
        showActions: true,
        selectedPrimary: item,
        familyMembers: this.profileDetails
      },
    }
  );

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.selectedDevoteeId = item.devoteeId;
      this.onSelectDevotee(item.devoteeId);
    }
  });
}

  allowNum(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input?.value;
    if (!val) return;

    const filtered = val.replace(/[^0-9]/g, '');
    if (filtered !== val) {
      this.fc.setValue(filtered, { emitEvent: false });
    }
  }
  
}

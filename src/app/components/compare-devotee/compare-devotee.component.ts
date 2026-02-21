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
import { EditAdhaarComponent } from '../../atoms/edit-adhaar/edit-adhaar.component';

@Component({
  selector: 'app-change-primary-devotee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './compare-devotee.component.html',
  styleUrl: './compare-devotee.component.scss',
})
export class CompareDevoteeComponent implements OnInit {
  searchForm!: FormGroup;
  fc = new FormControl('');


  profileList: any[] = [];
  profileDetails: any[] = [];

  showEdit = false;
  primaryMemberName: string = '';
  primaryFC: string = '';

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

  onRowClick(row: any){
     this.primaryMemberName =
    `${row.devoteeFirstName} ${row.devoteeMiddleName || ''} ${row.devoteeLastName}`.trim();
  this.primaryFC=row.devoteeFamilyCode
    this.getProfileDetails(this.primaryFC)
  }

 getProfileDetails(fc: any): void {
  // store primary member name from profile search API
 

  this.advanceService.fetchVisitorsDetails(fc).subscribe({
    next: (res) => {
      this.profileDetails = res.data || [];
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

  editAadhaar(item: any): void {
      const dialogRef = this.dialog.open(EditAdhaarComponent, {
        width: '420px',
        data: {
          familyCode: this.primaryFC,
          visitorId: item.visitorId,
          aadhaar: item.aadharNumber,
          editType: 'Visitor'
        },
      });
      dialogRef.afterClosed().subscribe({
        next: (res) => {
          if(res){
           this.getProfileDetails(this.primaryFC)
          }
        }
      })
    }
  
}


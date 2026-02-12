import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';
import { EditNameComponent } from '../../atoms/edit-adhaar/edit-name/edit-name.component';
import { EditAdhaarComponent } from '../../atoms/edit-adhaar/edit-adhaar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-and-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './filter-and-search.component.html',
  styleUrl: './filter-and-search.component.scss',
})
export class FilterAndSearchComponent implements OnInit {
  searchForm!: FormGroup;

  workerList: any[] = [];

  // LEFT PANEL
  workerDetails: any[] = [];

  // RIGHT PANEL
  philanthropyMembers: any[] = [];

  showDetails = false;

  constructor(
    private fb: FormBuilder,
    private advanceService: AdvanceSearchService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      familyCode: ['', [Validators.required, Validators.minLength(4)]],
    });
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
        this.workerList = res?.data || [];
      },
      error: () => {
        this.workerList = [];
      },
    });
  }

  getWorkerDetails(familyCode: string): void {
    this.workerDetails = [];
    this.philanthropyMembers = [];

    this.advanceService.fetchProfileDetailsWithProfileY(familyCode).subscribe({
      next: (res) => {
        const data = res?.data;

       
        this.workerDetails = [
          ...data.devoteeProfileInAccommodation.filter(
            (i: any) => i.isPrimaryDevotee,
          ),
          ...data.devoteeProfileInAccommodation.filter(
            (i: any) => !i.isPrimaryDevotee,
          ),
        ];

        this.philanthropyMembers = data.devoteeDetailsInPhilanthropy || [];

        this.showDetails = true;
      },
      error: () => {
        this.workerDetails = [];
        this.philanthropyMembers = [];
      },
    });
  }

  back(): void {
    this.showDetails = false;
    this.workerDetails = [];
    this.philanthropyMembers = [];
  }

  reset(): void {
    this.searchForm.reset();
    this.workerList = [];
    this.workerDetails = [];
    this.philanthropyMembers = [];
    this.showDetails = false;
  }
  editName(item: any): void {
    const dialogRef = this.dialog.open(EditNameComponent, {
      width: '420px',
      data: {
        selected: `${item.devoteeFirstName} ${item.devoteeLastName}`,
        familyCode: item.devoteeFamilyCode,
        memberCode: item.devoteeMemberCode,
        devoteeId: item.devoteeId,
        list: this.philanthropyMembers,
        memberDetails: this.workerDetails
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res!==undefined){
          this.getWorkerDetails(res)
        }
      }
    })

  }

  editAadhaar(item: any): void {
    this.dialog.open(EditAdhaarComponent, {
      width: '420px',
      data: {
        aadhaar: item.idNumber,
      },
    });
  }
}

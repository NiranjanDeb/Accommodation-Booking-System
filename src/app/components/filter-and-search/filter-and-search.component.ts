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
    private advanceService: AdvanceSearchService
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

  /** 🔥 SINGLE API CALL */
  getWorkerDetails(familyCode: string): void {
    this.workerDetails = [];
    this.philanthropyMembers = [];

    this.advanceService.fetchProfileDetailsWithProfileY(familyCode).subscribe({
      next: (res) => {
        const data = res?.data;

        // LEFT SIDE
        this.workerDetails = [
          ...data.devoteeProfileInAccommodation.filter(
            (i: any) => i.isPrimaryDevotee
          ),
          ...data.devoteeProfileInAccommodation.filter(
            (i: any) => !i.isPrimaryDevotee
          ),
        ];

        // RIGHT SIDE
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
}

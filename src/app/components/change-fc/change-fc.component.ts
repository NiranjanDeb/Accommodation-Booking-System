import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';

@Component({
  selector: 'app-change-fc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './change-fc.component.html',
  styleUrl: './change-fc.component.scss',
})
export class ChangeFcComponent implements OnInit {
  searchForm!: FormGroup;

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
    this.advanceService.fetchProfileDetails(familyCode).subscribe({
      next: (res) => {
        this.profileDetails = res?.data || [];
        this.showEdit = true;
      },
    });
  }

  back(): void {
    this.showEdit = false;
  }

  reset(): void {
    this.searchForm.reset();
    this.profileList = [];
    this.showEdit = false;
  }

  /** 🔥 placeholder for update FC logic */
  updateFamilyCode(item: any): void {
    console.log('UPDATE FC FOR', item);
    // open popup / navigate / call API here
  }
}

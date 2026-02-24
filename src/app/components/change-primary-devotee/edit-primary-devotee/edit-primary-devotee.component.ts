import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from "@angular/forms";
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';
import { ToastService } from '../../../services/toast/toast.service';
import { MatSelectModule } from "@angular/material/select";
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePrimaryVerifyOtpPopupComponent } from '../change-primary-verify-otp-popup/change-primary-verify-otp-popup.component';

@Component({
  selector: 'app-edit-primary-devotee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './edit-primary-devotee.component.html',
  styleUrl: './edit-primary-devotee.component.scss',
})
export class EditPrimaryDevoteeComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() devoteeDetails: any[] = [];
  @Input() oldDevoteeDetails: any[] = []
  @Output() close = new EventEmitter<boolean>();

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

  steppers: any[] = [
    'Choose Family Relations',
    'Choose Visitor Relations',
    'Change Contact No.',
    'Address details',
    'Agreement to guidelines(on behalf of the requestor)',
  ];
  step: number = 0;
  primaryDevotee: any;
  otherMembers: any[] = [];
  visitor: any[] = [];
  contactNumbers: any[] = [];
  addressDetails: any[] = [];
  selectedNumber: string = '';
  isValidNumber = false;
  errorMessage = '';
  isChecking = false;
  addressfields!: FormGroup;
  agreementDetails!: FormGroup;
  relationMapperList: any[] = [];
  visitorMapperList: any[] = [];
  pincodeList: any = [];
  districtList: any[] = [];
  stateList: any[] = [];
  oldPrimaryDevotee: any[] = [];
  allMembers: any[] = [];
  editMembers: any[] = [];
  editVisitor: any[] = [];
  primaryRelation: string = 'SELF';
  familyRelation: string = ''
  visitorRelation: string = ''



  // @ViewChild('relation') relation!: NgModel;
  // @ViewChild('visitorRelation') visitorRelation!: NgModel;

  // @ViewChildren('relation') relations!: QueryList<NgModel>;

  constructor(
    private advanceService: AdvanceSearchService,
    private fb: FormBuilder,

    private toaster: ToastService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.addressfields = this.fb.group({
      houseNo: ['', Validators.required],
      locality: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      district: [{ value: '', disabled: true }, Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      country: [{ value: '', disabled: true }, Validators.required],
    });

    this.agreementDetails = this.fb.group({
      fullName: ['', Validators.required],
      guardianName: ['', Validators.required],
      place: ['', Validators.required],
      relation: [false, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.step = 0
      //     this.relations.forEach(r => {
      //   console.log(r, 'fff');
      // });
      // console.log(this.relationMapperList);

      // this.relationMapperList.forEach(elm => {
      //   elm.relationship = ''
      // })
      // this.visitorMapperList = []
      // this.addressDetails = []
      // this.contactNumbers = []
      // this.selectedNumber = ''
      this.primaryDevotee = this.devoteeDetails[0];
      this.relationMapperList.push({
        id: this.primaryDevotee.devoteeId,
        gender: this.primaryDevotee.gender,
        relationship: 'SELF',
      })

      this.editMembers = structuredClone([...new Set(this.devoteeDetails)])
      this.editMembers = this.editMembers.map(val => {
        return {
          ...val,
          relationshipWithPrimaryDevotee: ''
        };
      })


      // const filterPrimary = this.allMembers.filter(item => item.devoteeId === this.primaryDevotee.devoteeId)
      // this.primaryRelation = filterPrimary[0].relationshipWithPrimaryDevotee


      this.otherMembers = this.devoteeDetails.filter(
        (m) => m.devoteeId !== this.primaryDevotee.devoteeId,
      );

      this.oldPrimaryDevotee = this.devoteeDetails.filter(
        (m) => m.isPrimaryDevotee,
      );
      this.getVisitor(this.primaryDevotee.devoteeFamilyCode);
    }
  }

  onClose() {

    this.close.emit(false);

  }

  selectStep(stepName: string) {
    console.log(stepName);
  }

  getRelations(member: any): string[] {
    if (!member?.gender) return [];

    return member.gender.toLowerCase() === 'male'
      ? this.maleRelations
      : this.femaleRelations;
  }

  getVisitor(fc: string) {
    this.advanceService.fetchVisitorsDetails(fc).subscribe({
      next: (res) => {
        this.visitor = res?.data || [];
        if(this.visitor.length == 0){
          this.steppers.splice(1, 1)
          console.log(this.steppers);
          
        }else{
          this.editVisitor = structuredClone([...this.visitor]);
          this.editVisitor = this.editVisitor.map(val => {
            return {
              ...val,
              relationship: ''
            }
          })
        }
        console.log(this.visitor);
      },
      error: (err) => {
        this.toaster.error(err.message);
      },
    });
  }

  getContactNumbers() {
    this.advanceService
      .fetchContactNumbers(this.primaryDevotee.devoteeFamilyCode)
      .subscribe({
        next: (res: any) => {
          this.contactNumbers = res?.data.contactNumbers || [];
        },
        error: (err) => {
          this.toaster.error(err.message);
        },
      });
  }

  getMemberRelation(item: any, currValue: any) {

    const exists = this.relationMapperList.some(m => m.id === item.devoteeId);

    if (!exists) {
      this.relationMapperList.push({
        id: item.devoteeId,
        gender: item.gender,
        relationship: currValue,
      });
    }

    console.log(this.relationMapperList, 'relation');


  }

  getVisitorRelation(item: any, currValue: any) {
    const exists = this.visitorMapperList.some(m => m.id === item.visitorId);
    if (!exists) {
      this.visitorMapperList.push({
        id: item.visitorId,
        gender: item.gender,
        relationship: currValue,
      })
    }

    console.log(this.visitorMapperList, 'visitor');

  }

  incrementStep() {
    if (this.step === 0) {
      const allFamilySelected = this.otherMembers.every(
        (m) =>
          m.relationshipWithPrimaryDevotee &&
          m.relationshipWithPrimaryDevotee !== '',
      );

      if (!allFamilySelected) {
        return;
      }

      if (this.relationMapperList.length == this.editMembers.length ) {
        this.step = this.step + 1;
        if(this.visitor.length == 0){
        this.getContactNumbers();
        }
      } else {
        this.toaster.error('Kindly specify the relationship of each family member with the requestor to proceed further.')
      }
    }

    if (this.step === 1 && this.visitor.length != 0) {
      const allVisitorSelected = this.visitor.every(
        (v) => v.relationship && v.relationship !== '',
      );

      if (!allVisitorSelected) {
        return;
      }

      if (this.visitorMapperList.length == this.visitor.length) {
        this.step = this.step + 1;
        this.getContactNumbers();
      } else {
        this.toaster.error('Kindly specify the relationship of each visitor member with the requestor to proceed further.')
      }

    }

    if ((this.step === 2 && this.visitor.length != 0) || (this.step === 1 && this.steppers.length === 4))  {
      if (!this.selectedNumber) return;
      if (!this.isValidNumber) return;

      if (this.selectedNumber !== '') {
        this.step = this.step + 1;
        this.getDevoteeAddress();
      }
    }

    if ((this.step === 3 && this.visitor.length != 0) || (this.step === 2 && this.steppers.length === 4)) {
      if (this.addressfields.invalid) {
        this.addressfields.markAllAsTouched();
        return;
      }

      if (this.addressfields.valid) {
        this.step = this.step + 1;
      }
    }

    if ((this.step === 4 && this.visitor.length != 0) || (this.step === 3 && this.steppers.length === 4)) {
      this.agreementDetails.patchValue({
        fullName:
          this.primaryDevotee.devoteeFirstName +
          ' ' +
          (this.primaryDevotee.devoteeMiddleName || '') +
          ' ' +
          this.primaryDevotee.devoteeLastName,
        guardianName: this.primaryDevotee.guardianName,
        place: this.addressfields.get('city')?.value,
      });
      if (this.agreementDetails.invalid) {
        this.agreementDetails.markAllAsTouched();
        return;
      }

      if (this.agreementDetails.valid) {
        this.isChecking = true;
      }
    }
  }

  decrementStep() {
    this.step = this.step - 1;
  }

  onNumberChange(): void {
    if (!this.selectedNumber) {
      this.isValidNumber = false;
      this.errorMessage = '';
      return;
    }

    this.isChecking = true;
    this.isValidNumber = false;
    this.errorMessage = '';

    this.advanceService
      .fetchAvailableContactNumber({
        contactNumber: this.selectedNumber,
        familyCode: this.primaryDevotee.devoteeFamilyCode,
      })
      .subscribe({
        next: (res: any) => {
          this.isChecking = false;

          if (res?.success === true && res?.data?.available === true) {
            this.isValidNumber = true;
            this.errorMessage = '';
          } else {
            this.isValidNumber = false;
            this.errorMessage = res?.message || 'Contact number already exists';
          }
        },
        error: (err: any) => {
          this.toaster.error(err.error.message)
          this.isChecking = false;
          this.isValidNumber = false;
          this.errorMessage = err?.error?.message || err?.message;
        },
      });
  }

  finalSubmit() {
    if (this.agreementDetails.invalid) {
      this.agreementDetails.markAllAsTouched();
      return;
    }
    const addressData = this.addressfields.getRawValue();
    console.log('final stepp', addressData);

    const payload = {
      devoteeId: this.primaryDevotee.devoteeId,
      familyCode: this.primaryDevotee.devoteeFamilyCode,
      contactNumber: this.selectedNumber,
      memberRelationship: [...this.relationMapperList],
      visitorRelationship: [...this.visitorMapperList],
      addressLine1: addressData.houseNo,
      addressLine2: addressData.locality,
      addressLine3: addressData.landmark,
      city: addressData.city,
      pin: addressData.pincode,
      state: addressData.state,
      district: addressData.district,
      agreementContent: `By checking the below box, I agree that I have read all the terms and conditions, as present in the Terms & Conditions link https://app.acco.satsangphilanthropy.com/#/termsnconditions  and have also read the general guidelines of accomodation and it'\''s various processes to be followed, as described in the link Guidelines https://app.acco.satsangphilanthropy.com/#/guidelinesnfaqs and I hereby consent that I have understood and would abide by it in full and also hereby declare that I would convey the information present in the aforementioned link to all the visitors visiting the Satsang Ashram, Deoghar through the booking made using this online Accomodation System to abide by the same terms and conditions and guidelines without any deviations. Moreover, I further declare that I would be fully responsible for any inappropriate conduct or deviations from the information shared in the aforementioned link, and would not held Satsang Deoghar or any of it'\''s associates responsible for whatsoever.I,  S/O or D/O or W/O ${this.agreementDetails.get('guardianName')?.value} from place ${this.agreementDetails.get('place')?.value} agree to the above mentioned terms and conditions and guidelines.`,
      place: this.agreementDetails.get('place')?.value,
    };

    console.log('FINAL PAYLOAD', payload);

    this.advanceService.fetchPrimaryRequest(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const dialogRef = this.dialog.open(ChangePrimaryVerifyOtpPopupComponent, {
            width: '400px',
            disableClose: true,
            data: {
              sessionId: res.data.sessionId,
              familyCode: this.primaryDevotee.familyCode,
              contactNumber: this.selectedNumber,
            },
          });
          dialogRef.afterClosed().subscribe({
            next: (res) => {
              if (res) {
                this.close.emit(true)
              }
            }
          })
        } else {
          this.errorMessage =
            res?.message || 'Failed to initiate OTP verification';
        }
      },
      error: (err: any) => {
        this.toaster.error(err.error.message)
        this.errorMessage =
          err?.error?.message || 'Failed to change primary devotee';
      },
    });
  }
  getDevoteeAddress() {
    this.advanceService
      .fetchDevoteeAddress(this.primaryDevotee.devoteeId)
      .subscribe({
        next: (res) => {
          this.addressDetails = res?.data || [];

          this.addressfields.setValue({
            houseNo: this.addressDetails[0].addressLine1,
            locality: this.addressDetails[0].addressLine2,
            landmark: this.addressDetails[0].addressLine3,
            city: this.addressDetails[0].city,
            pincode: this.addressDetails[0].pin,
            district: this.addressDetails[0].district,
            state: this.addressDetails[0].state,
            country: this.addressDetails[0].country,
          });
        },
        error: (err) => {
          this.toaster.error(err.error.message);
        },
      });
  }

  getPin() {
    this.addressfields
      .get('pincode')
      ?.valueChanges.pipe(take(1))
      .subscribe((item) => {
        if (item && item?.length === 6) {
          this.getPincodeDetails(item);
        }
      });
  }

  getPincodeDetails(key: any) {
    if (key?.length == 6) {
      this.advanceService.fetchPincode(key)?.subscribe({
        next: (res) => {
          this.stateList = [];
          this.districtList = [];
          this.pincodeList = res.data;

          if (this.pincodeList !== undefined) {
            this.stateList = this.pincodeList?.state;

            this.districtList = this.pincodeList?.district;
            if (this.stateList?.length == 1) {
              this.addressfields.get('state')?.setValue(this.stateList[0]);
              this.districtList.length == 1
                ? this.addressfields
                  .get('district')
                  ?.setValue(this.districtList[0])
                : this.districtList;
              if (this.districtList.length > 1) {
                this.addressfields.get('district')?.enable();
              }
            }
          } else {
            this.addressfields.get('state')?.setValue('');
            this.addressfields.get('district')?.setValue('');
          }

          this.toaster.success(res.message);
        },
        error: (err) => {
          if (err) {
            this.addressfields.get('state')?.setValue('');
            this.addressfields.get('district')?.setValue('');
            this.toaster.error(err.error.message);
          }
        },
      });
    } else if (key?.value?.length == 0) {
      this.addressfields.get('state')?.setValue('');
      this.addressfields.get('district')?.setValue('');
      this.districtList = [];
    }
  }
}

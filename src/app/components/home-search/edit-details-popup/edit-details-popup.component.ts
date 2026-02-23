import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ToastService } from '../../../services/toast/toast.service';
import { AdvanceSearchService } from '../../../services/Advance-search/advance-search.service';

@Component({
  selector: 'app-edit-details-popup',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, FormsModule],
  templateUrl: './edit-details-popup.component.html',
  styleUrl: './edit-details-popup.component.scss',
  providers: [DatePipe]
})
export class EditDetailsPopupComponent implements OnInit {
  editDetails!: FormGroup

  constructor(
    private dialogRef: MatDialogRef<EditDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private form: FormBuilder,
    private date: DatePipe,
    private toastService: ToastService,
    private advanceService: AdvanceSearchService,

  ) { }

  status: string[] = ['Married', 'Single', 'Others'];

  genderArr: string[] = ['Male', 'Female'];

  physicalDisabilityOptions: string[] = [
    'Not Applicable',
    'Mobility and Physical Impairments',
    'Spinal Cord Disability',
    'Head Injuries Brain Disability',
    'Vision Disability',
    'Hearing Disability',
    'Cognitive or Learning Disabilities',
    'Psychological Disorders',
  ];


  maleRelationshipOptions: string[] = [
    'Father',
    'Son',
    'Brother',
    'Husband',
    'Son-In-Law',
    'Brother-In-Law',
    'Grand-Father',
    'Grand-Son',
    'Uncle',
    'Non-Initiated Male',
  ];

  femaleRelationshipOptions: string[] = [
    'Mother',
    'Daughter',
    'Sister',
    'Wife',
    'Daughter-In-Law',
    'Sister-In-Law',
    'Grand-Mother',
    'Grand-Daughter',
    'Aunt',
    'Non-Initiated Female',
  ];

  showEdit: boolean = false;
  isActive: boolean = false;
  isDob: boolean = false;
  type: string = '';
  isMale: boolean = false;
  isSubmitted: boolean = false;
  showOtp: Boolean = false;
  otp = new FormControl('');
  statusActive = new FormControl(true)
  initalData: any = {}
  sessionId: string = '';



  ngOnInit(): void {
    this.editDetails = this.form.group({
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      relation: ['', Validators.required],
      physicallyChallenge: ['', Validators.required],
      // status: [true, Validators.required]

    });
    console.log(this.data);

    const devoteeDate = new Date(this.data.dateOfBirth)
    console.log(devoteeDate);

    const tempDate = this.date.transform(devoteeDate, 'dd/MM/yyyy');
    this.editDetails.get("gender")?.setValue(this.data.gender);
    this.editDetails.get('dob')?.setValue(tempDate)
    this.editDetails.get('maritalStatus')?.setValue(this.data.isMarried)
    this.editDetails.get('physicallyChallenge')?.setValue(this.data.physicallyChallenges)
    this.editDetails.get('relation')?.setValue(this.data.relationshipWithPrimaryDevotee)

    this.initalData = {
      gender: this.editDetails.get("gender")?.value,
      dateOfBirth: this.editDetails.get('dob')?.value,
      isMarried: this.editDetails.get('maritalStatus')?.value,
      physicallyChallenges: this.editDetails.get('physicallyChallenge')?.value,
      relationshipWithPrimaryDevotee: this.editDetails.get('relation')?.value
    }
    console.log(this.initalData);


    this.editDetails.disable()
    this.editDetails.get('isSwastayani')?.enable()
    if (!this.data.isPrimaryDevotee) {
      if (this.data.gender == 'Male') {
        this.isMale = true
      } else {
        this.isMale = false
      }
    }
  }

  reset() {
    this.isDob = false
    this.type = ''
    const devoteeDate = new Date(this.data.dateOfBirth)
    const tempDate = this.date.transform(devoteeDate, 'dd/MM/yyyy')
    this.editDetails.get("gender")?.setValue(this.data.gender);
    this.editDetails.get('dob')?.setValue(tempDate)
    this.editDetails.get('maritalStatus')?.setValue(this.data.isMarried)
    this.editDetails.get('physicallyChallenge')?.setValue(this.data.physicallyChallenges)
    this.editDetails.get('relation')?.setValue(this.data.relationshipWithPrimaryDevotee)
    this.editDetails.markAsPristine()
  }

  getGender(event: any) {
    if (!this.data.isPrimaryDevotee) {
      this.type = 'relation'
      this.editDetails.get('relation')?.enable()
      this.editDetails.get('relation')?.setValue('')
      event.value == 'Male' ? this.isMale = true : this.isMale = false
    }
  }

  toggle() {
    this.isActive = !this.isActive
    this.statusActive.markAsDirty()
    this.statusActive.setValue(this.isActive)

  }

  close() {
    this.dialogRef.close()
  }

  edit(type: string) {
    this.editDetails.disable()
    this.type = type

    switch (type) {
      case 'gender':
        this.editDetails.get('gender')?.enable()
        break;

      case 'dob':
        this.isDob = true;
        this.editDetails.get('dob')?.enable()
        break;

      case 'status':
        this.editDetails.get('maritalStatus')?.enable()
        break;

      case 'challenge':
        this.editDetails.get('physicallyChallenge')?.enable()
        break;

      case 'relation':
        this.editDetails.get('relation')?.enable()
        break;
    }
  }

  submit() {
    console.log(this.statusActive.dirty);

    if ((this.editDetails.dirty && this.statusActive.dirty) || (this.editDetails.dirty || this.statusActive.dirty)) {

      if (!this.editDetails.get('gender')?.dirty) {
        this.showEdit = this.isActive
        this.isSubmitted = !this.isSubmitted

      } else {

        if (this.editDetails.get('relation')?.value !== '') {
          this.showEdit = this.isActive
          this.isSubmitted = !this.isSubmitted

        } else {
          this.toastService.error('Please select the relation')
        }

      }
    } else {
      this.toastService.error('Please change any one field to proceed')
    }

  }

  otpDialog() {
    this.showOtp = false
  }

  finalSubmission() {
    const dobValue = this.editDetails.get('dob')?.value;

let formattedDate = null;

if (dobValue) {
  const parsedDate = new Date(dobValue);

  if (!isNaN(parsedDate.getTime())) {
    formattedDate = this.date.transform(parsedDate, 'yyyy-MM-dd');
  }
}

    let payload = {}
    if (!this.data.isPrimaryDevotee) {
      payload = {
        devoteeId: this.data.devoteeId,
        dateOfBirth: formattedDate,
        gender: this.editDetails.get('gender')?.value,
        isMarried: this.editDetails.get('maritalStatus')?.value,
        physicallyChallenges: this.editDetails.get('physicallyChallenge')?.value,
        relationshipWithPrimaryDevotee: this.editDetails.get('relation')?.value,
        status: this.statusActive?.value ? 'ACTIVE' : 'INACTIVE'
      }
    } else {
      debugger
      payload = {
        devoteeId: this.data.devoteeId,
        dateOfBirth: formattedDate,
        gender: this.editDetails.get('gender')?.value,
        isMarried: this.editDetails.get('maritalStatus')?.value,
        physicallyChallenges: this.editDetails.get('physicallyChallenge')?.value,
        relationshipWithPrimaryDevotee: this.editDetails.get('relation')?.value,
        // status: this.statusActive?.value ? 'ACTIVE' : 'INACTIVE'
      }
    }
    const cleanObj = Object.fromEntries(
      Object.entries(payload).filter(
        ([Key, value]) => {
          const initialValue = this.initalData[Key];

          return (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            value !== initialValue
          );
        }
      )
    );
    console.log(cleanObj);
    console.log(this.initalData);


    this.advanceService.updateMemDetails(cleanObj).subscribe({
      next: (res) => {
        this.showOtp = true
        this.sessionId = res.data.sessionId



      }
    })

  }

  updateDetails() {
    const payload = {
      otp: Number(this.otp.value),
      sessionId: this.sessionId
    }
    this.advanceService.sendReqToUpdate(payload).subscribe({
      next: (res) => {
        this.dialogRef.close({
          data: {
            familyCode: this.data.devoteeFamilyCode,
            type: 'profile'
          }
        })
      }
    })
  }

  allowNum(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input?.value;
    if (!val) return;

    const filtered = val.replace(/[^0-9]/g, '');
    if (filtered !== val) {
      this.otp.setValue(filtered, { emitEvent: false });
    }
  }
}

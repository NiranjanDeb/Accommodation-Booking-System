import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

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
  ) { }
  
  status: string[] = ['Married', 'Single', 'Others'];

  genderArr: string[] = ['Male', 'Female']

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
  isDob: boolean = false
  type: string = ''
  isMale: boolean = false


  ngOnInit(): void {
    this.editDetails = this.form.group({
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      relation: ['', Validators.required],
      physicallyChallenge: ['', Validators.required]

    })
    console.log(this.data);
    
    const devoteeDate = new Date(this.data.dateOfBirth)
    console.log(devoteeDate);
    
    const tempDate = this.date.transform(devoteeDate, 'dd/MM/yyyy');

    this.editDetails.get("gender")?.setValue(this.data.gender);
    this.editDetails.get('dob')?.setValue(tempDate)
    this.editDetails.get('maritalStatus')?.setValue(this.data.isMarried)
    this.editDetails.get('physicallyChallenge')?.setValue(this.data.physicallyChallenges)
    this.editDetails.get('relation')?.setValue(this.data.relationshipWithPrimaryDevotee)
    this.editDetails.disable()
    this.editDetails.get('isSwastayani')?.enable()

    if (this.data.gender == 'Male') {
      this.isMale = true
    } else {
      this.isMale = false
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
  }

  getGender(event: any) {
    this.type = 'relation'
    this.editDetails.get('relation')?.enable()
    this.editDetails.get('relation')?.setValue('')
    event.value == 'Male' ? this.isMale = true : this.isMale = false
  }

  toggle() {
    this.isActive = !this.isActive
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
}

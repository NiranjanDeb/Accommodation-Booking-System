import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [MatSelectModule,
    MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss',
  providers: [DatePipe]
})
export class HomeSearchComponent implements OnInit {
  @ViewChild('anchor', { static: false }) anchor!: ElementRef;


  reference = new FormControl('');
  referenceInput = new FormControl('');
  pin = new FormControl('');
  district = new FormControl('');
  state = new FormControl('');
  bookingType = new FormControl('');
  accoType = new FormControl('');
  bookingStatus = new FormControl('');
  fromDate = new FormControl('');
  toDate = new FormControl('');

  isVisit: boolean = false
  isHide: boolean = false;
  searchType = new FormControl('');
  showEdit: boolean = false;
  profileData: any = [];
  pincodeList: any = [];
  districtList: any = [];
  stateList: any = [];
  profileDetails: any;
  allStateDistrict: any;
  bookingList: any = [];
  isprofile: boolean = false;
  bookingIdDetails: any = [];
  visitData: any = []



  constructor(
    private advanceService: AdvanceSearchService,
    private date: DatePipe

  ) { }

  ngOnInit(): void {
    this.getStates()

  }

  ngAfterViewInit() {

  }

  onSelectType(event: any) {

    if (event.value == 'profile') {
      console.log(event.value);
      this.isHide = true
      this.isprofile = true
      this.isVisit = false

    } else if (event.value == 'visit') {
      this.isVisit = true
      this.isHide = false
      this.isprofile = false
    } else {
      this.isHide = false
      this.isprofile = false
      this.isVisit = false

    }
  }
  reset() {
    this.searchType.setValue('')
    this.reference.setValue('')
    this.referenceInput.setValue('')
    this.pin.setValue('')
    this.state.setValue('')
    this.district.setValue('')
    this.bookingType.setValue('')
    this.bookingStatus.setValue('')
    this.accoType.setValue('')
    this.fromDate.setValue('')
    this.toDate.setValue('')
    this.districtList = []
  }

  searchProfile() {
    const payload = {
      key: this.referenceInput?.value,
      keyType: this.reference?.value,
      pincode: Number(this.pin?.value),
      state: this.state?.value,
      district: this.district?.value,
      bookingType: this.bookingType?.value,
      accommodationType: this.accoType?.value,
      bookingStatus: this.bookingStatus?.value,
      fromDate: this.date.transform(this.fromDate?.value, 'yyyy-MM-dd'),
      toDate: this.date.transform(this.toDate?.value, 'yyyy-MM-dd'),
    }
    const cleanObj = Object.fromEntries(
      Object.entries(payload).filter(([Keys, value]) => value !== null && value !== undefined && value !== '')
    )
    if (this.searchType.value == 'profile') {
      this.advanceService.fetchProfile(cleanObj).subscribe({
        next: (res) => {
          if (res.data.length > 0)
            this.profileData = res.data
          console.log(this.profileData);
          const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
              // this.loadNextPage(); 
              console.log('working', this.anchor);

            }
          }, {
            root: document.querySelector('.table-container'),
            rootMargin: '50px'
          });

          observer.observe(this.anchor.nativeElement);
        }
      })
    } else if (this.searchType.value == 'visit') {
      this.advanceService.fetchVisitDetails(cleanObj).subscribe({
        next: (res) => {
          this.visitData = res.data
          console.log(this.visitData);
          const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
              // this.loadNextPage(); 
              console.log('working', this.anchor);

            }
          }, {
            root: document.querySelector('.table-container'),
            rootMargin: '50px'
          });

          observer.observe(this.anchor.nativeElement);
        }
      })
    } else {
      this.advanceService.fetchBookingDetails(cleanObj).subscribe({
        next: (res) => {
          this.bookingList = res.data;
          console.log(this.bookingList);
          const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
              // this.loadNextPage(); 
              console.log('working', this.anchor);

            }
          }, {
            root: document.querySelector('.table-container'),
            rootMargin: '50px'
          });

          observer.observe(this.anchor.nativeElement);
        }
      })
    }
  }

  getPincodeDetails(key: any) {
    if (key?.value.length == 6) {

      this.advanceService.fetchPincode(key.value)?.subscribe({
        next: (res) => {
          this.stateList = []
          this.districtList = []
          this.pincodeList = res.data
          console.log(this.pincodeList);

          this.stateList = this.pincodeList.state

          this.districtList = this.pincodeList.district
          if (this.stateList.length == 1) {
            this.state.setValue(this.stateList[0])
            this.districtList.length == 1 ? this.district.setValue(this.districtList[0]) : this.districtList
          }


        }

      })
    } else if (key?.value.length == 0) {
      this.state.setValue('')
      this.district.setValue('')
      this.districtList = []
      //  this.pin.valueChanges.subscribe(item =>{
      //   console.log(item);

      //   if(item && item?.length < 6){
      this.getStates()
      //   }
      // })
    }
  }
  getDistrict(value: any) {
    this.districtList = this.allStateDistrict[value.value]
    console.log(this.districtList);

  }

  getStates() {
    this.advanceService.fetchStates().subscribe({
      next: (res) => {
        this.allStateDistrict = res.data
        this.stateList = Object.keys(this.allStateDistrict)
        console.log(this.stateList);

      }
    })
  }

  back() {
    this.showEdit = false
  }

  getProfileDetails(event: any, type: string) {
    // console.log(fc);
    if (type == 'profile') {
      this.advanceService.fetchProfileDetails(event).subscribe({
        next: (res) => {
          this.profileDetails = res.data
          this.showEdit = true
          console.log(this.profileDetails);

        }
      })
    } else {
      this.advanceService.fetchBookingId(event).subscribe({
        next: (res) => {
          this.bookingIdDetails = res.data
          this.showEdit = true
          console.log(this.bookingIdDetails);

        }
      })
    }
  }

}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdvanceSearchService } from '../../services/Advance-search/advance-search.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { EditDetailsPopupComponent } from './edit-details-popup/edit-details-popup.component';
import { ToastService } from '../../services/toast/toast.service';
import { LoaderComponent } from '../../atoms/loader/loader.component';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [MatSelectModule,
    MatFormFieldModule, ReactiveFormsModule, InfiniteScrollDirective, LoaderComponent],
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss', '../../../common-style/dropdown.scss'],
  providers: [DatePipe]
})
export class HomeSearchComponent implements OnInit {
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  searchType = new FormControl('profile');
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
  pageNo: number = 1
  payload: any = {}
  isAllDataLoaded: boolean = false
  isLoading: boolean = false

  searchMaxLen: string | number = 200;

  constructor(
    private advanceService: AdvanceSearchService,
    private dialog: MatDialog,
    private date: DatePipe,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getStates()
    if (this.searchType?.value == 'profile') {
      this.isHide = true;
      this.isprofile = true;
      this.isVisit = false;
      this.reference.setValue('familyCode');
    }
    // console.log(this.referenceInput.value);

    this.referenceInput.valueChanges.subscribe(item => {
      if (this.reference.value == 'name') {
        if (typeof item == 'string' && item.length < 3) {
          this.profileData = []
          this.bookingList = []
          this.visitData = []
          console.log(item);
        }
      } else if (this.reference.value == 'mobileNumber') {
        if (typeof item == 'string' && item.length < 10) {
          this.profileData = []
          this.bookingList = []
          this.visitData = []
          console.log('contact', item);
        }
      } else {
        if (typeof item == 'string' && item.length < 12) {
          this.profileData = []
          this.bookingList = []
          this.visitData = []
          console.log('family', item);
        }
      }
    })
  }

  ngAfterViewInit() {
    this.tableContainer?.nativeElement.addEventListener(
      'scroll',
      this.onScroll.bind(this)
    );
  }

  onScroll() {
    // if (this.profileData.length > 15) {
    //   this.pageNo += 1;
    //   this.searchProfile(false)
    // }

     // Step 1: Figure out which list is currently active
  let activeList = [];

  if (this.isprofile) {
    activeList = this.profileData;       // Profile tab
  } else if (this.isVisit) {
    activeList = this.visitData;         // Visit tab
  } else {
    activeList = this.bookingList;       // Bookings tab ✅
  }

  // Step 2: If that list has items, load next page
  if (activeList.length > 0) {
    this.pageNo += 1;
    this.searchProfile(false);
  }

  }

  referenceSelection(event: any) {
    if (event.value) {
      this.referenceInput.setValue('');
      if (this.searchType?.value == 'profile') {
        this.pageNo = 1;
        this.profileData = [];
      } else {
        this.bookingList = [];
        this.pageNo = 1;
      }
    }
  }

  filterReg(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input?.value;
    if (!val) return;
    let regex: RegExp = /[^A-Za-z0-9]/g;

    switch (this.reference.value) {
      case 'familyCode':
        this.searchMaxLen = 12;
        regex = /[^0-9]/g;
        break;
      case 'name':
        this.searchMaxLen = 200;
        regex = /[^A-Za-z ]/g;
        break;
      case 'mobileNumber':
        this.searchMaxLen = 10;
        regex = /[^0-9]/g;
        break;
      case 'aadhaarNumber':
        this.searchMaxLen = 12;
        regex = /[^0-9]/g;
        break;
      case 'number':
        this.searchMaxLen = 100;
        regex = /[^0-9]/g;
        break;
    }

    const filtered = val.replace(regex, '');
    if (filtered !== val) {
      this.referenceInput.setValue(filtered, { emitEvent: false });
    }
  }

  allowNum(e: Event) {
    const input = e.target as HTMLInputElement;
    const val = input?.value;
    if (!val) return;

    const filtered = val.replace(/[^0-9]/g, '');
    if (filtered !== val) {
      this.pin.setValue(filtered, { emitEvent: false });
    }
  }

  onSelectType(event: any) {
    this.pageNo = 1;
    this.reset();
    if (event.value == 'profile') {
      console.log(event.value);
      this.isHide = this.isprofile = true;
      this.isVisit = false;
      this.reference.setValue('fc');
      this.profileData = [];
    } else if (event.value == 'visit') {
      this.isVisit = true;
      this.isHide = this.isprofile = false;
      this.reference.setValue('aadhaarNumber');
      this.visitData = [];
    } else {
      this.isHide = this.isprofile = this.isVisit = false;
      this.reference.setValue('');
      this.bookingList = [];
    }
  }
  reset() {
    this.reference.setValue('');
    this.referenceInput.setValue('');
    this.pin.setValue('');
    this.state.setValue('');
    this.district.setValue('');
    this.bookingType.setValue('');
    this.bookingStatus.setValue('');
    this.accoType.setValue('');
    this.fromDate.setValue('');
    this.toDate.setValue('');
    this.districtList = [];
    this.profileData = [];
    this.visitData = []
    this.bookingList = []
    this.getStates()
  }

  searchProfile(value?: boolean) {
    this.isLoading = true
    if (value) {
      this.profileData = this.bookingList = this.visitData = []
      this.pageNo = 1          
      this.isAllDataLoaded = false  
    }
    this.payload = {
      page: this.pageNo,
      key: this.reference?.value === 'bookingId' ? Number(this.referenceInput?.value) : this.referenceInput?.value,
      keyType: this.reference?.value,
      pincode: Number(this.pin?.value),
      state: this.state?.value,
      district: this.district?.value,
      bookingType: this.bookingType?.value,
      accommodationType: this.accoType?.value,
      bookingStatus: this.bookingStatus?.value,
      fromDate: this.date.transform(this.fromDate?.value, 'yyyy-MM-dd'),
      toDate: this.date.transform(this.toDate?.value, 'yyyy-MM-dd'),
    };
    const cleanObj = Object.fromEntries(
      Object.entries(this.payload).filter(
        ([Keys, value]) =>
          value !== null && value !== undefined && value !== '' && value !== 0
      )
    );
    // if(!value){
    if (this.searchType.value == 'profile') {
      this.advanceService.fetchProfile(cleanObj).subscribe({
        next: (res) => {
          this.isLoading = false
          if (this.profileData.length == 0) {
            // this.profileData = []
            this.profileData = [...res.data];
            this.isAllDataLoaded = true;
          } else {
            if (!value) {
              this.profileData = [...this.profileData, ...res.data];
            }
          }
          this.toastService.success(res.message);
        },
        error: (err) => {
          if (err) {
            this.isLoading = false
            this.toastService.error(err.error.message);
          }
        },
      });
    } else if (this.searchType.value == 'visit') {
      this.advanceService.fetchVisitDetails(cleanObj).subscribe({
        next: (res) => {
          this.isLoading = false
          if (this.visitData.length == 0) {
            this.visitData = res.data;
          }
          if (!value) {
            this.visitData = [...this.visitData, ...res.data];
            console.log(this.visitData);
          }
          this.toastService.success(res.message);
        },
        error: (err) => {
          if (err) {
            this.isLoading = false
            this.toastService.error(err.error.message);
          }
        },
      });
    } else {
      this.advanceService.fetchBookingDetails(cleanObj).subscribe({
        next: (res) => {
          this.isLoading = false
          if (this.bookingList.length == 0) {
            this.bookingList = res.data;
            // }else{
          }
          if (!value) {
            this.bookingList = [...this.bookingList, ...res.data];
            console.log(this.bookingList);
          }
          // }
          this.toastService.success(res.message);
        },
        error: (err) => {
          if (err) {
            this.isLoading = false
            this.toastService.error(err.error.message);
          }
        },
      });
    }
    // }
  }

  getPincodeDetails(key: any) {
    if (key?.value?.length == 6) {
      this.advanceService.fetchPincode(key.value)?.subscribe({
        next: (res) => {
          this.stateList = [];
          this.districtList = [];
          this.pincodeList = res.data;

          if (this.pincodeList !== undefined) {

            this.stateList = this.pincodeList?.state;

            this.districtList = this.pincodeList?.district;
            if (this.stateList?.length == 1) {
              this.state.setValue(this.stateList[0]);
              this.districtList.length == 1
                ? this.district.setValue(this.districtList[0])
                : this.districtList;
            }

          } else {
            this.state.setValue('');
            this.district.setValue('');
          }

          this.toastService.success(res.message);
        },
        error: (err) => {
          if (err) {
            this.state.setValue('');
            this.district.setValue('');
            this.toastService.error(err.error.message);
          }
        },
      });
    } else if (key?.value?.length == 0) {
      this.state.setValue('');
      this.district.setValue('');
      this.districtList = [];
      this.getStates()
      //  this.pin.valueChanges.subscribe(item =>{
      //   console.log(item);

      //   if(item && item?.length < 6){
      //   }
      // })
    }
  }

  onPinInput(e: Event, pin: any) {
    this.allowNum(e);
    this.getPincodeDetails(pin);
  }

  getDistrict(value: any) {
    this.districtList = this.allStateDistrict[value.value]
    console.log(this.districtList);

  }

  getStates() {
    this.isLoading = true
    this.advanceService.fetchStates().subscribe({
      next: (res) => {
        this.isLoading = false
        this.allStateDistrict = res.data
        this.stateList = Object.keys(this.allStateDistrict).sort((a, b) => a.localeCompare(b))
        console.log(this.stateList);

      },
      error: (err) => {
        if (err) {
          this.isLoading = false
          this.toastService.error(err.error.message);
        }
      },
    })
  }

  back() {
    this.showEdit = false
  }

  getProfileDetails(event: any, type: string) {
    // console.log(fc);
    this.isLoading = true
    if (type == 'profile') {
      this.advanceService.fetchProfileDetails(event).subscribe({
        next: (res) => {
          this.isLoading = false
          this.profileDetails = [...res.data.filter((item: any) => item.isPrimaryDevotee), ...res.data.filter((item: any) => !item.isPrimaryDevotee)]
          this.showEdit = true
          console.log(this.profileDetails);

        },
        error: (err) => {
          if (err) {
            this.isLoading = false
            this.toastService.error(err.error.message);
          }
        },
      })
    } else {
      this.advanceService.fetchBookingId(event).subscribe({
        next: (res) => {
          this.isLoading = false
          this.bookingIdDetails = res.data
          this.showEdit = true
          console.log(this.bookingIdDetails);

        },
        error: (err) => {
          if (err) {
            this.isLoading = false
            this.toastService.error(err.error.message);
          }
        },
      })
    }
  }

  editDetails(id: any, item: any) {
    const dialogRef = this.dialog.open(EditDetailsPopupComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: item,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res != undefined) {
          this.getProfileDetails(res.data.familyCode, res.data.type)
        }
      }
    })
  }
}

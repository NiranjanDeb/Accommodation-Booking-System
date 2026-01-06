import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}
  success(msg: string) {
    this._snackBar.open(msg, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500,
      panelClass: ['success-snackbar'],
    });
  }
  error(msg: string) {
    this._snackBar.open(msg, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500,
      panelClass: ['error-snackbar'],
    });
  }
}

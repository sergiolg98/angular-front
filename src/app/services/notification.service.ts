import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  SECONDS = 5;
  constructor(private _snackBar: MatSnackBar) { }

  showSimpleMessage(
    message: string,
    close_tag: any
  ){
    return this._snackBar.open(
      message, 
      close_tag, 
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: this.SECONDS*1000
      })
  }

}



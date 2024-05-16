import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmFormComponent } from '../confirm-form/confirm-form.component';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

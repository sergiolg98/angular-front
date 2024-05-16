import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoFormComponent } from './components/common/info-form/info-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-material';

  constructor(
    public dialog: MatDialog,
  ) {}

  openInfo(){
    this.dialog.open(InfoFormComponent, {
      panelClass: ['theme-dialog'],
      autoFocus: false,
      height: 'auto',
    });

  }
}

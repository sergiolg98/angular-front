import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { ConfirmFormComponent } from '../common/confirm-form/confirm-form.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  categories: Category[];
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
  ) {
    this.loadData();
  }


  loadData() {
    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res.data;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(data: any) {
    let dialogRef = this.dialog.open(CategoriesFormComponent, {
      data: data,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.notificationService.showSimpleMessage('Action completed.', 'Close')
        this.loadData();
      }
    });
  }

  remove(category: Category) {
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      width: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure to delete the category? There's no going back!"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.categoryService.delete(category.id!).subscribe((res: any) => {
            this.loadData();
            this.notificationService.showSimpleMessage('Category deleted.', 'Close');
        })
      }
    })
  }


}

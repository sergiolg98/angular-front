import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent {

  public context: string;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    console.log(this.data)
    this.context = 'Create Category';
    if (this.data)
      this.context = 'Update Category';
    this.initForm();
    this.loadCategory();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

  }

  submit() {
    console.log('>>SENDING THIS: ', this.form.value)
    if (this.form.valid) {
      if (this.data) {
        this.categoryService.update(
          this.data.id!,
          this.form.value,
        ).subscribe((response: any) => {
          this.dialogRef.close(response)
        }); 
      }
      else {
        this.categoryService.create(this.form.value).subscribe((response: any) => {
          this.dialogRef.close(response)
        })
      }
    }
    else {
      this.notificationService.showSimpleMessage('Please complete before submitting.', 'Close')
    }
  }

  loadCategory(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        description: this.data.description,
      });
    }
  }

}

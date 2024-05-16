import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NotesFormComponent {

  public context: string;
  public form: FormGroup;

  categories: Category[] = [];
  selectedCategories: Category[] = [];


  constructor(
    public dialogRef: MatDialogRef<NotesFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Note,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private noteService: NoteService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.context = 'Create Note';
    if (this.data)
      this.context = 'Update Note';
    this.initForm();
    this.loadCategories();
    this.loadNote();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  initForm() {
    this.form = this.fb.group({
      content: ['', [Validators.required]],
      active: [true],
      categoryIds: [[]],
    });

  }

  loadNote(): void {
    if (this.data) {
      this.form.patchValue({
        content: this.data.content,
        active: this.data.active,
        categoryIds: this.data.categoriesIncludes!.map((item) => item.category.id)
      });
      this.selectedCategories = this.data.categoriesIncludes!.map((item) => item.category);
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.data) {
        this.noteService.update(this.data.id!, this.form.value).subscribe((response: any) => {
          this.dialogRef.close(response)
        });
      }
      else {
        this.noteService.create(this.form.value).subscribe((response: any) => {
          this.dialogRef.close(response)
        })
      }
    }
    else {
      this.notificationService.showSimpleMessage('Please complete before submitting.', 'Close')
    }
  }

}

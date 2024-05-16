import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/interfaces/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { NotesFormComponent } from '../notes-form/notes-form.component';
import { ConfirmFormComponent } from '../common/confirm-form/confirm-form.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  notes: Note[];
  categories: Category[] = [];
  
  // Filters
  isFilterStateVisible: boolean = true;
  isFilterCategoriesVisible: boolean = false;
  
  filterDefault: string = 'by_state';
  filterByStateDefault: string = 'active';

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadCategories();
  }

  loadData() {
    this.noteService.getAllActive().subscribe((res: any) => {
      this.notes = res.data;
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  openDialog(object: any) {
    let dialogRef = this.dialog.open(NotesFormComponent, {
      data: object,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      this.loadData();
      this.notificationService.showSimpleMessage('Action completed.', 'Close');
    });
  }

  remove(data: any){
    const dialogRef = this.dialog.open(ConfirmFormComponent, {
      width: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure to delete the note? There's no going back!"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.noteService.delete(data.id).subscribe((response: any) => {
          // if (response.status === 200) { @todo handle in backend status in responses - hacer una response generica con un response data object
            this.loadData()
            this.notificationService.showSimpleMessage('Note deleted.', 'Close')
          //}
        })
      }
    })
  } 

  selectFilter(object: string) {
    this.loadData();
    if(object === 'by_categories'){
      this.isFilterCategoriesVisible = true;
      this.isFilterStateVisible = false;
    }
    else {
      this.isFilterCategoriesVisible = false;
      this.isFilterStateVisible = true;
    }

  }

  onStateSelect(object: 'all' | 'archived' | 'active') {
    if(object === 'archived'){
      this.noteService.getAllArchived().subscribe((res: any) => {
        if(res.data.length > 0)
          this.notes = res.data;
        else {
          this.notificationService.showSimpleMessage('No results for that filter', 'Close');
        }
      });
    }
    else if (object === 'active') {
      this.noteService.getAllActive().subscribe((res: any) => {
        if(res.data.length > 0)
          this.notes = res.data;
        else {
          this.notificationService.showSimpleMessage('No results for that filter', 'Close');
        }
      });
    }
    else {
      this.noteService.getAll().subscribe((res: any) => {
        this.notes = res.data;
      });
    }
  }

  onCategorySelect(data: number[]): void {
    this.noteService.filterByCategories(data).subscribe((res: any) => {
      this.notes = res.data;
    });
  }
  
}


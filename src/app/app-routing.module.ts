import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: '/notes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

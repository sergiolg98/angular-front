import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { NotesComponent } from './components/notes/notes.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { ConfirmFormComponent } from './components/common/confirm-form/confirm-form.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { AppInterceptor } from './utils/app.interceptor';
import { InfoFormComponent } from './components/common/info-form/info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    CategoriesComponent,
    NotesFormComponent,
    ConfirmFormComponent,
    CategoriesFormComponent,
    InfoFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/note.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  //private path: string = 'http://localhost:8000/api/notes';
  private path: string = 'https://nest-typeorm-1fgx.onrender.com/api/notes';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.path);
  }

  getAllActive(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.path + '/active');
  }

  getAllArchived(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.path + '/archived');
  }

  filterByCategories(categoryIds: number[]): Observable<Note[]> {
    return this.httpClient.post<Note[]>(this.path + '/categories/many', categoryIds);
  } 

  create(note: Note): any {
    return this.httpClient.post(this.path, note);
  }

  update(
    id: number,
    note: Note
  ): any {
    return this.httpClient.patch(this.path + `/${id}`, note);
  }

  delete(id: number) {
    return this.httpClient.delete(this.path + `/${id}`)
  }

}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Note } from '../interfaces/note.interface';
// import { BaseService } from './base.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class NoteService extends BaseService<Note> {
//   constructor(http: HttpClient) {
//     super(http, 'notes');
//   }

//   getAllActive(): Observable<Note[]> {
//     return this.http.get<Note[]>(`${this.baseUrl}${this.endpoint}/active`);
//   }

//   getAllArchived(): Observable<Note[]> {
//     return this.http.get<Note[]>(`${this.baseUrl}${this.endpoint}/archived`);
//   }

//   filterByCategories(categoryIds: number[]): Observable<Note[]> {
//     return this.http.post<Note[]>(`${this.baseUrl}${this.endpoint}/categories/many`, categoryIds);
//   } 
// }

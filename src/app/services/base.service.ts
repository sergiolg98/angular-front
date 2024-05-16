// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export abstract class BaseService<T> {
//   protected baseUrl: string;

//   constructor(protected http: HttpClient, protected endpoint: string) {
//     this.baseUrl = 'https://nest-typeorm-1fgx.onrender.com/api/';
//     //this.baseUrl = 'http://localhost:8000/api/';
//   }

//   getAll(): Observable<T[]> {
//     return this.http.get<T[]>(`${this.baseUrl}${this.endpoint}`);
//   }

//   create(item: T): Observable<any> {
//     return this.http.post(`${this.baseUrl}${this.endpoint}`, item);
//   }

//   update(id: number, item: T): Observable<any> {
//     return this.http.patch(`${this.baseUrl}${this.endpoint}/${id}`, item);
//   }

//   delete(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}${this.endpoint}/${id}`);
//   }
// }
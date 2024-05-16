import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private path: string = 'http://localhost:8000/api/categories'
  private path: string = 'https://nest-typeorm-1fgx.onrender.com/api/categories'

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path);
  }

  create(category: Category): any {
    return this.httpClient.post(this.path, category);
  }

  update(
    id: number,
    category: Category
  ): any {
    return this.httpClient.patch(this.path + `/${id}`, category);
  }

  delete(id: number) {
    return this.httpClient.delete(this.path + `/${id}`)
  }

}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Category } from '../interfaces/category.interface';
// import { BaseService } from './base.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService extends BaseService<Category> {
//   constructor(http: HttpClient) {
//     super(http, 'categories');
//   }
// }

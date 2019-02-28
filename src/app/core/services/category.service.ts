import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { sortBy } from 'lodash'
import { Category } from 'shared/models/category.model'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class CategoryService {
  private readonly path = 'api/categories'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path, { headers: this.headers }).pipe(
      map(categories => {
        return sortBy(categories, 'name')
      })
    )
  }
}

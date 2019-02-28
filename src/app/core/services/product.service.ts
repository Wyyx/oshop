import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Update } from 'shared/models/model.util'
import { Product } from 'shared/models/product.model'

export interface ResponseType {
  message: string
  [key: string]: any
}

@Injectable()
export class ProductService {
  private readonly path = 'api/products'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) {}

  add(product: Product): Observable<ResponseType> {
    return this.http.post<ResponseType>(this.path, JSON.stringify(product), {
      headers: this.headers
    })
  }

  update(product: Update<Product>): Observable<ResponseType> {
    const url = `${this.path}`
    return this.http.patch<ResponseType>(url, JSON.stringify(product.changes), {
      headers: this.headers
    })
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path)
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.path}/${id}`)
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.path}/${id}`)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Order } from 'shared/models/order.model'
import { CartService } from './cart.service'

@Injectable()
export class OrderService {
  private readonly path = 'api/orders'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private cartService: CartService, private http: HttpClient, private router: Router) {}

  summitOrder(order: Order): Observable<boolean> {
    return this.addOrder(order).pipe(map(res => (res ? true : false)))
  }

  addOrder(order: Order) {
    return this.http.post<Order>(this.path, order, { headers: this.headers })
  }

  getAll() {
    return this.http.get<Order[]>(this.path)
  }

  get(id: string) {
    const url = `${this.path}/${id}`
    return this.http.get<Order>(url)
  }
}

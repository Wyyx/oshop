import { OrderService } from '../../../core/services/order.service'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Order } from 'shared/models/order.model'

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getAll()
  }
}

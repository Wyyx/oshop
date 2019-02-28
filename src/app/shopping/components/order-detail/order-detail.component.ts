import { Order } from 'shared/models/order.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { OrderService } from '../../../core/services/order.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.loadOrder()
  }

  ngOnInit() {}

  loadOrder() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.orderService
        .get(id)
        .pipe(take(1))
        .subscribe(order => (this.order = order))
    }
  }
}

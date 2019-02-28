import { Component, OnInit } from '@angular/core'
import { CartService } from '../../../core/services/cart.service'
import { Observable } from 'rxjs'
import { CartItem } from 'shared/models/cart-item.model'

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  totakQuantity$: Observable<number>
  totalPrice$: Observable<number>
  items$: Observable<CartItem[]>

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.totakQuantity$ = this.cartService.totalQuantity$
    this.totalPrice$ = this.cartService.totalPrice$
    this.items$ = this.cartService.items$
  }
}

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { tap, take, mergeMap } from 'rxjs/operators'
import { Order, Shipping } from 'shared/models/order.model'
import { AuthService } from '../../../core/services/auth.service'
import { CartService } from '../../../core/services/cart.service'
import { OrderService } from '../../../core/services/order.service'

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  constructor(
    private cartServive: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitOrder(shipping: Shipping) {
    this.authService.user$
      .pipe(
        mergeMap(user => {
          // set order
          const order: Order = {
            items: this.cartServive.cart.items,
            totalPrice: this.cartServive.getTotalPrice(),
            totalQuantity: this.cartServive.getTotalQuantity(),
            shipping,
            userId: user.id
          }

          return this.orderService.summitOrder(order).pipe(
            tap(success => {
              if (success) {
                this.cartServive.clearShoppingCart()
                this.router.navigate(['/order-success'])
              }
            })
          )
        }),
        take(1)
      )
      .subscribe()
  }
}

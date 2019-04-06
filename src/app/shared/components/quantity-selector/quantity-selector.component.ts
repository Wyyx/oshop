import { Component, Input, OnInit } from '@angular/core'
import { take, tap } from 'rxjs/operators'
import { Product } from 'shared/models/product.model'
import { CartService } from '../../../core/services/cart.service'

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent implements OnInit {
  @Input('product') product: Product

  localQuantity: number = 0

  constructor(private cartService: CartService) {}

  get cart() {
    return this.cartService.cart
  }

  ngOnInit() {
    // get init localQuantity from cart
    this.cartService.items$
      .pipe(
        tap(items => {
          const cartItem = items.find(item => item.product._id === this.product._id)
          if (cartItem) {
            this.localQuantity = cartItem.quantity
          }
        }),
        take(1)
      )
      .subscribe()
  }

  plusQuantity() {
    this.localQuantity++
    this.cartService.addToCart(this.product, this.localQuantity)
  }

  minusQuantity() {
    this.localQuantity--
    this.cartService.addToCart(this.product, this.localQuantity)
  }
}

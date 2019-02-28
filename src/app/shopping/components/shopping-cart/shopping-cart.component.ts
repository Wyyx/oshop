import { Component, OnInit } from '@angular/core'
import { CartService } from '../../../core/services/cart.service'
import { Cart } from 'shared/models/cart.model'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { CartItem } from 'shared/models/cart-item.model'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalQuantity$: Observable<number>
  totalPrice$: Observable<number>
  items$: Observable<CartItem[]>
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit() {
    this.totalQuantity$ = this.cartService.totalQuantity$
    this.totalPrice$ = this.cartService.totalPrice$
    this.items$ = this.cartService.items$
  }
  checkOut() {
    this.router.navigate(['/check-out'])
  }

  clearCart() {
    if (confirm('Are you sure to clear the cart?')) {
      this.cartService.clearShoppingCart()
    }
  }
}

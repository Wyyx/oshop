import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { ShoppingCart } from '../models/shopping-cart'

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: [ './shopping-cart.component.css' ]
})
export class ShoppingCartComponent implements OnInit {
	constructor(private cartService: ShoppingCartService) {}

	ngOnInit() {}

	get cart() {
		if (this.cartService.cart) {
			return this.cartService.cart
		}
	}

	get totalPrice() {
		if (this.cartService.cart) {
			return this.cartService.cart.getTotalPrice()
		}
	}

	get totalQuantity() {
		if (this.cartService.cart) {
			return this.cartService.cart.getTotalQuantity()
		}
	}

	clearCart() {
		if (confirm('Are you sure to clear the cart?')) {
			this.cartService.clearShoppingCart()
		}
	}
}

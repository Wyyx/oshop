import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { ShoppingCart } from '../models/shopping-cart'
import { Router } from '@angular/router'

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: [ './shopping-cart.component.css' ]
})
export class ShoppingCartComponent {
	constructor(private cartService: ShoppingCartService, private router: Router) {}

	checkOut() {
		this.router.navigate([ '/check-out' ])
	}

	clearCart() {
		if (confirm('Are you sure to clear the cart?')) {
			this.cartService.clearShoppingCart()
		}
	}
}

import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { ShoppingCart } from '../models/shopping-cart'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent {
	constructor(private authService: AuthService, private cartService: ShoppingCartService) {}

	get totalQuantity() {
		if (this.cartService.cart) {
			return this.cartService.cart.getTotalQuantity()
		}
	}
}

import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { ShoppingCartService } from './shopping-cart.service'
import { Order } from '../models/order'
import { AuthHttp } from 'angular2-jwt'
import { AuthService } from './auth.service'

@Injectable()
export class OrderService {
	constructor(
		private cartService: ShoppingCartService,
		private authHttp: AuthHttp,
		private router: Router
	) {}

	summitOrder(order: Order) {
		this.authHttp
			.post('/api/orders', order)
			.map(response => response.json())
			.take(1)
			.subscribe(data => {
				if (data) {
					this.router.navigate([ '/order-success' ])
				}
			})
	}
}

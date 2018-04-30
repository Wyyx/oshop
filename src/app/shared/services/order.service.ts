import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { ShoppingCartService } from 'shared/services/shopping-cart.service'
import { Order } from 'shared/models/order'
import { AuthHttp } from 'angular2-jwt'
import { AuthService } from 'shared/services/auth.service'

@Injectable()
export class OrderService {
	orders: Order[]
	constructor(
		private cartService: ShoppingCartService,
		private authHttp: AuthHttp,
		private router: Router
	) {
		this.loadOrders()
	}

	loadOrders() {
		this.getAll().take(1).subscribe(orders => {
			if (orders) {
				this.orders = orders
			}
		})
	}

	summitOrder(order: Order) {
		this.authHttp
			.post('/api/orders', order)
			.map(response => response.json())
			.take(1)
			.subscribe(data => {
				if (data) {
					this.cartService.clearShoppingCart()
					this.router.navigate([ '/order-success' ])
				}
			})
	}

	getAll() {
		return this.authHttp.get('/api/orders').map(response => <Order[]>response.json())
	}

	get(id: string) {
		return this.authHttp.get('/api/orders/' + id).map(response => <Order>response.json())
	}
}

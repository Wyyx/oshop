import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from './../services/shopping-cart.service'
import { OrderService } from './../services/order.service'
import { Order, Shipping } from './../models/order'
import { AuthService } from './../services/auth.service'

@Component({
	selector: 'app-shipping-form',
	templateUrl: './shipping-form.component.html',
	styleUrls: [ './shipping-form.component.css' ]
})
export class ShippingFormComponent implements OnInit {
	constructor(
		private cartServive: ShoppingCartService,
		private orderService: OrderService,
		private authService: AuthService
	) {}

	ngOnInit() {}

	submitOrder(form: ShippingForm) {
		// set order
		let order = new Order()
		order.items = this.cartServive.cart.items
		order.shipping = this.convertToShipping(form)
		order.userId = this.authService.user.id

		console.log('order', order)

		this.orderService.summitOrder(order)
	}

	convertToShipping(form: ShippingForm) {
		let address: string[] = []
		address.push(form.address1)
		address.push(form.address2)

		let shipping = new Shipping()
		shipping.name = form.name
		shipping.address = address
		shipping.city = form.city

		return shipping
	}
}

class ShippingForm {
	name: string
	address1: string
	address2: string
	city: string
}

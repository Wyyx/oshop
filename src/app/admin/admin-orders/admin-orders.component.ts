import { OrderService } from './../../services/order.service'
import { Order } from './../../models/order'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-admin-orders',
	templateUrl: './admin-orders.component.html',
	styleUrls: [ './admin-orders.component.css' ]
})
export class AdminOrdersComponent implements OnInit {
	constructor(private orderService: OrderService) {}

	ngOnInit() {
		this.orderService.loadOrders()
	}
}

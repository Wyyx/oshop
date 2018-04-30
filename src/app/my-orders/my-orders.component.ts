import { OrderService } from './../services/order.service'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-my-orders',
	templateUrl: './my-orders.component.html',
	styleUrls: [ './my-orders.component.css' ]
})
export class MyOrdersComponent implements OnInit {
	constructor(private orderService: OrderService) {}

	ngOnInit() {
		this.orderService.loadOrders()
	}
}

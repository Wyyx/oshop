import { Order } from './../models/order'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { OrderService } from '../services/order.service'

@Component({
	selector: 'app-order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: [ './order-detail.component.css' ]
})
export class OrderDetailComponent implements OnInit {
	order: Order

	constructor(private route: ActivatedRoute, private orderService: OrderService) {
		this.loadOrder()
	}

	ngOnInit() {}

	loadOrder() {
		let id = this.route.snapshot.paramMap.get('id')
		if (id) {
			this.orderService.get(id).take(1).subscribe(order => (this.order = order))
		}
	}
}

import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from 'shared/services/shopping-cart.service'

@Component({
	selector: 'app-order-summary',
	templateUrl: './order-summary.component.html',
	styleUrls: [ './order-summary.component.css' ]
})
export class OrderSummaryComponent implements OnInit {
	constructor(private cartService: ShoppingCartService) {}

	ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core'
import { ShoppingCartService } from 'shared/services/shopping-cart.service'
import { Product } from 'shared/models/product'

@Component({
	selector: 'app-quantity-selector',
	templateUrl: './quantity-selector.component.html',
	styleUrls: [ './quantity-selector.component.css' ]
})
export class QuantitySelectorComponent implements OnInit {
	@Input('product') product: Product

	localQuantity: number = 0

	constructor(private cartService: ShoppingCartService) {}

	ngOnInit() {
		this.localQuantity = this.cartService.cart.getQuantity(this.product)
	}

	plusQuantity() {
		this.localQuantity++
		this.cartService.addToCart(this.product, this.localQuantity)
	}

	minusQuantity() {
		this.localQuantity--
		this.cartService.addToCart(this.product, this.localQuantity)
	}
}

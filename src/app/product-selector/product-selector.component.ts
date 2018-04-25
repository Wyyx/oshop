import { Component, OnInit, Input } from '@angular/core'
import { ShoppingCartService } from '../services/shopping-cart.service'
import { Product } from '../models/product'

@Component({
	selector: 'app-product-selector',
	templateUrl: './product-selector.component.html',
	styleUrls: [ './product-selector.component.css' ]
})
export class ProductSelectorComponent implements OnInit {
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

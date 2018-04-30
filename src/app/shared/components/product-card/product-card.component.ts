import { Component, OnInit, Input } from '@angular/core'
import { Product } from 'shared/models/product'
import { ShoppingCartService } from 'shared/services/shopping-cart.service'
import { ShoppingCartItem } from 'shared/models/shopping-cart-item'

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: [ './product-card.component.css' ]
})
export class ProductCardComponent {
	@Input('product') product: Product
	@Input('showActions') showActions: boolean = true
	@Input('addLink') addLink: boolean = true

	constructor() {}
}

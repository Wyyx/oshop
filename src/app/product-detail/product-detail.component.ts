import { ProductService } from './../services/product.service'
import { Product } from './../models/product'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.css' ]
})
export class ProductDetailComponent {
	product: Product

	constructor(private route: ActivatedRoute, private productService: ProductService) {
		this.loadProduct()
	}

	loadProduct() {
		let id = this.route.snapshot.paramMap.get('id')
		this.productService.get(id).take(1).subscribe(product => {
			this.product = product
		})
	}
}

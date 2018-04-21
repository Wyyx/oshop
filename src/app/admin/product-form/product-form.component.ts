import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/category.service'
import { ProductService } from '../../services/product.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'
import { Router, ActivatedRoute } from '@angular/router'
import * as messages from '../../constants/messages'
import { Category } from '../../models/category'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util'
import { Product } from '../../models/product'

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: [ './product-form.component.css' ]
})
export class ProductFormComponent {
	product: Product
	id
	categories: Category[]
	isSuccess: boolean
	showMessage: boolean = false

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private categoryService: CategoryService,
		private productService: ProductService
	) {
		this.product = new Product()
		this.product.category = new Category()

		this.id = route.snapshot.paramMap.get('id')
		if (this.id) {
			productService.get(this.id).take(1).subscribe(product => (this.product = product))
		}

		categoryService.getAll().subscribe(categories => (this.categories = categories))
	}

	save(product) {
		// set category
		product.category = this.categories.find(c => c.id === toInteger(product.category))

		this.productService.save(product).subscribe(res => {
			res.message === messages.SUCCESS ? (this.isSuccess = true) : (this.isSuccess = false)
			this.showMessage = true
			setTimeout(() => {
				this.showMessage = false

				if (res.message === messages.SUCCESS) {
					this.router.navigate([ '/admin/products' ])
				}
			}, 500)
		})
	}

	delete() {
		if (confirm('Are you sure to delete the product?')) {
			this.productService.delete(this.id).subscribe(() => {
				this.router.navigate([ '/admin/products' ])
			})
		}
	}
}

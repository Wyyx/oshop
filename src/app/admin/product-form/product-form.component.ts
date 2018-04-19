import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/category.service'
import { ProductService } from '../../services/product.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'
import { Router, ActivatedRoute } from '@angular/router'
import * as messages from '../../constants/messages'

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: [ './product-form.component.css' ]
})
export class ProductFormComponent implements OnInit {
	product = {}
	id
	categories: Observable<string[]>
	isSuccess: boolean
	showMessage: boolean = false

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private categoryService: CategoryService,
		private productService: ProductService
	) {
		this.id = route.snapshot.paramMap.get('id')
		if (this.id) {
			productService
				.getProduct(this.id)
				.take(1)
				.subscribe(product => (this.product = product))
		}

		this.categories = categoryService.getCategories()
	}

	save(product) {
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
			this.productService.deleteProduct(this.id).subscribe(() => {
				this.router.navigate([ '/admin/products' ])
			})
		}
	}

	ngOnInit() {}
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { ProductService } from '../../services/product.service'
import * as messages from '../../constants/messages'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Product } from '../../models/product'
import { subscribeOn } from 'rxjs/operator/subscribeOn'
import { Subscription } from 'rxjs'

import { PageUtil, Page } from '../../helpers/paging-util'

@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: [ './admin-products.component.css' ]
})
export class AdminProductsComponent implements OnDestroy {
	products: Product[]
	filteredProducts: Product[]
	subscription: Subscription
	pageUtil: PageUtil
	page: Page

	constructor(private router: Router, private productService: ProductService) {
		this.pageUtil = new PageUtil()
		this.getProducts()
	}

	deleteProduct(id) {
		if (confirm('Are you sure to delete the product?')) {
			this.productService.deleteProduct(id).subscribe(() => {
				this.getProducts()
			})
		}
	}

	getProducts() {
		this.subscription = this.productService.getProducts().subscribe(products => {
			this.products = products
			this.filteredProducts = products

			this.page = this.pageUtil.getPage(1, 5, this.filteredProducts)
		})
	}

	filter(query: string) {
		this.filteredProducts = this.products.filter(p =>
			p.title.toLowerCase().includes(query.toLowerCase())
		)

		this.page = this.pageUtil.getPage(1, 5, this.filteredProducts)
	}

	previousPage() {
		this.page = this.pageUtil.previousPage()
	}

	nextPage() {
		this.page = this.pageUtil.nextPage()
	}

	getPageNumbers(pageNumbersSize: number) {
		return this.pageUtil.getPageNumbers(pageNumbersSize)
	}

	getPage(pageNumber) {
		this.page = this.pageUtil.getPage(pageNumber, 5, this.filteredProducts)
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}
}

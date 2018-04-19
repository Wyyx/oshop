import { Injectable } from '@angular/core'
import { AuthHttp } from 'angular2-jwt'
import { loadProducts } from '../helpers/add-products'

@Injectable()
export class ProductService {
	constructor(private http: AuthHttp) {}

	save(product: any): any {
		if (product._id) {
			return this.http
				.put('/api/products', JSON.stringify(product))
				.map(response => response.json())
		}

		return this.http
			.post('/api/products', JSON.stringify(product))
			.map(response => response.json())
	}

	getProducts() {
		return this.http.get('/api/products').map(response => response.json())
	}

	getProduct(id) {
		return this.http.get('/api/products/' + id).map(response => response.json())
	}

	deleteProduct(id) {
		return this.http.delete('/api/products/' + id).map(response => response.json())
	}

	loadProducts() {
		loadProducts(this.http)
	}
}

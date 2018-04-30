import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { Product } from 'shared/models/product'
import { ShoppingCart } from 'shared/models/shopping-cart'
import { Http, Headers } from '@angular/http'
import { Subscription, Observable } from 'rxjs'
import 'rxjs/add/operator/switchMap'
import { ShoppingCartItem } from 'shared/models/shopping-cart-item'

@Injectable()
export class ShoppingCartService {
	public cart: ShoppingCart

	constructor(private http: Http) {
		this.getCart().take(1).subscribe(cart => {
			// save cartId to local storage
			localStorage.setItem('cartId', cart._id)

			this.cart = Object.assign(new ShoppingCart(), cart)
		})
	}

	addToCart(product: Product, quantity: number) {
		this.getCart().take(1).subscribe(cart => {
			// save cartId to local storage
			localStorage.setItem('cartId', cart._id)

			// copy cart to local state
			this.cart = Object.assign(new ShoppingCart(), cart)

			// find item
			let item: ShoppingCartItem
			let itemIndex = cart.items.findIndex(e => e.product._id === product._id)
			if (itemIndex >= 0) item = cart.items[itemIndex]

			// set or add or delete item
			if (item) {
				if (quantity === 0) cart.items.splice(itemIndex, 1)
				item.quantity = quantity
			} else {
				cart.items.push({ quantity, product })
			}

			this.updateCart(cart)
		})
	}

	private updateCart(cart: ShoppingCart) {
		const headers = new Headers()
		headers.set('Content-Type', 'application/json')

		this.http
			.put('/api/shopping_carts', JSON.stringify(cart), { headers })
			.map(response => response.json())
			.take(1)
			.subscribe()
	}

	private getCart() {
		let cartId = localStorage.getItem('cartId')

		if (cartId) {
			return this.http.get('/api/shopping_carts/' + cartId).map(response => response.json())
		} else {
			return this.createCart()
		}
	}

	private createCart() {
		return this.http.get('/api/shopping_carts/create').map(response => response.json())
	}

	clearShoppingCart() {
		this.http.delete('/api/shopping_carts/delete/' + this.cart._id).subscribe()
		localStorage.removeItem('cartId')
		this.cart = null

		// create new cart
		this.getCart().take(1).subscribe(cart => {
			this.cart = Object.assign(new ShoppingCart(), cart)

			// save cartId to local storage
			localStorage.setItem('cartId', cart._id)
		})
	}
}

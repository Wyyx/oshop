import { ShoppingCartItem } from './shopping-cart-item'
import { Product } from './product'

export class ShoppingCart {
	_id: string
	createdTime: number
	items: ShoppingCartItem[]

	getQuantity(product: Product) {
		let item: ShoppingCartItem
		let itemIndex = this.items.findIndex(item => item.product._id === product._id)

		if (itemIndex >= 0) {
			item = this.items[itemIndex]
			return item.quantity
		}
		return 0
	}

	getTotalQuantity() {
		if (this.items.length > 0) {
			return this.items
				.map(item => item.quantity)
				.reduce((accumulator, currentValue) => accumulator + currentValue)
		}
	}

	getTotalPrice() {
		if (this.items.length > 0) {
			return this.items
				.map(item => item.quantity * item.product.price)
				.reduce((accumulator, currentValue) => accumulator + currentValue)
		}
	}
}

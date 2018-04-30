import { ShoppingCartItem } from './shopping-cart-item'

export class Order {
	userId: string
	shipping: Shipping
	items: ShoppingCartItem[]
	totalPrice: number
}

export class Shipping {
	name: string
	address: string[]
	city: string
}

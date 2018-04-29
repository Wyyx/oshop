import { ShoppingCartItem } from './shopping-cart-item'

export class Order {
	userId: string
	shipping: Shipping
	items: ShoppingCartItem[]
}

export class Shipping {
	name: string
	address: string[]
	city: string
}

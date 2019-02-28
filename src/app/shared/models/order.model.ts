import { CartItem } from './cart-item.model'

export interface Order {
  userId: string
  shipping: Shipping
  items: CartItem[]
  totalPrice: number
  totalQuantity: number
}

export interface Shipping {
  name: string
  address: string
  city: string
}

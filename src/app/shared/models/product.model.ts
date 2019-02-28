import { Category } from './category.model'

export class Product {
  _id?: string
  title: string
  price: number
  category: Category
  imageUrl: string
}

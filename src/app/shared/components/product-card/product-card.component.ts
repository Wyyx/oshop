import { Component, Input } from '@angular/core'
import { Product } from 'shared/models/product.model'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product
  @Input('showActions') showActions: boolean = true
  @Input('addLink') addLink: boolean = true

  constructor() {}
}

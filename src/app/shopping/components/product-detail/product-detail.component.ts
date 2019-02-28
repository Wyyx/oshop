import { ProductService } from '../../../core/services/product.service'
import { Product } from 'shared/models/product.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.loadProduct()
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService
      .get(id)
      .pipe(take(1))
      .subscribe(product => {
        this.product = product
      })
  }
}

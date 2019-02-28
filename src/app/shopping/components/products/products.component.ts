import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { ProductService } from '../../../core/services/product.service'
import { Product } from 'shared/models/product.model'
import { ActivatedRoute } from '@angular/router'
import { Category } from 'shared/models/category.model'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[]
  filteredProducts: Product[]
  filterCategory: string

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    productService
      .getAll()
      .pipe(take(1))
      .subscribe(products => {
        this.products = products
        this.filter()
      })
  }

  filter() {
    this.route.queryParamMap.subscribe(params => {
      this.filterCategory = params.get('category')

      this.filteredProducts = this.filterCategory
        ? this.products.filter(
            p => p.category.name.toLowerCase() === this.filterCategory.toLowerCase()
          )
        : this.products
    })
  }
}

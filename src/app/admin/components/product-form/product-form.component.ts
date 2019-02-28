import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { take, mergeMap, tap, catchError } from 'rxjs/operators'
import { Category } from 'shared/models/category.model'
import { Product } from 'shared/models/product.model'
import { CategoryService } from '../../../core/services/category.service'
import { ProductService } from '../../../core/services/product.service'
import * as messages from '../../../helpers/constants/messages'
import { of } from 'rxjs'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product: Product
  id
  categories: Category[]
  isSuccess: boolean
  showMessage: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.product = new Product()
    this.product.category = new Category()

    this.id = route.snapshot.paramMap.get('id')
    if (this.id) {
      productService
        .get(this.id)
        .pipe(take(1))
        .subscribe(product => (this.product = product))
    }

    categoryService
      .getAll()
      .pipe(take(1))
      .subscribe(categories => (this.categories = categories))
  }

  save(product) {
    // set category
    product.category = this.categories.find(c => c.id === parseInt(product.category))
    const productId = product._id

    of(productId)
      .pipe(
        mergeMap(id => {
          if (id) {
            // Update product
            return this.productService.update({ id, changes: { ...product } })
          } else {
            // Add new product
            return this.productService.add(product)
          }
        }),
        tap(res => {
          console.log(res)
          this.isSuccess = res.message === messages.SUCCESS ? true : false
          this._showMessage()
        }),
        catchError(error => {
          console.log('error', error)
          return of(error)
        }),
        take(1)
      )
      .subscribe()
  }

  private _showMessage() {
    this.showMessage = true

    setTimeout(() => {
      this.showMessage = false
      this.router.navigate(['/admin/products'])
    }, 1000)
  }

  delete() {
    if (confirm('Are you sure to delete the product?')) {
      this.productService.delete(this.id).subscribe(() => {
        this.router.navigate(['/admin/products'])
      })
    }
  }
}

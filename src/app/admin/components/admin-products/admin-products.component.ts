import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as _ from 'lodash'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { Product } from 'shared/models/product.model'
import { ProductService } from '../../../core/services/product.service'
import { Page, PageUtil } from '../../../helpers/paging-util'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[]
  filteredProducts: Product[]
  subscription: Subscription
  pageUtil: PageUtil
  page: Page
  toggleDirection: boolean
  showSortIconHover: boolean = false
  showSortIconClick: boolean = false
  sortProperty: string

  ngOnInit(): void {
    this.getProducts()
  }

  constructor(private router: Router, private productService: ProductService) {}

  deleteProduct(id) {
    if (confirm('Are you sure to delete the product?')) {
      this.productService.delete(id).subscribe(() => {
        this.getProducts()
      })
    }
  }

  getProducts() {
    this.subscription = this.productService
      .getAll()
      .pipe(take(1))
      .subscribe(products => {
        this.products = products

        this.filteredProducts = products

        this.pageUtil = new PageUtil(5, this.filteredProducts)
        this.page = this.pageUtil.getPage(1)
      })
  }

  filter(query: string) {
    // filter function return a new array
    this.filteredProducts = this.products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    )

    // update page
    this.pageUtil.setSource(this.filteredProducts)
    this.page = this.pageUtil.getPage(1)
  }

  sort(property: string) {
    this.sortProperty = property
    this.showSortIconHover = false
    this.showSortIconClick = true

    this.toggleDirection = !this.toggleDirection
    if (this.toggleDirection) {
      this.filteredProducts = _.orderBy(this.filteredProducts, property, 'asc')
    } else {
      this.filteredProducts = _.orderBy(this.filteredProducts, property, 'desc')
    }

    // update page
    this.pageUtil.setSource(this.filteredProducts)
    this.page = this.pageUtil.getPage(1)
  }

  mouseoverThead() {
    if (this.showSortIconClick === false) {
      this.showSortIconHover = true
    }
  }

  mouseoutThead() {
    if (this.showSortIconClick === false) {
      this.showSortIconHover = false
    }
  }
}

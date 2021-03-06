import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../../core/services/category.service'
import { Observable } from 'rxjs'
import { Category } from 'shared/models/category.model'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<Category[]>
  selectedCategory: string = 'All'

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
    this.selectedCategory = this.route.snapshot.queryParamMap.get('category') || 'All'

    this.categories$ = categoryService.getAll()
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category
  }
}

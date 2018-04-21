import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../services/category.service'
import { Observable } from 'rxjs'
import { Category } from '../models/category'

@Component({
	selector: 'app-product-filter',
	templateUrl: './product-filter.component.html',
	styleUrls: [ './product-filter.component.css' ]
})
export class ProductFilterComponent {
	categories$: Observable<Category[]>
	selectedCategory: string = 'All'

	constructor(private categoryService: CategoryService) {
		this.categories$ = categoryService.getAll()
	}

	setSelectedCategory(category: string) {
		this.selectedCategory = category
	}
}

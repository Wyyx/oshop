import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'
import * as _ from 'lodash'
import { Category } from 'shared/models/category'

@Injectable()
export class CategoryService {
	constructor(private authHttp: AuthHttp) {}

	getAll() {
		return this.authHttp.get('/api/categories').map(response => {
			let arr = <Category[]>response.json()
			return _.sortBy(arr, 'name')
		})
	}
}

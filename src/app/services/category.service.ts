import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'
import * as _ from 'lodash'

@Injectable()
export class CategoryService {
	constructor(private authHttp: AuthHttp) {}

	getCategories() {
		return this.authHttp.get('/api/categories').map(response => {
			let arr = <string[]>response.json()
			return _.sortBy(arr)
		})
	}
}

import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'

@Component({
	selector: 'app-lab',
	templateUrl: './lab.component.html',
	styleUrls: [ './lab.component.css' ]
})
export class LabComponent implements OnInit {
	_totalYears: number

	items = [
		{ name: 'houdini', age: 300 },
		{ name: 'maya', age: 250 },
		{ name: 'cinema4d', age: 190 }
	]

	cartService = {
		cart: {
			id: 1,
			items: [
				{ name: 'houdini', age: 30 },
				{ name: 'maya', age: 25 },
				{ name: 'cinema4d', age: 19 }
			]
		}
	}

	cart2 = {
		id: 2,
		items: [
			{ name: 'houdini', age: 2 },
			{ name: 'maya', age: 1 },
			{ name: 'cinema4d', age: 6 }
		]
	}

	constructor() {}

	ngOnInit() {
		this.items = this.cartService.cart.items
	}

	pushItem() {
		this.items.push({ name: '3dmax', age: 28 })
	}

	popItem() {
		this.items.pop()
	}

	modifyAgeOfOneItem() {
		this.items[0].age += 100
	}

	copyCart2ToCart() {
		console.log('before copy')
		console.log('cart:', this.cartService.cart.items[0].age)

		// shallow copy

		// Object.assign(this.cart, this.cart2)

		// for (var prop in this.cart2) {
		// 	if (this.cart.hasOwnProperty(prop)) {
		// 		this.cart[prop] = this.cart2[prop]
		// 	}
		// }

		// deep copy
		// this.cart = _.cloneDeep(this.cart2)

		this.cartService.cart = this.cart2

		console.log('after copy')
		console.log('cart:', this.cartService.cart.items[0].age)

		console.log('this.items:', this.items)
	}

	get totalYears() {
		return this.cartService.cart.items.map(x => x.age).reduce((accum, value) => accum + value)
	}
}

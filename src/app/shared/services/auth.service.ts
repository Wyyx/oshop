import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'
import 'rxjs/add/operator/map'
import { Router } from '@angular/router'
import { User } from 'shared/models/user'

@Injectable()
export class AuthService {
	constructor(private http: Http, private router: Router) {}

	login(credentials) {
		const headers = new Headers()
		headers.set('Content-Type', 'application/json')

		return this.http
			.post('/api/authenticate', JSON.stringify(credentials), { headers })
			.map(response => {
				let result = response.json()
				if (result && result.token) {
					localStorage.setItem('token', result.token)
					return true
				} else return false
			})
	}

	logout() {
		localStorage.removeItem('token')
		this.router.navigate([ '/' ])
	}

	isLoggedIn() {
		// way 2
		return tokenNotExpired()

		// // way 1
		// let jwtHelper = new JwtHelper()
		// let token = localStorage.getItem('token')

		// if (!token) {
		// 	return false
		// }

		// let isExpired = jwtHelper.isTokenExpired(token)
		// return !isExpired
	}

	get user(): User {
		let token = localStorage.getItem('token')

		if (!token) return null

		// return playload in token
		return new JwtHelper().decodeToken(token)
	}

	isAdmin() {
		return this.user ? this.user.admin : false
	}
}

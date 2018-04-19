import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
	// admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6dHJ1ZX0.Az8U4HBH7f4Xh25MMYyg58105ZVVXjEOAn1mZuH7wfo
	// not admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6ZmFsc2V9.77je6FjlslNxGswq5fLGpD4kMSDSzpKjc8wKJNDJe8o
	let token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6dHJ1ZX0.Az8U4HBH7f4Xh25MMYyg58105ZVVXjEOAn1mZuH7wfo'

	backend.connections.subscribe((connection: MockConnection) => {
		// We are using the setTimeout() function to simulate an
		// asynchronous call to the server that takes 1 second.
		setTimeout(() => {
			//
			// Fake implementation of /api/authenticate
			//
			if (
				connection.request.url.endsWith('/api/authenticate') &&
				connection.request.method === RequestMethod.Post
			) {
				let body = JSON.parse(connection.request.getBody())

				if (body.email === 'gnehcyx@163.com' && body.password === '1234') {
					connection.mockRespond(
						new Response(
							new ResponseOptions({
								status: 200,
								body: { token: token }
							})
						)
					)
				} else {
					connection.mockRespond(new Response(new ResponseOptions({ status: 401 })))
				}
			}

			//
			// Fake implementation of /api/orders
			//
			if (
				connection.request.url.endsWith('/api/orders') &&
				connection.request.method === RequestMethod.Get
			) {
				if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
					connection.mockRespond(
						new Response(new ResponseOptions({ status: 200, body: [ 1, 2, 3 ] }))
					)
				} else {
					connection.mockRespond(new Response(new ResponseOptions({ status: 401 })))
				}
			}

			// Fake implementation of /api/categories
			if (
				connection.request.url.endsWith('/api/categories') &&
				connection.request.method === RequestMethod.Get
			) {
				if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
					connection.mockRespond(
						new Response(
							new ResponseOptions({
								status: 200,
								body: [
									'Bread',
									'Dairy',
									'Fruits',
									'Vegetables',
									'Seasonings and Spices'
								]
							})
						)
					)
				} else {
					connection.mockRespond(new Response(new ResponseOptions({ status: 401 })))
				}
			}
		}, 1000)
	})

	return new Http(backend, options)
}

export let fakeBackendProvider = {
	provide: Http,
	useFactory: fakeBackendFactory,
	deps: [ MockBackend, BaseRequestOptions ]
}

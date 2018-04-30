import { Injectable } from '@angular/core'
import {
	CanActivate,
	Route,
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router'
import { AuthService } from 'shared/services/auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log('in AuthGuardService')

		if (this.authService.isLoggedIn()) return true

		this.router.navigate([ '/login' ], {
			queryParams: {
				returnUrl: state.url
			}
		})
		return false
	}
}

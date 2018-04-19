import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class AdminAuthGuardService implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log('in AdminAuthGuardService')

		let user = this.authService.currentUser
		if (user && user.admin) return true

		this.router.navigate([ '/no-access' ])
		return false
	}
}

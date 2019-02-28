import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'
import { tap } from 'rxjs/operators'

@Injectable()
export class AdminAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('in AdminAuthGuardService')

    return this.authService.isAdmin$.pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/no-access'])
        }
      })
    )
  }
}

import { AuthService } from '../../../core/services/auth.service'
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { tap, take, mergeMap, mergeMapTo } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = 'gnehcyx@163.com'
  password: string = '123456'
  invalidLogin: boolean = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/')
      }
    })
  }

  signIn(credentials) {
    this.authService
      .login(credentials)
      .pipe(
        mergeMapTo(this.authService.isLoggedIn$),
        tap(isLoggedIn => {
          if (isLoggedIn) {
            const url = this.route.snapshot.queryParamMap.get('returnUrl')
            this.router.navigate([url || '/'])
          } else {
            this.invalidLogin = true
          }
        }),
        take(1)
      )
      .subscribe()
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { map, tap } from 'rxjs/operators'
import { User } from 'shared/models/user.model'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class AuthService {
  tokenSubject$: BehaviorSubject<string>
  user$: Observable<User>
  isAdmin$: Observable<boolean>
  isLoggedIn$: Observable<boolean>

  constructor(private http: HttpClient, private router: Router, private jwt: JwtHelperService) {
    this.tokenSubject$ = new BehaviorSubject<string>(null)
    this.user$ = this.tokenSubject$.asObservable().pipe(map(token => this.jwt.decodeToken(token)))
    this.isAdmin$ = this.user$.pipe(map(user => (user ? user.admin : false)))
    this.isLoggedIn$ = this.tokenSubject$.pipe(map(token => !this.jwt.isTokenExpired(token)))
    this.autoLogin()
  }

  login(credentials: { email: string; password: string }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http
      .post<{ token: string }>('/api/authenticate', JSON.stringify(credentials), { headers })
      .pipe(
        map(({ token }) => {
          if (token) {
            localStorage.setItem('token', token)
            this.tokenSubject$.next(token)
          }
        })
      )
  }

  logout() {
    localStorage.removeItem('token')
    this.tokenSubject$.next(null)
    this.router.navigate(['/'])
  }

  autoLogin() {
    const token = localStorage.getItem('token')

    if (token) {
      this.tokenSubject$.next(token)
    }
  }
}

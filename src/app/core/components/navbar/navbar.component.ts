import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, AfterViewInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { CartService } from '../../services/cart.service'
import { Cart } from 'shared/models/cart.model'
import { Observable } from 'rxjs'
import { User } from 'shared/models/user.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$: Observable<User>
  isLoggedIn$: Observable<boolean>
  isAdmin$: Observable<boolean>
  totalQuantity$: Observable<number>

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.user$ = this.authService.user$
    this.isLoggedIn$ = this.authService.isLoggedIn$
    this.isAdmin$ = this.authService.isAdmin$
    this.totalQuantity$ = this.cartService.totalQuantity$
  }

  logout() {
    this.authService.logout()
  }
}

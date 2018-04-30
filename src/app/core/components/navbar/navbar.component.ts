import { Component, OnInit } from '@angular/core'
import { AuthService } from 'shared/services/auth.service'
import { ShoppingCartService } from 'shared/services/shopping-cart.service'
import { ShoppingCart } from 'shared/models/shopping-cart'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent {
	constructor(private authService: AuthService, private cartService: ShoppingCartService) {}
}

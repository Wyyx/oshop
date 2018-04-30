import { HttpModule } from '@angular/http'
import { CustomFormsModule } from 'ng2-validation'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AuthHttp, provideAuth } from 'angular2-jwt'
import { ProductCardComponent } from 'shared/components/product-card/product-card.component'
import { QuantitySelectorComponent } from 'shared/components/quantity-selector/quantity-selector.component'
import { AuthService } from 'shared/services/auth.service'
import { CategoryService } from 'shared/services/category.service'
import { OrderService } from 'shared/services/order.service'
import { ProductService } from 'shared/services/product.service'
import { AuthGuardService } from './services/auth-guard.service'
import { ShoppingCartService } from './services/shopping-cart.service'
import { RouterModule } from '@angular/router'

@NgModule({
	imports: [ CommonModule, RouterModule, FormsModule, CustomFormsModule, NgbModule.forRoot() ],
	declarations: [ ProductCardComponent, QuantitySelectorComponent ],
	providers: [
		AuthService,
		AuthGuardService,
		HttpModule,
		AuthHttp,
		provideAuth({
			headerName: 'Authorization',
			headerPrefix: 'Bearer',
			tokenName: 'token',
			tokenGetter: () => localStorage.getItem('token'),
			globalHeaders: [ { 'Content-Type': 'application/json' } ],
			noJwtError: true
		}),
		CategoryService,
		ProductService,
		ShoppingCartService,
		OrderService
	],
	exports: [
		ProductCardComponent,
		QuantitySelectorComponent,
		CommonModule,
		RouterModule,
		FormsModule,
		CustomFormsModule,
		HttpModule,
		NgbModule.forRoot().ngModule
	]
})
export class SharedModule {}

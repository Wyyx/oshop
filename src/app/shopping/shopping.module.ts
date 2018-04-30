import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { AuthGuardService } from './../shared/services/auth-guard.service'
import { SharedModule } from './../shared/shared.module'
import { CheckOutComponent } from './components/check-out/check-out.component'
import { MyOrdersComponent } from './components/my-orders/my-orders.component'
import { OrderDetailComponent } from './components/order-detail/order-detail.component'
import { OrderSuccessComponent } from './components/order-success/order-success.component'
import { OrderSummaryComponent } from './components/order-summary/order-summary.component'
import { ProductDetailComponent } from './components/product-detail/product-detail.component'
import { ProductFilterComponent } from './components/product-filter/product-filter.component'
import { ProductsComponent } from './components/products/products.component'
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component'
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{ path: 'products', component: ProductsComponent, canActivate: [ AuthGuardService ] },
			{
				path: 'shopping-cart',
				component: ShoppingCartComponent
			},
			{ path: 'my-orders', component: MyOrdersComponent, canActivate: [ AuthGuardService ] },
			{
				path: 'my-orders/:id',
				component: OrderDetailComponent,
				canActivate: [ AuthGuardService ]
			},
			{
				path: 'products/:id',
				component: ProductDetailComponent,
				canActivate: [ AuthGuardService ]
			},
			{ path: 'check-out', component: CheckOutComponent, canActivate: [ AuthGuardService ] },
			{
				path: 'order-success',
				component: OrderSuccessComponent,
				canActivate: [ AuthGuardService ]
			}
		])
	],
	declarations: [
		ProductsComponent,
		ShoppingCartComponent,
		CheckOutComponent,
		OrderSuccessComponent,
		MyOrdersComponent,
		ShippingFormComponent,
		OrderSummaryComponent,
		ProductFilterComponent,
		OrderDetailComponent,
		ProductDetailComponent
	],
	exports: [ ProductsComponent ]
})
export class ShoppingModule {}

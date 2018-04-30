import { ShoppingModule } from './../shopping/shopping.module'
import { HomeComponent } from './components/home/home.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from './../shared/shared.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ProductsComponent } from './../shopping/components/products/products.component'
import { NoAccessComponent } from './components/no-access/no-access.component'
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
	imports: [
		SharedModule,
		ShoppingModule,
		RouterModule.forChild([
			{
				path: 'index',
				component: HomeComponent
			},
			{
				path: 'no-access',
				component: NoAccessComponent
			}
		])
	],
	declarations: [ NoAccessComponent, NavbarComponent, HomeComponent ],
	exports: [ NavbarComponent ]
})
export class CoreModule {}

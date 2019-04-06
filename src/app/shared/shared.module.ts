import { CustomFormsModule } from 'ng2-validation'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductCardComponent } from 'shared/components/product-card/product-card.component'
import { QuantitySelectorComponent } from 'shared/components/quantity-selector/quantity-selector.component'
import { AuthService } from '../core/services/auth.service'
import { CategoryService } from '../core/services/category.service'
import { OrderService } from '../core/services/order.service'
import { ProductService } from '../core/services/product.service'
import { AuthGuardService } from '../core/services/auth-guard.service'
import { CartService } from '../core/services/cart.service'
import { RouterModule } from '@angular/router'
import { MyDate } from './pipes/my-date.pipe'

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, CustomFormsModule],
  declarations: [ProductCardComponent, QuantitySelectorComponent, MyDate],
  providers: [
    AuthService,
    AuthGuardService,
    CategoryService,
    ProductService,
    CartService,
    OrderService
  ],
  exports: [
    ProductCardComponent,
    QuantitySelectorComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    CustomFormsModule
  ]
})
export class SharedModule {}

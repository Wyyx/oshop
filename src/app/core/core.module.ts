import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { JwtModule } from '@auth0/angular-jwt'
import { SharedModule } from './../shared/shared.module'
import { ShoppingModule } from './../shopping/shopping.module'
import { HomeComponent } from './components/home/home.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { NoAccessComponent } from './components/no-access/no-access.component'

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  imports: [
    SharedModule,
    ShoppingModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'index',
        component: HomeComponent
      },
      {
        path: 'no-access',
        component: NoAccessComponent
      }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    })
  ],
  declarations: [NoAccessComponent, NavbarComponent, HomeComponent],
  exports: [NavbarComponent, JwtModule]
})
export class CoreModule {}

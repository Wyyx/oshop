import { FormsModule } from '@angular/forms'
import { SharedModule } from './../shared/shared.module'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component'

@NgModule({
  imports: [SharedModule, RouterModule.forChild([{ path: 'login', component: LoginComponent }])],
  declarations: [LoginComponent]
})
export class MembershipModule {}

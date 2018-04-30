import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { AdminModule } from './admin/admin.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './core/components/home/home.component'
import { CoreModule } from './core/core.module'
import { LabModule } from './lab/lab.module'
import { MembershipModule } from './membership/membership.module'
import { SharedModule } from './shared/shared.module'
import { ShoppingModule } from './shopping/shopping.module'

// // Internationalization
// import { registerLocaleData } from '@angular/common'
// import localeZh from '@angular/common/locales/zh-Hans'
// registerLocaleData(localeZh)

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		RouterModule.forRoot([ { path: '', component: HomeComponent } ]),
		SharedModule,
		AdminModule,
		ShoppingModule,
		CoreModule,
		MembershipModule,
		LabModule
	],
	providers: [
		// { provide: LOCALE_ID, useValue: 'zh-Hans' }
		// // For creating a mock back-end. You don't need these in a real app.
		// fakeBackendProvider,
		// MockBackend,
		// BaseRequestOptions
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

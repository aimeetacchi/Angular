import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { Err404Component } from '../components/err404/err404.component';

// Create Routes
const routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
        path: 'home/:customerid',
        component: HomeComponent,
    },
	{
        path: 'err404',
        component: Err404Component,
    },
	{
		path: '**',
      redirectTo: 'err404',
      pathMatch: 'full'
  }
];

@NgModule({
	exports: [
		RouterModule
	],
	imports: [
		RouterModule.forRoot(routes),
	],
	providers: []
})
export class RoutingModule {}
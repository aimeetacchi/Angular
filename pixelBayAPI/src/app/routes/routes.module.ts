import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePgComponent } from '../components/home-pg/home-pg.component';
import { Err404Component } from '../components/err404/err404.component';

// Create Routes
const routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
        path: 'home',
        component: HomePgComponent,
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
export class RoutesModule {}

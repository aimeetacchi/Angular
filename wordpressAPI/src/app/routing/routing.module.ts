import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PgBuilderComponent } from '../components/pg-builder/pg-builder.component';
import { Err404Component } from '../components/err404/err404.component';

// Create Routes
const routes = [
	{
		path: '',
		redirectTo: ':slug',
		pathMatch: 'full'
	},
    {
        path: 'err404',
        component: Err404Component,
	},
	{
        path: ':slug',
        component: PgBuilderComponent,
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

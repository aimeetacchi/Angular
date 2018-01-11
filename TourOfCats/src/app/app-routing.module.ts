import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { CatsComponent }      from './cats/cats.component';
import { CatDetailComponent }  from './cat-detail/cat-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{path: 'cats', component: CatsComponent},
	{path: 'dashboard', component: DashboardComponent},
	{ path: 'detail/:id', component: CatDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {}
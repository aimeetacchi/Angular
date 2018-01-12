import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
// HttpClientModule 
import {HttpClientModule} from '@angular/common/http';

// ROUTES - NAVIGATION
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';

// SERVICE
import { DataService } from './services/data.service';


const appRoutes: Routes = [
  {path:'', component:UserComponent, pathMatch: 'full'},
  {path:'about', component:AboutComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

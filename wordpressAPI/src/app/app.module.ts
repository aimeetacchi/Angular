import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';

// Components ===
import { AppComponent } from './app.component';
import { PgBuilderComponent } from './components/pg-builder/pg-builder.component';
import { Err404Component } from './components/err404/err404.component';

// Services =====
import { DataService } from './services/data.service';
// Custom Pipe ----
import { ReversePipe } from './pipes/reverseArr.pipe';
import { StripHTMLPipe } from './pipes/stripHTML.pipe'
// Routing ========
import { RoutingModule } from './routing/routing.module';

import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PgBuilderComponent,
    Err404Component,
    HeaderComponent,
    ReversePipe,
    StripHTMLPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

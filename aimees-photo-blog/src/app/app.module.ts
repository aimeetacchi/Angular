import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryEntryService } from './server';

// Components ---
import { AppComponent } from './app.component';
import { EntryComponent } from './components/entries/entry/entry.component';
import { EntryListComponent } from './components/entries/entry-list/entry-list.component';

// Services ----
import { EntryService } from './services/entry.service';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryEntryService)
  ],
  providers: [EntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

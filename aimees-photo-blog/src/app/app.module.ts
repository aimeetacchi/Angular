import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {HttpClientModule } from '@angular/common/http';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


// Components ---
import { AppComponent } from './app.component';
import { EntryComponent } from './components/entries/entry/entry.component';
import { EntryListComponent } from './components/entries/entry-list/entry-list.component';
import { EntryCommentFormComponent } from './components/entries/entry/entry-comment-form.component'
// Services ----
import { EntryService } from './services/entry.service';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntryListComponent,
    EntryCommentFormComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule
    // HttpClientModule,
    // InMemoryWebApiModule.forRoot(InMemoryEntryService)
  ],
  providers: [EntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

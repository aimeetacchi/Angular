import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Entry } from '../entry.model';
//Set up headers
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');


@Injectable()
export class EntryService {
  private entriesUrl = 'app/entries' // URL to web API
  entries: Entry;
  constructor(private http: HttpClient) {}

  // Get Entries from the FAKE Server - server.ts 
  
  getEntries() {
    this.http.get(this.entriesUrl).subscribe(res => {
      this.entries = res.
  });
}



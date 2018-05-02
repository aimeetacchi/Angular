import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//Set up headers
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');


@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

    // Send Data to Rolling star ---
    submitPreferences(data){
      return this.http.post('http://localhost:4000/add-prefs', data, {headers: headers})
    }
}

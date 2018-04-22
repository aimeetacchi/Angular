import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//Set up headers -- set them up here then you don't need to call them in each function.
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    // URL To pixelBay
    let url = 'https://pixabay.com/api/'
    let apiKey = '8763900-762b50258270437a827746f4b';

    return this.http.get(`${url}?key=${apiKey}/&q=cats`)

  }
}

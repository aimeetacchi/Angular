import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//Set up headers -- set them up here then you don't need to call them in each function.
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');

@Injectable()
export class DataService {

  constructor(
  	private http: HttpClient) { }

// ====================
// Get WORDPRESS JSON DATA
// ====================

  getData(pageID, customCat) {
  	// Change the url to a domain when live. =====
  	return this.http.get('http://localhost:4000/api/getdata', {params: {pageID: pageID, customCat: customCat}, headers });

  }
// ====================
// Get WORDPRESS JSON MENU DATA
// ====================
  getMenu (){
    return this.http.get('http://localhost:4000/api/getmenu', { headers });
  }

}

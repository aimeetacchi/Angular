import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//Set up headers
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');


@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

    // GET CUSTOMER with Customer ID
    getCustomerData(customerId){
      const body = {
        'customerNumber': customerId,
      };
      // Pass all that info to the Server Side, then once it's process there return it.
      return this.http.post('http://localhost:4000/fetch-customer-data', body, {headers: headers})
    }


    // Send Data to Rolling star ---
    submitPreferences(data){
      return this.http.post('http://localhost:4000/add-prefs', data, {headers: headers})
    }
}

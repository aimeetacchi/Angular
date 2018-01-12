import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// HTTP
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
	// Observable
	//data: Observable<Array<any>>;

  constructor(public http: HttpClient) {
	console.log('Data service connected...');
  }

  getUsers(){
  	return this.http.get('https://jsonplaceholder.typicode.com/users')
 
  }

  // Observables ===========
  // getData(){
  // 	this.data = new Observable(observer => {
  // 		setTimeout(() => {
  // 			observer.next([1]);
  // 		}, 1000);

  // 		setTimeout(() => {
  // 			observer.next([1,2]);
  // 		}, 2000);

  // 		setTimeout(() => {
  // 			observer.next([1,2,3]);
  // 		}, 3000);

  // 		setTimeout(() => {
  // 			observer.next([1, 2, 3, 'Hello']);
  // 		}, 4000);

  // 		setTimeout(() => {
  // 			observer.complete();
  // 		}, 5000);
  // 	});

  // 	return this.data;
  // }



}

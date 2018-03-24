import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";

import { Log } from "../models/Log";

@Injectable()
export class LogService {
	logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  //stateClear
  private stateSource = new BehaviorSubject<boolean> (true);
  stateClear = this.stateSource.asObservable();

  constructor() {
  	// this.logs = [
  	// 	{
  	// 		id: '1',
  	// 		text: 'Generated components',
  	// 		date: new Date('12/26/2017 12:54:23')
  	// 	},
  	// 	{
  	// 		id: '2',
  	// 		text: 'Added bootstrap',
  	// 		date: new Date('12/27/2017 9:54:23')
  	// 	},
  	// 	{
  	// 		id: '3',
  	// 		text: 'Added Login',
  	// 		date: new Date('12/28/2017 12:30:23')
  	// 	},

  	// ]
    this.logs = [];
  }

  getLogs(): Observable<Log[]>{

    if(localStorage.getItem('logs') === null){
      this.logs = [];
    } else {
     this.logs = JSON.parse(localStorage.getItem('logs'));
    }

  	return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));

  }

  setFormLog(log: Log){
    this.logSource.next(log)
  }

  addLog(log: Log){
    this.logs.unshift(log);

    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log){
    this.logs.forEach((cur, index) => {
        if(log.id === cur.id){
          // remove the el from the current array
            this.logs.splice(index, 1);
        }
    });
    // add the updated version.
    this.logs.unshift(log);

    // Update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
        if(log.id === cur.id){
          // remove the el from the current array
            this.logs.splice(index, 1);
        }
    });

    // delete to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }



}

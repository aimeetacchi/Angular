import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Cat } from './cat';
import { CATS } from './mock-cats';

// Service ===
import { MessageService } from './message.service';

@Injectable()
export class CatService {

	constructor(private messageService: MessageService) { }
	
	getCats(): Observable<Cat[]> {
		//Todo: send the message _after_ fetching the cats
		this.messageService.add('CatService: fetched cats');
	  return of(CATS);
	}
	
	getCat(id: number): Observable<Cat> {
		//Todo: send the message _after_ fetching the cat
		  this.messageService.add(`CatService: fetched cat id=${id}`);
  		return of(CATS.find(cat => cat.id === id));
	}

  

}

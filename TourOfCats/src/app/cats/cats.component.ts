import { Component, OnInit } from '@angular/core';

import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
	
	cats: Cat[];
	
	constructor(private catService: CatService) {}

	ngOnInit() {
		// Call the function here.
  		this.getCats();
  	}

  	// function/method that gets the cats from the service.
	getCats(): void {
	  	this.catService.getCats().subscribe(cats => this.cats = cats);
	}


}

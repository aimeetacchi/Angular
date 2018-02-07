import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: []
})
export class FeaturedProductsComponent  {
	title = 'Featured Products';
	items: object[];

	featuredItems: object[];

	constructor(public dataService: DataService){
		// Calling the getStock function from the service and storing it in a new items array.
		this.items = this.dataService.getStock();
	}

	ngOnInit(){

		this.featuredItems = this.items.filter(function(item){
				return item['featured'] === true;
		})

		console.log(this.featuredItems)
	}


}

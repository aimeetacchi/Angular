import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
	title = "Our Stock";
	
	// Variables for Stock/Items
	items: object[];
	total: number = 0;

	constructor(public dataService: DataService){
		// Calling the getStock function from the service and storing it in a new items array.
		this.items = this.dataService.getStock();
	}

  ngOnInit(){}

  // Buy Item Function -----
  buyItem(item){
  		//console.log(item);
      if(item.featured != true) {
        this.total += item.price;
        console.log(this.total);
        item.quantity -=1;
        item.itemSold +=1;
        console.log(item.itemSold);
    } else {
        this.total += item.featuredPrice;
        console.log(this.total);
        item.quantity -=1;
        item.itemSold +=1;
        console.log(item.itemSold);	
  	}
  }

  // Remove Item Function ---
  removeItem(item){

    if(item.featured != true) {
        console.log(item.price)
        this.total -= item.price;
        item.quantity +=1;
        item.itemSold -=1;
    } else {
        console.log(item.featuredPrice)
        this.total -= item.featuredPrice;
        item.quantity +=1;
        item.itemSold -=1;
    }
  	
  }

}
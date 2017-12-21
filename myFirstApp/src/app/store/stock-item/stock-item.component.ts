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
  		this.total += item.price;
  		console.log(this.total);
  		item.itemSold +=1;
  		console.log(item.itemSold);
  	}

  // Remove Item Function ---
  removeItem(item){
  	console.log(item.price)
	this.total -= item.price;
	item.itemSold -=1;
  }

}
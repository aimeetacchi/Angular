import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
	title = "Our Stock";

	items: Stock[] = [
	{id: 1,
	title: 'Shoes',
	quantity: 5,
	price: 15,
	description: 'These shoes are one of a kind in size 6, they are blue',
	sold: false},
	{id: 2,
	title: 'Cat Tshirt',
	quantity: 10,
	price: 5,
	description: 'Womens cat tshirt for all them cat lovers',
	sold: false},
	{id: 3,
	title: 'Pokemon Tshirt',
	quantity: 4,
	price: 4,
	description: 'Adults Pikachu Tshirt for all those fans',
	sold: false},
	{id: 4,
	title: 'Totoro Tshirt',
	quantity: 4,
	price: 4,
	description: 'Adults Totoro Tshirt for all those fans',
	sold: false},
	{id: 5,
	title: 'Sonic Tshirt',
	quantity: 0,
	price: 4,
	description: 'Adults Sonic Tshirt for all those fans',
	sold: true},
	{id: 6,
	title: 'Sonic Socks',
	quantity: 4,
	price: 2,
	description: 'Adults Sonic Socks for all those fans',
	sold: false}]
  	
	sold: any[] = [];
	total: number = 0;
  constructor(
  	){}

  ngOnInit() {
  	console.log(this.items);
  }



  public buyItem(item){
  		//console.log(item);
  		this.total += item.price;
  		console.log(this.total);

  	}

}

interface Stock {
	id: number;
	title: string;
	quantity: number;
	price: number;
	description: string;
	sold: boolean;
}

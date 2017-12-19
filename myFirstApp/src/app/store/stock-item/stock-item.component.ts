import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
	title = "Our Stock";

	items: Stock[] = [
	{title: 'Shoes',
	quantity: 5,
	description: 'These shoes are one of a kind in size 6, they are blue',
	sold: false},
	{title: 'Cat Tshirt',
	quantity: 10,
	description: 'Womens cat tshirt for all them cat lovers',
	sold: false},
	{title: 'Pokemon Tshirt',
	quantity: 4,
	description: 'Adults Pikachu Tshirt for all those fans',
	sold: false},
	{title: 'Totoro Tshirt',
	quantity: 4,
	description: 'Adults Totoro Tshirt for all those fans',
	sold: false}
	{title: 'Sonic Tshirt',
	quantity: 0,
	description: 'Adults Sonic Tshirt for all those fans',
	sold: true}
	{title: 'Sonic Socks',
	quantity: 4,
	description: 'Adults Sonic Socks for all those fans',
	sold: false}]
  
  constructor(
  	){}

  ngOnInit() {
  	console.log(this.items);
  }

}

interface Stock {
	title: string;
	quantity: number;
	description: string;
	sold: boolean;
}

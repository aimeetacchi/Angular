import { Injectable } from '@angular/core';


@Injectable()
export class DataService {


	items: Stock[] = [
	{id: 1,
	title: 'Shoes',
	quantity: 10,
	price: 15,
	description: 'Lovely stylish pair of shoes. Size: 6, Color: Blue',
	inStock: true,
	itemSold: 0},
	{id: 2,
	title: 'Cat Tshirt',
	quantity: 10,
	price: 5,
	description: 'Womens cat tshirt for all them cat lovers',
	inStock: true,
	itemSold: 0},
	{id: 3,
	title: 'Pokemon Tshirt',
	quantity: 10,
	price: 4,
	description: 'Adults Pikachu Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 4,
	title: 'Totoro Tshirt',
	quantity: 10,
	price: 4,
	description: 'Adults Totoro Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 5,
	title: 'Sonic Tshirt',
	quantity: 10,
	price: 4,
	description: 'Adults Sonic Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 6,
	title: 'Sonic Socks',
	quantity: 10,
	price: 2,
	description: 'Adults Sonic Socks for all those fans',
	inStock: true,
	itemSold: 0}]

	getStock(){
		return this.items;
	}


}

interface Stock {
	id: number;
	title: string;
	quantity: number;
	price: number;
	description: string;
	inStock: boolean;
	itemSold: number;
}

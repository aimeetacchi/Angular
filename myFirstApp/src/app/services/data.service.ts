import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

	// Creating an Array from the Stock Interface ---
	items: Stock[] = [
	{id: 1,
	title: 'Nike Trainers',
	img: '../../assets/images/blueNikeShoes.jpg',
	quantity: 10,
	price: 25,
	featured: true,
	description: 'Lovely stylish pair of Nike trainers. Size: 6, Color: Blue',
	inStock: true,
	itemSold: 0},
	{id: 2,
	title: 'Cat Tshirt',
	img: '../../assets/images/cat-tshirt.jpg',
	quantity: 10,
	price: 5,
	featured: true,
	description: 'Womens cat tshirt for all them cat lovers',
	inStock: true,
	itemSold: 0},
	{id: 3,
	title: 'Adults Pokemon Tshirt',
	img: '../../assets/images/pokemon-tshirt.jpg',
	quantity: 10,
	price: 4,
	featured: false,
	description: 'Adults Pikachu Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 4,
	title: 'Adults Totoro Tshirt',
	img: '../../assets/images/totoro-tshirt.jpg',
	quantity: 10,
	price: 4,
	featured: true,
	description: 'Adults Totoro Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 5,
	title: 'Adults Sonic Tshirt',
	img: '../../assets/images/sonic-tshirt.jpg',
	quantity: 10,
	price: 4,
	featured: true,
	description: 'Adults Sonic Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 6,
	title: 'Adults Sonic Socks',
	img: '../../assets/images/sonic-socks.jpg',
	quantity: 10,
	price: 2,
	featured: false,
	description: 'Adults Sonic Socks for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 7,
	title: 'Football Shirt',
	img: '../../assets/images/football-tshirt.jpg',
	quantity: 10,
	price: 9,
	featured: false,
	description: 'For all the football fans',
	inStock: true,
	itemSold: 0},
	]


	// Function to return the array of items.
	getStock(){
		return this.items;
	}


}


// Interface for Stock/Items - Could be put in it's own file and imported in.
interface Stock {
	id: number;
	title: string;
	img: string;
	quantity: number;
	price: number;
	featured: boolean;
	description: string;
	inStock: boolean;
	itemSold: number;
}

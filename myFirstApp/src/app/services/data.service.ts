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
	featuredPrice: 15,
	description: 'Lovely stylish pair of Nike trainers. Size: 6, Color: Blue',
	inStock: true,
	itemSold: 0},
	{id: 2,
	title: 'Cat Tshirt',
	img: '../../assets/images/cat-tshirt.jpg',
	quantity: 10,
	price: 8,
	featured: true,
	featuredPrice: 5,
	description: 'Womens cat tshirt for all them cat lovers',
	inStock: true,
	itemSold: 0},
	{id: 3,
	title: 'Adults Pokemon Tshirt',
	img: '../../assets/images/pokemon-tshirt.jpg',
	quantity: 10,
	price: 23,
	featured: false,
	featuredPrice: 12.50,
	description: 'Adults Pikachu Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 4,
	title: 'Adults Totoro Tshirt',
	img: '../../assets/images/totoro-tshirt.jpg',
	quantity: 10,
	price: 23,
	featured: true,
	featuredPrice: 12.50,
	description: 'Adults Totoro Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 5,
	title: 'Adults Sonic Tshirt',
	img: '../../assets/images/sonic-tshirt.jpg',
	quantity: 10,
	price: 23,
	featured: true,
	featuredPrice: 12.50,
	description: 'Adults Sonic Tshirt for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 6,
	title: 'Adults Sonic Socks',
	img: '../../assets/images/sonic-socks.jpg',
	quantity: 10,
	price: 6.99,
	featured: false,
	featuredPrice: 3.50,
	description: 'Adults Sonic Socks for all those fans',
	inStock: true,
	itemSold: 0},
	{id: 7,
	title: 'Football Shirt',
	img: '../../assets/images/football-tshirt.jpg',
	quantity: 3,
	price: 39,
	featured: false,
	featuredPrice: 25.50,
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
	featuredPrice: number;
	description: string;
	inStock: boolean;
	itemSold: number;
}

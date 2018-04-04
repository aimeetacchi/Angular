import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: []
})
export class StoreComponent implements OnInit {
	title = "Store";
  	itemsObj: object = {};
    cart: boolean = false;
  	constructor() { }

  ngOnInit() {

  }

  // passing through the object (item) from the store component to the parent.
  viewCart(e: object){
  	console.log('Data passed to parent.')
    this.itemsObj = e;
    console.log(this.itemsObj);
  	
  }

  showCart(e: boolean){
    this.cart = e;
    console.log(this.cart)
  }
}

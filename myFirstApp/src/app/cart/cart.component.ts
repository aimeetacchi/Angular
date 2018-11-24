import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
  // Inputs from the parent ---
  @Input() itemObj: any = {};
  @Input() cart: boolean;
   
  itemsAdded: boolean;

  itemTitle: string;
  itemPrice: string;
  constructor() { 
  }

  ngOnInit() {
  // console.log(this.cart)
  // console.log(this.itemObj);
  }

  ngOnChanges(changes: SimpleChanges){
  
	  console.log(this.cart)
	  console.log(this.itemObj);
    this.itemTitle = this.itemObj.title;
    this.itemPrice = this.itemObj.price;
    this.itemsAdded = true;
  	// this.cart = this.itemObj
    // console.log('change', this.cart)
    
  }

}

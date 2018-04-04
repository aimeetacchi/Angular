import { Component, OnInit, Input, OnChanges,  SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
  @Input() itemObj: object = {};
  @Input() cart: boolean;
 
  constructor() { 
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges){
	console.log(this.cart)
	console.log(this.itemObj);
  	// this.cart = this.itemObj
  	// console.log('change', this.cart) 
  }

}

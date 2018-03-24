import { Component, trigger, animate, style, transition, keyframes } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
   		trigger("moveInLeft",[
      	transition("void=> *",[style({transform:"translateX(300px)"}),
        animate(200,keyframes([
         	style({transform:"translateX(300px)"}),
         	style({transform:"translateX(0)"})
 
          ]))]),

      transition("*=>void",[style({transform:"translateX(0px)"}),
      animate(100,keyframes([
        	 style({transform:"translateX(0px)"}),
         	 style({transform:"translateX(300px)"})
 
          ]))])
		])
	]
})
export class AppComponent {

	itemArray = [];

	// Submit Form
	onSubmit(item: NgForm){
		
		if(item.value !== "" && item.valid){
			console.log(item.value)
			this.itemArray.push(item.value);
		  	item.reset();
		} else {
			console.log('please add item')
		}
	}

	addItem(value, e){
		e.preventDefault();
		this.itemArray.push(value);
		console.log(this.itemArray);
	}

	deleteItem(item){
		console.log('delete')
		for(let i = 0; i <= this.itemArray.length; i++){
			if(item == this.itemArray[i]){
				this.itemArray.splice(i,1);
			}
		}
		
	}
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  	fruitAnswer: string = '';
	animalAnswer: string = '';

	animalSpinner: boolean = false;
	fruitSpinner: boolean = false;

	fruits: string[] = ['Oranges', 'Grapes',];
	animals: string[] = ['Panda', 'Sealion',];


	addFruit(){
		this.fruitSpinner = true;


		setTimeout(() => {
			this.fruits.unshift(this.fruitAnswer);
			this.fruitSpinner = false;
		}, 2000)
	}

	addAnimal(){
		this.animalSpinner = true;


		setTimeout(() => {
			this.animals.unshift(this.animalAnswer);
			this.animalSpinner = false;
		}, 2000)
	}
}

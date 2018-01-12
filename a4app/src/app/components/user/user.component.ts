import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	name: string;

  cat = {
    name: '',
    email: '',
    phone: ''
  }

	age: number;
  birthday = new Date(1984, 10, 18);
	email: string;
	address: Address;
	//hobbies: string[];
  catsNames: string[];
	users: object;

  text:string = 'I am learning Angular';
  text2:string = 'Type in the text box to change me';

  // === For showing the user panel if true or false
	isEdit: boolean = false;
  showAge: boolean = true;

  imageUrl:string = 'http://lorempixel.com/400/200';
  isUnchanged:boolean = false;

  // ngClass ====
  isRed = true;
  canSave = true;
  currentClasses = {};

  data:any[] = []

  constructor(private dataService:DataService) {
  	console.log('constructor ran..');
    this.setCurrentClasses();

    // Observable ----
    // this.dataService.getData().subscribe(data => {
    //     //console.log(data);
    //     this.data.push(data);
    // });
  }



  ngOnInit(): void {
  	console.log('ngOnInit ran');

  	this.name = 'John Doe';
  	this.email = 'test@test.co.uk';
  	this.age = 33;
  	this.address = {
  		street: '43 Birchslow',
  		city: 'Buntown',
  		county: 'Redshire'
  	}
  	//this.hobbies = ['tea', 'travel', 'draw', 'code'];
    this.catsNames = ['Reno', 'Jimmy', 'Denzel']

  	this.dataService.getUsers().subscribe((users) => {
  		console.log(users)
  		this.posts = users;
  	},
    (error) => {
      console.log(error);
    });
  }

  // Function to set classes
  setCurrentClasses(){
    this.currentClasses = {
      saveable:this.canSave,
      red: this.isRed
    }
  }
// ===== CLICK EVENT =====
  onClick(e){
  	console.log(e);
  }

// ===== MOUSE OVER EVENT ======
 onMouseOver(e){
   console.log(e);
 }

// On Submit Form V1 ======
  // addHobby(hobby){
  // 	console.log(hobby);
  // 	this.hobbies.unshift(hobby);
  // 	return false;
  // }

  // deleteHobby(hobby){
  // 	for(let i = 0; i < this.hobbies.length; i++){
  // 		if(this.hobbies[i] == hobby){
  // 			this.hobbies.splice(i, 1);
  // 		}
  // 	}
  // }

 // On Submit V2 - Add Cat
 // TEMPLATE DRIVEN FORMS AND VALIDATION
 addCat({value, valid}){
   if(valid){
     console.log(value);
     this.catsNames.push(this.cat.name);

   } else {
   console.log('Form is invalid');
   }
  
 }

// === CHANGING PROPERTIES WITH EVENTS
  toggleEdit(){
  	this.isEdit = !this.isEdit;
  }

  //==== KEYUP EVENT
  keyEvent(e){
      console.log(e.key);
  }

  ChangeText2(e) {
    this.text2 = e.target.value;
  }

}




// Interface that you could export and put in another file and import them into here.
interface Address {
	street: string,
	city: string,
	county: string
}

interface Post{
	id: number,
	title: string,
	body: string,
	userId: number
}

import { Component} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: []
})
export class ContactComponent {
	title = "Contact Us";
	submitted = false;
	messages: object[] = [];

	message = {
		name: '',
		email:'',
		number:'',
		note:''
	}

	onSubmitMessage({value, valid}){
			if(valid){
				console.log(value);
				this.submitted = true;

				this.messages.push(value);
				console.log(this.messages);
			} else {
				console.log('Form is invalid')
			}
	}
}

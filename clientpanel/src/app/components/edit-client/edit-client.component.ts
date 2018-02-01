import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

	id: string;
	client: Client = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: 0
	}
	disableBalanceOnEdit: boolean;

  constructor(
  	private clientService: ClientService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private flashMessage: FlashMessagesService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  	// get Id of the user from URL
  	this.id = this.route.snapshot.params['id'];
  	// get client - function in service getClient.
  	this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  // On Form Submit =======
  onSubmit({value, valid}: {value: Client, valid: boolean}) {
  		if(!valid){
  			// Error message
  			this.flashMessage.show('Please fill out correctly', {
  				cssClass: 'alert-danger', timeout: 4000
  			})
  		} else {
  			// add Id to client
  			value.id = this.id;
  			// Update Client
  			//console.log(value)
  			this.clientService.updateClient(value);
  			this.flashMessage.show('Client Updated', {
  				cssClass: 'alert-success', timeout: 4000
  			});
        // Navigate to client/id
  			this.router.navigate([`/client/${this.id}`])
  		}
  }

}

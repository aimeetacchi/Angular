import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {
	id: string;
	client: Client;
	hasBalance: boolean = false;
	showBalanceUpdateInput: boolean = false;

  constructor(
  	private clientService: ClientService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private flashMessage: FlashMessagesService
  	) { }

  ngOnInit() {
  	// get Id from URL
  	this.id = this.route.snapshot.params['id'];
  	// get client - function in service.
  	this.clientService.getClient(this.id).subscribe(client => {
  		if(client != null){
        if(client.balance > 0){
    			this.hasBalance = true;
    		}
      }
  		this.client = client;
  		//console.log(this.client);
  	});
  }

  // Updating Balance 
  updateBalance(){
    // call updateClient in service
  	this.clientService.updateClient(this.client);
  	this.flashMessage.show('Balance Updated', {
  			cssClass: 'alert-success', timeout: 4000
  		});
  }

  // Delete a Client
  onDeleteClick(){
    if(confirm('Are you sure?'))
      // call deleteClient in Service.
    this.clientService.deleteClient(this.client);
    this.flashMessage.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
  // Navigate back to dashboard.
  this.router.navigate(['/']);
  }

}

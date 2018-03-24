import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

// Services
import { SettingsService } from '../../services/settings.service';

// Interface
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	// setting settings to the interface we imported in Settings.
	settings: Settings;

  constructor(
  	private router: Router,
  	private flashMessage: FlashMessagesService,
    private settingsService: SettingsService) { }

  ngOnInit() {
  	// set Settings to the getSettings Function from the settings Service.
  	this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
  	// this.settings is bond to the form in settings.component.html
  	this.settingsService.changeSettings(this.settings);
  	this.flashMessage.show('Settings saved', {
  		cssClass: 'alert-success', timeout: 4000
  	});
  }

}

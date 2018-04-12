import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  dataReady: boolean = false;
  aboutObjectID: string;
  aboutObject: string;
  aboutTitle: string;
  constructor(private data: DataService) { }

  ngOnInit() {

    // Fetch Wordpress API JSON MENU TITLE FOR NAV ITEMS
  	this.data.getMenu().subscribe(
  		(response) => {
        let menu = response;
        // ASSIGN VALUES
        // this.aboutTitle = menu.items[0].title;
    
      // Change dataReady to true.
  		this.dataReady = true;
  		}, (error) => {
  			console.log(error);
  		});


  }

  about(idobject, object){
    // ---- Get the MENU DATA FOR getting the ABOUT DATA -
    console.log('Getting you the about menu data....')
  }

}

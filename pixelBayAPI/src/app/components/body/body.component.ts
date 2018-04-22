import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  // variables --
  dataReady = false;

  constructor(private data: DataService) { }

  ngOnInit() {

    // Fetch Treehouse JSON
  	this.data.getData().subscribe(
  		(response) => {
        console.log(response);
  		// ASSIGN VALUES
      
      // Change dataReady to true.
  		this.dataReady = true;
  		}, (error) => {
  			console.log(error);
  		});
  }

}

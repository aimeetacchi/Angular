import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	date: string;
  constructor() { }

  ngOnInit() {
  	const year = new Date().getFullYear();
  	this.date = year.toString();
  }

}

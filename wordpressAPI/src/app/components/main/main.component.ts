import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  constructor(
  	private data: DataService) {}
  APIdata: any;
  
  //About ---
  about: any;
  aboutContent1: any;
  aboutContent2: any;
  aboutTitle1: string;
  aboutText1: string;
  aboutTitle2: string;
  aboutText2: string;
  // Portfolio ---
  portfolio: any;
  portfolioContent: any;
  portfolioTitle: string;
  portfolioText: string;
  //Contact Us ---
  contactUs: any;
  contactUsContent: any;
  contactUsTitle: string;
  contactUsText: string;

  dataReady = false;
  
  ngOnInit() {

  	// Fetch Wordpress API JSON
  	this.data.getData().subscribe(
  		(response) => {
        // ASSIGN VALUES
        this.contactUs = response[0].acf.page_builder;
        this.portfolio = response[1].acf.page_builder;
        this.about = response[2].acf.page_builder;

        // ASSIGN CONTENT ==
        // this.contactUsContent = this.contactUs[0].blocks[0].block.written_content;
        // this.portfolioContent = this.portfolio[0].blocks[0].block.written_content;
        // this.aboutContent1 = this.about[0].blocks[0].block.written_content;
        // // ASSIGN VALUES ===
        // this.contactUsTitle =  this.contactUsContent.title
        // this.contactUsText =  this.contactUsContent.text_block

        // this.portfolioTitle =  this.portfolioContent.title
        // this.portfolioText =  this.portfolioContent.text_block

        // this.aboutTitle1 =  this.aboutContent1.title
        // this.aboutText1 =  this.aboutContent1.text_block
        // this.aboutTitle2 =  this.aboutContent2.title
        // this.aboutText2 =  this.aboutContent2.text_block
        console.log()
    
      // Change dataReady to true.
  		this.dataReady = true;
  		}, (error) => {
  			console.log(error);
  		});


  }

}

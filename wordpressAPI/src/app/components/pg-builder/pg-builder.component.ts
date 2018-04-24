/* ======= How it Works ====== */
/*
This component is the core of the page building, the page content.
The first thing that happens is on the page initialising we get the url using the router component.
Next we look for teh snapshot params to see what page we are on.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pg-builder',
  templateUrl: './pg-builder.component.html',
  styles: []
})
export class PgBuilderComponent implements OnInit {
  // Assign Variables
  meta: any;
  pageTitle: string;
  allData: any;
  pgData: any;
  pageUrl: any;
  slug: string;
  menu: any;
  content: any;
  blocks: any;
  featuredImg: any;
  featureImgUrl: any;
  featuredImgSet: boolean = false;
  dataReady: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService) {

    // get the current url in an array format
    this.pageUrl = this.route.snapshot.url;
    // console.log(this.pageUrl[0].path)
  }

  ngOnInit() {
    // get Menu data from service
    this.data.getMenu().subscribe(
      (response)=> {
        this.menu = response;
        
        this.menu.forEach((el)=>{
          // getting the path in the route.
         // console.log(el);
          let page = this.pageUrl[0].path;
          // if the element title is the same as page path.
          if(el.title.toLowerCase() === page){
            // call the getPageContent Function and pass the pageID and customCat
            this.getPageContent(el.pageId, el.customCat)
            this.slug = el.slug;
            this.pageTitle = el.title;
          }
        })

        // Change dataReady to true.
  		  this.dataReady = true;
      }, (error) => {
        console.log(error);
      });

  }

// Get Slug ------ From Event Emitter
  getSlug(e: string){
    this.slug = e;
  }

// Get Content ---- From the Event Emitter when you click the nav it
  getContent(e: any){
    this.dataReady = false;
    this.featuredImgSet = false;
    // create a pgData object --
    this.pgData = {
      "meta": e.acf.meta_data,
      "content": e.acf.page_builder
    };
   this.content = this.pgData.content;
    
    if(e.better_featured_image){
      this.featuredImgSet = true;
      this.featuredImg = e.better_featured_image;
      this.featureImgUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.featuredImg.source_url})`); 
    }
    this.pageTitle = this.pgData.meta.title.toUpperCase();
    this.dataReady = true;

  }

  // Get Content on Load or URL typed in.
  getPageContent(pageID, customCat){
    this.dataReady = false;
    this.featuredImgSet = false;
      // sending the pageID, and customCat
      this.data.getData(pageID, customCat).subscribe(
        (response) => {        
          // create a pgData object --
          this.pgData = response;

          this.pgData = {
            "meta": this.pgData.acf['meta_data'],
            "featuredImg" : this.pgData['better_featured_image'],
            "content": this.pgData.acf['page_builder'],
          };
          this.content = this.pgData.content;
          

         this.pageTitle = this.pgData.meta.title.toUpperCase();  

         if(this.pgData.featuredImg){
            this.featuredImgSet = true;
            this.featuredImg = this.pgData.featuredImg;
            this.featureImgUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.featuredImg.source_url})`) 
         }
         console.log(this.pgData);
         this.dataReady = true;
        }, (error) => {
          console.log(error);
        });
  }

}


import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-pg-builder',
  templateUrl: './pg-builder.component.html',
  styles: []
})
export class PgBuilderComponent implements OnInit {
  // Assign Variables
  pgData: any;
  pageUrl: any;
  meta: any;
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
    console.log(this.pageUrl[0].path)
  }

  ngOnInit() {
  
    this.data.getMenu().subscribe(
      (response)=> {
        this.menu = response;
        
        this.menu.forEach((el)=>{
          // getting the path in the route.
          //console.log(el);
          let page = this.pageUrl[0].path;
          // if the element title is the same as page path.
          if(el.title.toLowerCase() === page){
            //call the getPageContent Function and pass the pageID and customCat
            this.getPageContent(el.pageId, el.customCat)
            this.slug = el.slug;
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
// Get Content ---- From the Event Emitter 
  getContent(e: any){
    this.content = e.acf.page_builder;
    this.blocks = this.content[0].blocks;
    this.featuredImgSet = false;
    
    if(e.better_featured_image){
      this.featuredImgSet = true;
      this.featuredImg = e.better_featured_image;
      this.featureImgUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.featuredImg.source_url})`); 
    }
    console.log(this.content);
  }




  // Get Content on Load or URL typed in.
  getPageContent(pageID, customCat){
      //console.log(pageID, customCat);

      // sending the pageID, and customCat
      this.data.getData(pageID, customCat).subscribe(
        (response) => {
          this.pgData = response;
         this.content = this.pgData.acf.page_builder;
         this.meta = this.pgData.acf.meta_data;
          console.log(this.content)
         if(this.pgData.better_featured_image){
            this.featuredImgSet = true;
            this.featuredImg = this.pgData.better_featured_image;
            this.featureImgUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.featuredImg.source_url})`)
         }
        }, (error) => {
          console.log(error);
        });
  }

}


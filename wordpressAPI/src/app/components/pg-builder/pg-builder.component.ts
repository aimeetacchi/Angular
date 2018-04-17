import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-pg-builder',
  templateUrl: './pg-builder.component.html',
  styles: []
})
export class PgBuilderComponent implements OnInit {
  slug: string;
  content: any;
  blocks: any;
  featuredImg: any;
  featureImgUrl: any;
  featuredImgSet: boolean = false;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

// Get Slug ------ From Event Emitter
  getSlug(e: string){
    this.slug = e;
    console.log(this.slug + " this is the slug passed to the pg-builder")
  }
// Get Content ---- From the Event Emitter 
  getContent(e: any){
    this.content = e.acf.page_builder;
    this.blocks = this.content[0].blocks;
    
    if(e.better_featured_image){
      this.featuredImgSet = true;
      this.featuredImg = e.better_featured_image;
      this.featureImgUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.featuredImg.source_url})`); 
    }
    
    console.log(this.content);
  }

}

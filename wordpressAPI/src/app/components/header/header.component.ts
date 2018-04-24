import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() getSlug : EventEmitter<string> = new EventEmitter<string>(); // sending the slug to the pgbuilderComponent
  @Output() getContent : EventEmitter<any> = new EventEmitter<any>(); // sending the page content to the pgbuilderComponent

  toggleBurger: boolean;
  rotateBar1: boolean;
  rotateBar2: boolean;
  isActive:boolean;
  dataReady: boolean = false;
  menu : any;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef) {}

  ngOnInit() {
    // Fetch Wordpress API JSON MENU TITLE FOR NAV ITEMS
  	this.data.getMenu().subscribe(
  		(response) => {
       this.menu = response;
        //console.log(this.menu)

      // Change dataReady to true.
  		this.dataReady = true;
  		}, (error) => {
  			console.log(error);
  		});

  }
  // Click event on the nav items, to get the correct pagecontent data.
  showClicked(event,customCat,pageId, title, slug){
      event.preventDefault();
      // console.log(`you just clicked: ${title}`);
      // console.log(`with the Slug: ${slug}`)
      // console.log(`The CustomCat: ${customCat}, and PageID: ${pageId}`);
      
      // Emitting the Slug
      this.getSlug.emit(slug);

      // == Call the getPageContent FUNCTION ===
      this.getPageContent(pageId, customCat)
      
      // Change URL Router to the slug name ===
      this.router.navigate([slug]);
  }


  // Function to get the page content from the params passed in. from Click Event above
  getPageContent(pageID, customCat){

    this.data.getData(pageID, customCat).subscribe(
      (response) => {
        let content = response;
        // Event Emmitter to pass Content to the pgBuilderComponent ---
        this.getContent.emit(content);
        //console.log(content)
      }, (error) => {
  			console.log(error);
  		});
  }

   
  
  
  // Pratice with RENDERER2
    // onClick() {
    //  //this.renderer.setStyle(this.p.nativeElement, 'display','block');
    //   const p = this.renderer.createElement('p');
    //   const text = this.renderer.createText('This was created with renderer2');
    //   this.renderer.appendChild(p, text);
    //   this.renderer.appendChild(this.myTag.nativeElement, p);
    // }
}


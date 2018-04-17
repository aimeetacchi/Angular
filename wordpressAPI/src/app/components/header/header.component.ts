import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() getSlug : EventEmitter<string> = new EventEmitter<string>(); // sending the slug to the pgbuilderComponent
  @Output() getContent : EventEmitter<any> = new EventEmitter<any>(); // sending the page content to the pgbuilderComponent
  dataReady: boolean = false;
  menu : any;
  pageTitle: string;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // Fetch Wordpress API JSON MENU TITLE FOR NAV ITEMS
  	this.data.getMenu().subscribe(
  		(response) => {
       this.menu = response;
        
        // ASSIGN VALUES
      
      // Change dataReady to true.
  		this.dataReady = true;
  		}, (error) => {
  			console.log(error);
  		});


  }

  // Click event on the nav items, to get the correct pagecontent data.
  showClicked(event,customCat,pageId, title, slug){
      event.preventDefault();
      console.log(`you just clicked: ${title}`);
      console.log(`with the Slug: ${slug}`)
      console.log(`The CustomCat: ${customCat}, and PageID: ${pageId}`);
      this.pageTitle = slug.toUpperCase();
      
      // Emitting the Slug
      this.getSlug.emit(slug);
      // NEED TO EVENTEMIT THESE TO THE PG BUILDER COMPONENT!----

      // Call the getPageContent Function ----
      this.getPageContent(pageId, customCat)
      // Change URL Router to the slug name ---
      this.router.navigate([slug]);
  }

  // Function to get the page content from the params passed in. from Click Event above
  getPageContent(pageID, customCat){

    this.data.getData(pageID, customCat).subscribe(
      (response) => {
        let content = response;

        // Event Emmitter to pass Content to the pgBuilderComponent ---
        this.getContent.emit(content)
        //console.log(content)
      }, (error) => {
  			console.log(error);
  		});
  }
  

}

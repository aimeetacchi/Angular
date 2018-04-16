import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pg-builder',
  templateUrl: './pg-builder.component.html',
  styles: []
})
export class PgBuilderComponent implements OnInit {
  slug: string;
  content: any;
  blocks: any;

  constructor() {}

  ngOnInit() {
  }

  getSlug(e: string){
    this.slug = e;
    console.log(this.slug + "this is the slug passed to the pg-builder")
  }

  getContent(e: any){
    this.content = e.acf.page_builder;
    this.blocks = this.content[0].blocks
    console.log(this.content[0].blocks);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Cat } from "../cat";

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// Service ---
import { CatService }  from '../cat.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {
	@Input() cat: Cat;
	
  constructor(
  	private route: ActivatedRoute,
  	private catService: CatService,
  	private location: Location
  	) { }

  	ngOnInit(): void {
  		this.getCat();
	}

	getCat(): void {
		// the + converts the string to a number.
		const id = +this.route.snapshot.paramMap.get('id');
		this.catService.getCat(id).subscribe(cat => this.cat = cat);
	}

  save(): void {
    this.catService.updateCat(this.cat).subscribe(() => this.goBack());
  }

	goBack(): void {
  		this.location.back();
	}

}

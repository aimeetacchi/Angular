import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../../services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit { 

  constructor(private entryService: EntryService) {

  }

  ngOnInit(){
      this.entryService.getEntries().subscribe(res => {
        this.entries = res;
      });
  }

}

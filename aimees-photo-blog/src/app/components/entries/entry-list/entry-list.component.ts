import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../../services/entry.service';
import { Entry } from '../../../entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit { 
  entries: Entry[];
  constructor(private entryService: EntryService) {

  }

  ngOnInit(){
      this.entries = this.entryService.getEntries();
  }

}

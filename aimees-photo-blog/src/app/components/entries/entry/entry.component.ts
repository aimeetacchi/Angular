import { Component, Input } from '@angular/core';
import { Entry } from '../../../entry.model'; // import Interface

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() entry: Entry; // Assigning the Entry Interface to entry.

  onCommentAdded(comments: {name: string, comment: string;}){
    this.entry.comments.push(comments)
  }
}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntryService } from '../../../services/entry.service';

@Component({
    selector: 'app-entry-comment-form',
    templateUrl: './entry-comment-form.component.html'
  })

  export class EntryCommentFormComponent {
    name: string = '';
    comment: string = '';
    @Input() entryId: number;
    @Output() onCommentAdded = new EventEmitter<{name: string, comment: string}>();
    @ViewChild('commentForm') commentForm: NgForm;
   
    constructor(private entryService: EntryService){}

    onSubmit(commentForm: NgForm){
      if(this.commentForm.invalid) return;
      let comment = { name: this.name, comment: this.comment}
      // if there was a database - would send the comment to service to add to db
      // this.entryService.addComment(this.entryId, comment);

        this.onCommentAdded.emit(comment);
        this.commentForm.resetForm();

    }
  }
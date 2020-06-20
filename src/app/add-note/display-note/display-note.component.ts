import { EditNoteComponent } from './../../edit-note/edit-note.component';
import { fade, bounce } from './../../animations';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css'],
  animations: [
    fade,
    bounce
  ]
})
export class DisplayNoteComponent implements OnInit{

  @Input('displayNote') displayNote : any;
  @Output('deletenote') deleteNoteEvent = new EventEmitter();
  @Output('pinnote') pinNoteEvent = new EventEmitter();
  @Input('isPinned') isPinned  : boolean;

  constructor(private dialog: MatDialog) {}

  ngOnInit(){ }
  
  openDialog(){
    this.dialog.open(EditNoteComponent, {
      data: this.displayNote
    });
  }

  onClickDelete(){
    this.deleteNoteEvent.emit();
  }

  onClickPin(){
    this.pinNoteEvent.emit();
  }



}

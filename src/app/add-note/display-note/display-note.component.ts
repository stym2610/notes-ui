import { fade, bounce } from './../../animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css'],
  animations: [
    fade,
    bounce
  ]
})
export class DisplayNoteComponent {

  @Input('displayNote') displayNote : any;
  
  @Output('deletenote') deleteNoteEvent = new EventEmitter();

  @Output('pinnote') pinNoteEvent = new EventEmitter();

  @Input('isPinned') isPinned  : boolean;

  onClickDelete(){
    this.deleteNoteEvent.emit();
  }

  onClickPin(){
    this.pinNoteEvent.emit();
  }



}

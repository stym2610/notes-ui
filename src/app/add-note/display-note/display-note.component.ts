import { EditNoteComponent } from './../../edit-note/edit-note.component';
import { fade, bounce } from './../../animations';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopoverComponent } from 'other_modules/popover.module';

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

  @ViewChild("menuOptionsPopup", { static: false }) protected menuOptionsPopup: PopoverComponent;

  @Input('displayNote') displayNote : any;
  @Input('isPinned') isPinned  : boolean;
  @Output('deletenote') deleteNoteEvent = new EventEmitter();
  @Output('pinnote') pinNoteEvent = new EventEmitter();
  @Output() changedColorEvent = new EventEmitter();

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

  openMenuOptionsPopup(event: any) {
    this.menuOptionsPopup.open(new ElementRef(event.target));
  }

  changeColor(color){
    this.changedColorEvent.emit(color);
  }


}

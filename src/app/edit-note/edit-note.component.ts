import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NOTE } from '../add-note';
import * as NotesActions from '../store/actions';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {

  editedNote;
  newText;
  id;
  isPinned;
  color;

  constructor(@Inject(MAT_DIALOG_DATA) public note: any, 
              private dialogRef: MatDialogRef<any>,
              private store: Store<any>) {
    this.newText = note.value;
    this.id = note.id;
    this.isPinned = note.isPinned;
    this.color = note.color;
  }

  closeDialog(){
    this.dialogRef.close();
    this.editedNote = {
      id: this.id,
      value: this.newText,
      isPinned : this.isPinned,
      color: this.color
    };
    if(this.editedNote.value && this.newText != this.note.value)
      this.store.dispatch(new NotesActions.UpdateNote(this.editedNote));  
  }

}

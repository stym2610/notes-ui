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

  constructor(@Inject(MAT_DIALOG_DATA) public note: any, 
              private dialogRef: MatDialogRef<any>,
              private store: Store<{ notesList : { notes : NOTE[] } }>) {
    this.newText = this.note.value;
    this.id = this.note.id;
    this.isPinned = this.note.isPinned;
  }

  closeDialog(){
    this.dialogRef.close();
    this.editedNote = {
      id: this.id,
      value: this.newText,
      isPinned : this.isPinned
    };
    if(this.editedNote.value && this.newText != this.note.value)
      this.store.dispatch(new NotesActions.UpdateNote(this.editedNote));
  }

}

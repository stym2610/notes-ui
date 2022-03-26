import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as NotesActions from '../store/actions';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {

  editedNote;
  newText;

  constructor(@Inject(MAT_DIALOG_DATA) public note: any, 
              private dialogRef: MatDialogRef<any>,
              private store: Store<any>) {
                this.newText = note.value;
              }

  closeDialog(){
    this.dialogRef.close();
    this.editedNote = {
      id: this.note.id,
      value: this.newText,
      isPinned : this.note.isPinned,
      color: this.note.color
    };
    if(this.editedNote.value && this.newText != this.note.value)
      this.store.dispatch(new NotesActions.UpdateNote(this.editedNote)); 
  }
}
import { AuthenticationService } from './../authentication.service';
import { Observable } from 'rxjs';
import { GET_NOTES } from './../store/actions';
import { NotesService } from './../service/notes.service';
import { Component, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NotesActions from '../store/actions';
import { Router } from '@angular/router';


export interface NOTE {
  id : number,
  value : any,
  isPinned : boolean
}

@Component({
  selector: 'add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  animations: []
})
export class AddNoteComponent implements OnInit {

  constructor(private service: NotesService, 
              private store: Store<{ notesList : { notes : NOTE[] } }>,
              private auth: AuthenticationService,
              private route: Router) {}
  
  notesDataObservable : Observable<{ notes: NOTE[] }>;
  notes;
  searchString;

  ngOnInit(){
    this.getNotes();
  }

  getNotes(){
    this.store.dispatch({ type: GET_NOTES });
    this.notesDataObservable = this.store.select("notesList");
    
    // this.service.getNotes()
    //   .subscribe((data: NOTE[]) => {
    //     this.notes = data;
    //   }, error => {
    //     alert("An unexpected error occured..");
    //     console.error(error);
    // });
  }

  addNote(note: HTMLInputElement){
    if(note.value != "") {
      let body = {
        value : note.value
      };
      this.store.dispatch(new NotesActions.AddNote(body));
      this.notesDataObservable = this.store.select("notesList");
      // this.service.postNote(body)
      //   .subscribe(data => {
      //     this.getNotes();
      //   }, error => {
      //     alert("An unexpexted error occured");
      //     console.log(error);
      //   });
      note.value = "";
    } 
  }

  deleteNote(note_id){
    this.store.dispatch(new NotesActions.DeleteNote(note_id));
    this.notesDataObservable = this.store.select("notesList");
    // this.service.deleteNote(note_id)
    //   .subscribe(data => {
    //     this.getNotes();
    //   }, error => {
    //       alert("An unexpected error occured..");
    //   });
  }

  pinNote(note_id){
    this.notesDataObservable.subscribe(notesList => this.notes = notesList)
    for(var i = 0; i < this.notes.length; i++) {
      if(this.notes[i].id === note_id) {
        this.notes[i].isPinned = !this.notes[i].isPinned; 
        this.service.updateNote(this.notes[i])
          .subscribe(data => {
            this.getNotes();
          }, error => {
            alert("An unexpexted error occured..");
          });
      }
    }
  }

  search(searchString) {
    console.log(searchString);
    this.searchString = searchString;
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }


}

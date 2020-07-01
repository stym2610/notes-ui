import { UserService } from './../user.service';
import { AuthenticationService } from './../authentication.service';
import { Observable } from 'rxjs';
import { GET_NOTES } from './../store/actions';
import { NotesService } from './../service/notes.service';
import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NotesActions from '../store/actions';
import { Router } from '@angular/router';
import { PopoverComponent } from '../popover.module';


export interface NOTE {
  id : number,
  value : any,
  isPinned : boolean,
  color: string
}

@Component({
  selector: 'add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  animations: []
})
export class AddNoteComponent implements OnInit {

  @ViewChild("menuOptionsPopup", { static: false }) protected menuOptionsPopup: PopoverComponent;
  
  notesDataObservable : Observable<{ notes: NOTE[] }>;
  notes;
  searchString;
  userInfo;
  showSearchBox = false;

  constructor(private service: NotesService, 
              private store: Store<{ notesList : { notes : NOTE[] } }>,
              private auth: AuthenticationService,
              private route: Router,
              private userService: UserService) {}
  

  ngOnInit(){
    this.getNotes();
    this.userService.getUser()
      .subscribe((userInfo: any) => {
        this.userInfo = userInfo;
      })
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
    this.searchString = searchString;
  }

  get firstname() {
    return this.userInfo.name.split(' ')[0];
  }

  openMenuOptionsPopup(event: any) {
    this.menuOptionsPopup.open(new ElementRef(event.target));
  }

  
}

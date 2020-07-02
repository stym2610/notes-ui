import { UserService } from './../user.service';
import { Observable } from 'rxjs';
import { GET_NOTES } from './../store/actions';
import { NotesService } from './../service/notes.service';
import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NotesActions from '../store/actions';
import { PopoverComponent } from '../../../other_modules/popover.module';


export interface NOTE {
  id : number,
  value : any,
  isPinned : boolean,
  userId: string,
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
  @ViewChild("searchBarReference", { static: false }) protected searchBarReference: ElementRef;
  notesDataObservable : Observable<{ notes: NOTE[] }>;
  notes;
  searchString;
  userInfo;
  showSearchBox = false;

  constructor(private service: NotesService, 
              private store: Store<{ notesList : { notes : NOTE[] } }>,
              private userService: UserService) {}
  

  ngOnInit(){
    this.getNotes();
    this.userService.getUser()
      .subscribe((userInfo: any) => {
        this.userInfo = userInfo;
      })
  }

  trackNotes(index: number, note: NOTE){
    return note.id;
  }

  getNotes(){
    this.store.dispatch({ type: GET_NOTES });
    this.notesDataObservable = this.store.select("notesList");
  }

  addNote(note: HTMLInputElement){
    if(note.value != "") {
      let body = {
        value : note.value
      };
      this.store.dispatch(new NotesActions.AddNote(body));
      this.notesDataObservable = this.store.select("notesList");
      note.value = "";
    } 
  }

  deleteNote(note_id){
    this.store.dispatch(new NotesActions.DeleteNote(note_id));
    this.notesDataObservable = this.store.select("notesList");
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

  changeColor(note, color){
    console.log("event emited from display note component", note, color);
    let editedNote = {
      userId: note.userId,
      id: note.id,
      value: note.value,
      isPinned: note.isPinned,
      color: color
    }
    this.store.dispatch(new NotesActions.ChangeNoteColor(editedNote));
  }

  showSearchBar(){
    this.showSearchBox = true;
    setTimeout(() => {
      this.searchBarReference.nativeElement.focus();
     }, 0);
  }

  deleteSearchString() {
    this.showSearchBox = false;
    this.searchString = '';
  }

  get firstname() {
    return this.userInfo.name.split(' ')[0];
  }

  openMenuOptionsPopup(event: any) {
    this.menuOptionsPopup.open(new ElementRef(event.currentTarget));
  }

  
}

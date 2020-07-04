import { UserService } from './../user.service';
import { Observable } from 'rxjs';
import { GET_NOTES } from './../store/actions';
import { NotesService } from './../service/notes.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NotesActions from '../store/actions';
import { PopoverComponent } from '../../../other_modules/popover.module';
import { fadeIn } from '../animations';


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
  animations: [
    fadeIn
  ]
})
export class AddNoteComponent implements OnInit {

  @ViewChild("menuOptionsPopup", { static: false }) protected menuOptionsPopup: PopoverComponent;
  @ViewChild("searchBarReference", { static: false }) protected searchBarReference: ElementRef;
  notesDataObservable : Observable<any>;
  notes;
  searchString;
  userInfo;
  showSearchBox = false;

  constructor(private service: NotesService, 
              private store: Store<any>,
              private userService: UserService) {}
  

  ngOnInit(){
    this.getNotes();
    this.userService.getUser()
      .subscribe((userInfo: any) => {
        this.userInfo = userInfo;
      });  
  }

  trackNotes(index: number, note: NOTE){
    return note.id;
  }

  getNotes(){
    this.store.dispatch({ type: GET_NOTES });
    this.notesDataObservable = this.store.select("notesList");
    console.log("getNotes executed");
    this.notesDataObservable.subscribe(state => {
      console.log('from state suscription');
      console.log(state);
    })
  }

  addNote(note: HTMLInputElement){
    if(note.value != "") {
      let body = {
        value: note.value,
        color: "#202124"
      };
      this.store.dispatch(new NotesActions.AddNote(body));
      note.value = "";
    } 
  }

  deleteNote(note_id){
    this.store.dispatch(new NotesActions.DeleteNote(note_id));
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
    let editedNote = {
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

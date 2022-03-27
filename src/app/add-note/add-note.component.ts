import { UserService } from "../service/user.service";
import { Observable } from "rxjs";
import { GET_NOTES } from "./../store/actions";
import { NotesService } from "./../service/notes.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Store } from "@ngrx/store";
import * as NotesActions from "../store/actions";
import { PopoverComponent } from "../../../other_modules/popover.module";
import { fadeIn } from "../animations";
import { map, filter } from "rxjs/operators";

export interface NOTE {
  id: number;
  value: any;
  isPinned: boolean;
  userId: string;
  color: string;
}

@Component({
  selector: "add-note",
  templateUrl: "./add-note.component.html",
  styleUrls: ["./add-note.component.css"],
  animations: [fadeIn],
})
export class AddNoteComponent implements OnInit {
  @ViewChild("menuOptionsPopup", { static: false })
  protected menuOptionsPopup: PopoverComponent;
  @ViewChild("searchBarReference", { static: false })
  protected searchBarReference: ElementRef;
  notesDataObservable: Observable<any>;
  pinnedNotesArrayObservable: Observable<any>;
  notes;
  searchString;
  userInfo;
  showSearchBox = false;
  listening = false;
  recognition = null;
  noteContent = "";

  constructor(private store: Store<any>, private userService: UserService) {
    this.store.dispatch({ type: GET_NOTES });
    this.notesDataObservable = this.store.select("notesList");
  }

  ngOnInit() {
    this.getNotes();
    this.userService.getUser().subscribe((userInfo: any) => {
      this.userInfo = userInfo;
    });
    this.recognition = this.addListener();
  }

  addListener() {
    const { webkitSpeechRecognition } = window as any;
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onerror = function (event) {
      console.log("error");
    };
    recognition.onresult = this.captureSpeechText;
    return recognition;
  }

  captureSpeechText = (event) => {
    let index = event.resultIndex;
    let transcript = event.results[index][0].transcript;
    if (event.results[index].isFinal) {
      this.noteContent += transcript;
    }
  };

  toggleListen() {
    this.listening = !this.listening;
    if (this.listening) {
      if (this.noteContent.length) this.noteContent += " ";
      this.recognition.start();
    } else {
      this.recognition.stop();
    }
  }

  trackNotes(index: number, note: NOTE) {
    return note.id;
  }

  getNotes() {
    this.pinnedNotesArrayObservable = this.notesDataObservable.pipe(
      map((storeData: any) => {
        if (storeData.notes)
          return storeData.notes.filter((note) => !!note.isPinned);
      })
    );
  }

  addNote() {
    console.log(this.noteContent);
    if (this.noteContent != "") {
      let body = {
        value: this.noteContent,
      };
      this.store.dispatch(new NotesActions.AddNote(body));
      this.noteContent = "";
    }
  }

  deleteNote(note_id) {
    this.store.dispatch(new NotesActions.DeleteNote(note_id));
  }

  pinNote(note) {
    let editedNote = {
      id: note.id,
      value: note.value,
      isPinned: !note.isPinned,
      color: note.color,
    };
    this.store.dispatch(new NotesActions.UpdateNote(editedNote));
  }

  changeColor(note, color) {
    let editedNote = {
      id: note.id,
      value: note.value,
      isPinned: note.isPinned,
      color: color,
    };
    this.store.dispatch(new NotesActions.ChangeNoteColor(editedNote));
  }

  showSearchBar() {
    this.showSearchBox = true;
    setTimeout(() => {
      this.searchBarReference.nativeElement.focus();
    }, 0);
  }

  deleteSearchString() {
    this.showSearchBox = false;
    this.searchString = "";
  }

  get firstname() {
    return this.userInfo.name.split(" ")[0];
  }

  openMenuOptionsPopup(event: any) {
    this.menuOptionsPopup.open(new ElementRef(event.currentTarget));
  }
}

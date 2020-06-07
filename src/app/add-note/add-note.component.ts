import { NotesService } from './../service/notes.service';
import { Component, Output, OnInit } from '@angular/core';

interface NOTE {
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

  constructor(private service: NotesService) {}

  notes: NOTE[] = [];

  ngOnInit(){
    this.getNotes();
  }

  getNotes(){
    this.service.getNotes()
      .subscribe((data: NOTE[]) => {
        this.notes = data;
      }, error => {
        alert("An unexpected error occured..");
        console.error(error);
    });
  }

  addNote(note: HTMLInputElement){
    if(note.value != "") {
      let body = {
        value : note.value
      };
      this.service.postNote(body)
        .subscribe(data => {
          this.getNotes();
        }, error => {
          alert("An unexpexted error occured");
          console.log(error);
        });
      note.value = "";
    } 
  }

  deleteNote(note_id){
    this.service.deleteNote(note_id)
      .subscribe(data => {
        this.getNotes();
      }, error => {
          alert("An unexpected error occured..");
      });
  }

  pinNote(note_id){
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

}

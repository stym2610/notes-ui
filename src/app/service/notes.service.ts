import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private url = "http://localhost:3000/notes";

  constructor(private http: HttpClient) { }

  getNotes(){
    return this.http.get(this.url);
  }

  postNote(body){
    return this.http.post(this.url, body);
  }

  updateNote(body){
    return this.http.put(this.url + '/' + body.id, body);
  }

  deleteNote(id){
    return this.http.delete(this.url + '/' + id);
  }

}

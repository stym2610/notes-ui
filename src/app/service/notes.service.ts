import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class NotesService {

  // private url = environment.API_URL;

  private url = "https://notes--app-api.herokuapp.com/notes";
  // private url = "http://localhost:3001/notes";

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

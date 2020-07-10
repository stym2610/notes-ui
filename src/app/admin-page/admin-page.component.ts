import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as NotesActions from '../store/actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  storeDataObservable$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit(){
    this.store.dispatch(new NotesActions.GetUsers);
    this.storeDataObservable$ = this.store.select('notesList');
  }
}

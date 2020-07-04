import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent{
  storeObservable$ : Observable<any>;
  isLoading :boolean;
  constructor(private store: Store<any>){
    this.storeObservable$ = this.store.select("notesList");
    this.storeObservable$.subscribe(state => {
      this.isLoading = state.pageLoader;
    });
  } 
}

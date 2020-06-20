import { NotesService } from './service/notes.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { DisplayNoteComponent } from './add-note/display-note/display-note.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/rootreducer';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from './store';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    DisplayNoteComponent,
    SearchPipe
  ],
  entryComponents: [
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ notesList :  rootReducer }),
    EffectsModule.forRoot([NotesEffects]),
    MatDialogModule,
    MatButtonModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

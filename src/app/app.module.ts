import { NotesService } from './service/notes.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { DisplayNoteComponent } from './add-note/display-note/display-note.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    AddNoteComponent,
    DisplayNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

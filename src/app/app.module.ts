import { TokenInterceptor } from './token.interceptor';
import { UserService } from './user.service';
import { AuthGaurd } from './auth-gaurd.service';
import { AuthenticationService } from './authentication.service';
import { NotesService } from './service/notes.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


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
import { HomeComponent } from './home/home.component';
import { NotesRenderComponent } from './notes-render/notes-render.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    DisplayNoteComponent,
    SearchPipe,
    HomeComponent,
    NotesRenderComponent,
    SignupComponent
  ],
  entryComponents: [
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ notesList :  rootReducer }),
    EffectsModule.forRoot([NotesEffects]),
    RouterModule.forRoot([
      { path: '', component: NotesRenderComponent},
      { path: 'login', component: HomeComponent},
      { path: 'signup', component: SignupComponent}
    ]),
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    NotesService, 
    AuthenticationService,
    AuthGaurd,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { AdminPageGaurdService } from './service/admin-page-gaurd.service';
import { LoaderComponent } from './loader/loader.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PopoverModule } from '../../other_modules/popover.module';
import { TokenInterceptor } from './token.interceptor';
import { UserService } from './service/user.service';
import { AuthGaurd } from './service/auth-gaurd.service';
import { AuthenticationService } from './service/authentication.service';
import { NotesService } from './service/notes.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { DisplayNoteComponent } from './add-note/display-note/display-note.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/rootreducer';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from './store';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangeColorComponent } from './change-color/change-color.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminPageComponent } from './admin-page/admin-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AddNoteComponent,
    DisplayNoteComponent,
    SearchPipe,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    ChangeColorComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    AdminPageComponent
  ],
  entryComponents: [
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ notesList :  rootReducer }),
    EffectsModule.forRoot([NotesEffects]),
    RouterModule.forRoot([
      { path: '', component: AddNoteComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgotpassword', component: ForgetPasswordComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'admin', component: AdminPageComponent, canActivate: [] }
    ]),
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    OverlayModule,
    PopoverModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [
    NotesService, 
    AuthenticationService,
    AuthGaurd,
    AdminPageGaurdService,
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

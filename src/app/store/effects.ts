import { UserService } from './../service/user.service';
import { NotesService } from './../service/notes.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as NotesActions from './actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { NOTE } from '../add-note/add-note.component';

@Injectable()
export class NotesEffects {
   constructor(private actions$: Actions, private service: NotesService, private userService: UserService){}

   @Effect() getNotes$ = this.actions$
        .pipe(
            ofType(NotesActions.GET_NOTES),
            mergeMap(() => {
               return this.service.getNotes()
                  .pipe(
                     map((notes: any) => new NotesActions.GetNotesSuccess(notes))
                  )
               }
            )
         );


   @Effect() addNote$ = this.actions$
         .pipe(
            ofType(NotesActions.ADD_NOTE),
            map((action: NotesActions.NotesActionType) => {
               return action.payload
            }),
            mergeMap(payload => {
               return this.service.postNote(payload)
                  .pipe(
                     map((notes: NOTE[]) =>  new NotesActions.AddNoteSuccess(notes))
                  )
            })
         );


   @Effect() updateNote$ = this.actions$
         .pipe(
            ofType(NotesActions.UPDATE_NOTE),
            map((action: NotesActions.NotesActionType) => {
               return action.payload;
            }),
            mergeMap(payload => {
               return this.service.updateNote(payload)
                  .pipe(
                     map((notes: NOTE[]) => new NotesActions.UpdateNoteSuccess(notes))
                  )
            })
         );

   @Effect() changeNoteColor$ = this.actions$
         .pipe(
            ofType(NotesActions.CHANGE_NOTE_COLOR),
            map((action: NotesActions.NotesActionType) => {
               return action.payload;
            }),
            mergeMap(payload => {
               return this.service.updateNote(payload)
                  .pipe(
                     map((notes: NOTE[]) => new NotesActions.ChangeNoteColorSuccess(notes))
                  )
            })
         );
         

   @Effect() deleteNote$ = this.actions$
         .pipe(
            ofType(NotesActions.DELETE_NOTE),
            map((action: NotesActions.NotesActionType) => action.payload),
            mergeMap(payload => {
               return this.service.deleteNote(payload)
                  .pipe(
                     map((notes: NOTE[]) => new NotesActions.DeleteNoteSuccess(notes))
                  )
            })
         );

   @Effect() getUsers$ = this.actions$
         .pipe(
            ofType(NotesActions.GET_USERS),
            mergeMap(() => {
               return this.userService.getAllUsers()
                  .pipe(
                     map(users => new NotesActions.GetUsersSuccess(users))
                  )
            })
         );
}




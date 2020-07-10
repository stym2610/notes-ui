import { Action } from '@ngrx/store';

export type NotesActionType = GetNotes | AddNote | UpdateNote | DeleteNote | GetUsers | Logout;

export const GET_NOTES = 'GET_NOTES';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const CHANGE_NOTE_COLOR = 'CHANGE_NOTE_COLOR';
export const CHANGE_NOTE_COLOR_SUCCESS = 'CHANGE_NOTE_COLOR_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOADING_STARTED = 'LOADING_STARTED';
export const LOADING_COMPLETED = 'LOADING_COMPLETED';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';


export class GetNotes implements Action {
    type = GET_NOTES;
    constructor(public payload?: any){}
}

export class GetNotesSuccess implements Action {
    type = GET_NOTES_SUCCESS;
    constructor(public payload?: any){}
}

export class AddNote implements Action {
    type = ADD_NOTE;
    constructor(public payload? : any){}
}

export class AddNoteSuccess implements Action {
    type = ADD_NOTE_SUCCESS;
    constructor(public payload? : any){}
}

export class UpdateNote implements Action {
    type = UPDATE_NOTE;
    constructor(public payload? : any){}
}

export class UpdateNoteSuccess implements Action {
    type = UPDATE_NOTE_SUCCESS;
    constructor(public payload? : any){}
}

export class DeleteNote implements Action {
    type = DELETE_NOTE;
    constructor(public payload? : any){}
}

export class DeleteNoteSuccess implements Action {
    type = DELETE_NOTE_SUCCESS;
    constructor(public payload? : any){}
}

export class ChangeNoteColor implements Action {
    type = CHANGE_NOTE_COLOR;
    constructor(public payload? : any){}
}

export class ChangeNoteColorSuccess implements Action {
    type = CHANGE_NOTE_COLOR_SUCCESS;
    constructor(public payload? : any){}
}

export class Logout implements Action {
    type = LOGOUT;
    constructor(public payload? : any){}
}

export class LoadingCompleted implements Action {
    type = LOADING_COMPLETED;
    constructor(public payload? : any){}
}

export class LoadingStarted implements Action {
    type = LOADING_STARTED;
    constructor(public payload? : any){}
}

export class RequestFailure implements Action {
    type = REQUEST_FAILURE;
    constructor(public payload? : any){}
}

export class GetUsers implements Action {
    type = GET_USERS;
    constructor(public payload? : any){}
}

export class GetUsersSuccess implements Action {
    type = GET_USERS_SUCCESS;
    constructor(public payload? : any){}
}



import { NOTE } from './../add-note/add-note.component';
import * as NotesActions from './actions'

export interface NOTES {
    notes : NOTE[],
    isLoading: boolean
}

export const INITIAL_STATE = {
    notes: null,
    isLoading: false
}

export function rootReducer(state = INITIAL_STATE, action: NotesActions.NotesActionType) {
    
    switch(action.type){

        case NotesActions.GET_NOTES:
        case NotesActions.ADD_NOTE:
        case NotesActions.DELETE_NOTE:
        case NotesActions.UPDATE_NOTE:
        case NotesActions.CHANGE_NOTE_COLOR:{
            return {
                ...state,
                isLoading: true
            }
        }
        
        case NotesActions.GET_NOTES_SUCCESS:
        case NotesActions.ADD_NOTE_SUCCESS:
        case NotesActions.DELETE_NOTE_SUCCESS:
        case NotesActions.UPDATE_NOTE_SUCCESS:
        case NotesActions.CHANGE_NOTE_COLOR_SUCCESS:{
            return {
                ...state,
                notes : action.payload,
                isLoading: false
            }
        }

        case NotesActions.REQUEST_FAILURE:{
            return {
                ...state,
                notes : action.payload,
                isLoading: false
            }
        }
           
        case NotesActions.LOGOUT:{
            return {
                ...state,
                notes: null
            }
        }          
    }
    return state;
}
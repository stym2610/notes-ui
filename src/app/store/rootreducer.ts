import { NOTE } from './../add-note/add-note.component';
import * as NotesActions from './actions'

export interface NOTES {
    notes : NOTE[],
    syncLoader: boolean,
    pageLoader: boolean
}

export const INITIAL_STATE = {
    notes: null,
    syncLoader: false,
    pageLoader: false
}

export function rootReducer(state = INITIAL_STATE, action: NotesActions.NotesActionType) {
    
    switch(action.type){

        case NotesActions.GET_NOTES:{
            return {
                ...state,
                syncLoader: true,
                pageLoader: true
            }
        }

        case NotesActions.ADD_NOTE:{
            let currentStateNotes = state.notes;
            return{
                ...state,
                syncLoader: true,
                notes: [...currentStateNotes, action.payload]
            }
        }
        
        case NotesActions.UPDATE_NOTE:
        case NotesActions.CHANGE_NOTE_COLOR:{
            return {
                ...state,
                syncLoader: true,
                notes: state.notes.map(note => note.id === action.payload.id ? action.payload : note)
            }
        }

        case NotesActions.DELETE_NOTE:{
            return {
                ...state,
                syncLoader: true,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        }
        
        case NotesActions.GET_NOTES_SUCCESS:
        case NotesActions.ADD_NOTE_SUCCESS:
        case NotesActions.DELETE_NOTE_SUCCESS:
        case NotesActions.UPDATE_NOTE_SUCCESS:
        case NotesActions.CHANGE_NOTE_COLOR_SUCCESS:{
            return {
                ...state,
                notes: action.payload,
                syncLoader: false,
                pageLoader: false
            }
        }

        case NotesActions.REQUEST_FAILURE:{
            return {
                ...state,
                notes : action.payload,
                syncLoader: false,
                pageLoader: false
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
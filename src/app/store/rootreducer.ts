import { NOTE } from './../add-note/add-note.component';
import * as NotesActions from './actions'

export interface NOTES {
    notes : NOTE[]
}

export const INITIAL_STATE = {
    notes: null,
    searchString: ''
}

export function rootReducer(state = INITIAL_STATE, action: NotesActions.NotesActionType) {
    
    switch(action.type){
        
        case NotesActions.GET_NOTES_SUCCESS: 
            return {
                ...state,
                notes : action.payload
            }
        
        case NotesActions.ADD_NOTE_SUCCESS:
            return {
                ...state,
                notes : action.payload
            }

        case NotesActions.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes : action.payload
            } 
          
        case NotesActions.UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                notes : action.payload
            }
        case NotesActions.LOGOUT:
            return {
                ...state,
                notes: null
            }       
          
        // case NotesActions.UPDATE_NOTE: 
        //     return {
        //         ...state,
        //         notes : [...state.notes, action.payload]
        //     } 
            
        // case NotesActions.DELETE_NOTE: 
        //     return {
        //         ...state,
        //         notes : [...state.notes, action.payload]
        //     }    
    }
    return state;
}
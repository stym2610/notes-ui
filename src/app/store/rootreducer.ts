import { NOTE } from './../add-note/add-note.component';
import * as NotesActions from './actions'

export interface NOTES {
    notes : NOTE[],
    syncLoaderCount: number,
    pageLoader: boolean
}

export const INITIAL_STATE = {
    notes: null,
    syncLoaderCount: 0,
    pageLoader: false
}

function incrementSyncLoaderCount(loaderCount){
    return loaderCount + 1;
}

function decrementSyncLoaderCount(loaderCount){
    return loaderCount === 0 ? 0 : loaderCount - 1;
}

export function rootReducer(state = INITIAL_STATE, action: NotesActions.NotesActionType) {
    
    switch(action.type){

        case NotesActions.GET_NOTES:{
            return {
                ...state,
                syncLoaderCount: incrementSyncLoaderCount(state.syncLoaderCount),
                pageLoader: true
            }
        }

        case NotesActions.ADD_NOTE:{
            let currentStateNotes = state.notes;
            return{
                ...state,
                syncLoaderCount: incrementSyncLoaderCount(state.syncLoaderCount),
                notes: [...currentStateNotes, action.payload]
            }
        }
        
        case NotesActions.UPDATE_NOTE:
        case NotesActions.CHANGE_NOTE_COLOR:{
            return {
                ...state,
                syncLoaderCount: incrementSyncLoaderCount(state.syncLoaderCount),
                notes: state.notes.map(note => note.id === action.payload.id ? action.payload : note)
            }
        }

        case NotesActions.DELETE_NOTE:{
            return {
                ...state,
                syncLoaderCount: incrementSyncLoaderCount(state.syncLoaderCount),
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
                syncLoaderCount: decrementSyncLoaderCount(state.syncLoaderCount),
                pageLoader: false
            }
        }

        case NotesActions.REQUEST_FAILURE:{
            return {
                ...state,
                notes : action.payload,
                syncLoaderCount: decrementSyncLoaderCount(state.syncLoaderCount),
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
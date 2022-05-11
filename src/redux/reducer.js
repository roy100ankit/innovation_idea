import {GET_PROJECTS} from './actionTypes'
import {ADD_PROJECT} from './actionTypes'

const initialState={
    projects:[],
    projectDetail:{},
    loading: true,
}

const projectReducers = (state=initialState, action)=>{
    switch(action.type){
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading:false
            }
        case ADD_PROJECT:
            return {
                ...state,
                laoding:false
            }
        default:
            return state;    
    }
}

export default projectReducers;
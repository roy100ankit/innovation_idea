import {GET_PROJECTS, LOAD_SUCCESS} from './actionTypes'
import {ADD_PROJECT} from './actionTypes'

const initialState={
    projects:[],
    projectDetail:{},
    loading: true,
    success:false,
    error:false,
    message:''
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
                loading:false
            }
        // case EDIT_PROJECT:
        //     return {
        //         ...state,
        //         loading:false,
        //         success:true
        //     }   
        case LOAD_SUCCESS:
            return {
                ...state,
                loading:false,
                error:false,
                success:true,
                message:action.payload
            } 
        default:
            return state;    
    }
}

export default projectReducers;
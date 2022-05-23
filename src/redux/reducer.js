import {GET_PROJECTS, LOAD_SUCCESS} from './actionTypes'
import {ADD_PROJECT} from './actionTypes'
import { EDIT_PAGE } from './actionTypes'
import { NO_DATA } from './actionTypes'
const initialState={
    projects:[],
    projectDetail:{},
    loading: true,
    success:false,
    error:false,
    message:'',
    editPage:false,
    noData:false
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
        case EDIT_PAGE :{
           return{
               ...state,
               editPage:action.editPage
           }

        }
        case NO_DATA :{
            return{
                ...state,
                noData:action.noData
            }
 
         }     
        default:
            return state;    
    }
}

export default projectReducers;
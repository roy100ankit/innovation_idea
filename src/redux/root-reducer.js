import {combineReducers} from 'redux'
import projectReducers from './reducer'

const rootReducer = combineReducers({
    data: projectReducers
})

export default rootReducer
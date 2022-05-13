import {GET_PROJECTS, LOAD_SUCCESS} from './actionTypes'
import {ADD_PROJECT} from './actionTypes'

const getProjects = projects =>{
    return{
        type:GET_PROJECTS,
        payload:projects,
    }
}

const projectAdded = () =>{
    return{
        type:ADD_PROJECT
    }
}

const loadSuccess = (message) => {
    return {
        type:LOAD_SUCCESS,
        payload:message
    }
}
export const loadUsers = ()=>{
    return function(dispatch){
        const reqData={
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',  
                mode:'no cors' 
            }
    
          }
    
          fetch('http://localhost:8080/get-product-details',reqData) 
          .then(response => response.json()) 
          .then(res => {
            console.log('Response in Load USers', res)
            dispatch(getProjects(res.projectRecords))
            // this.setState({task:data.projectRecords})
          }) 
          .catch(error => {
            console.log(error);
    
         })
    }
}

export const addProject = (data)=>{
    return function(dispatch){
        const reqOpt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        
          fetch('http://localhost:8080/add-product-details',reqOpt) 
          .then(response => response.json()) 
          .then(res => {
            console.log('Response in Load USers', res)
            dispatch(projectAdded())
           dispatch(loadUsers())
          }) 
          .catch(error => {
            console.log('POST api error',error);
    
         })
    }
}
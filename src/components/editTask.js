import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {Formik,Field, Form} from 'formik';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import DatePicker from "react-datepicker";  
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "react-datepicker/dist/react-datepicker.css"; 
import axios from 'axios'
import { addProject } from '../redux/actions';
import { loadUsers, editClick } from '../redux/actions';
import {useDispatch,useSelector} from 'react-redux'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root':{
    width:'70%',
    
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  height: 'auto',
  padding: '11px',
  color: theme.palette.text.secondary,
  backgroundColor:'#e2edf6'
  }));
 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



export default function EditTask(props) {
  const [open, setOpen] = React.useState(false);
  const [complexity, setComplexity] = React.useState('');
  const [teamMember, setTeamMember] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [phase, setPhase] = React.useState('Not Started');
  const [projectStatus, setProjectStatus] = React.useState(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  let dispatch = useDispatch();
  const {editPage} = useSelector(state=> state.data)
 console.log('editPage', editPage)
  const initialValues={
    projectId:props.data.projectId || '',
    projectTitle:props.data.projectTitle|| '',
    projectDescription:props.data.projectDescription|| '',
    status:props.data.status || '',
    complexity:props.data.complexity || '',
    usefulInfo:props.data.usefulInfo || '',
    comments:props.data.comments || '',
    submittedBy:props.data.submittedBy || '',
    teamMember:props.data.teamMember || ''
    // projectPhase:[]

  }
  const [formValues, setFormValues] = useState(initialValues)
  const  [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const  [fieldError, setFieldError] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {success} = useSelector(state=> state.data)

//   useEffect(()=>{
//     if(props.edit===true && open===false){
//         setOpen(props.edit)
//       }
//   },[props.edit])
   
//   useEffect((open)=>{
//      if(open===true){
//          setOpen(false)
//      }
//   },[open])

  const complexityLevel = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
        value: '5',
        label: '5',
    }
  ];const projectPhase = [
    {
      value: 'Not Started',
      label: 'Not Started',
    },
    {
      value: 'Planned',
      label: 'Planned',
    },
    {
      value: 'In Progress',
      label: 'In Progress',
    },
    {
      value: 'Completed',
      label: 'Completed',
    },
    {
        value: 'Blocked',
        label: 'Blocked',
    }
  ];
  const teamMemberList=[
    {name:'Amol Sathewad', value:1},
    {name:'G Manikanta Sai', value:2},
    {name:'Aishwarya Muktewar', value:3},
    {name:'Prashant Jha', value:4},
    {name:'Sagar Bhosle', value:5},
    {name:'Rafi Dudekula', value:6},
    {name:'Ankit Roy', value:7}
  ]

  const handleClickOpen = () => {
    setOpen(true);
    // setFormValues.projectTitle(CardTemplate.title);
  };

  const selectChange = (event) => {
   // setCurrency(event.target.value);
   // setPhase(event.target.value);
  };
  const selectChange1 = (event) => {
    setPhase(event.target.value);
  };
  const handleChange = (e)=>{
    console.log(e.target)
    const {name,value} = e.target
    setComplexity(e.target.value)
    // console.log('name,value', name,value)
    setFormValues({...formValues,[name]:value})
  }
  const handleClose = () => {
    // setOpen(false)
    dispatch(editClick(false))
    setFormValues(initialValues)
    setFormErrors({})
    setIsSubmit(false)
    //setOpen(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onSubmit = (e) =>{
    e.preventDefault()
    setFormErrors(validate(formValues))
    if(formValues.projectTitle == ''){
      setIsSubmit(true)
      setOpen(true);
    }else if(formValues.comments == ''){
      setIsSubmit(true)
      setOpen(true);
    }else if(formValues.submittedBy == ''){
      setIsSubmit(true)
      setOpen(true);
    }else if( formValues.projectDescription.length < 20){
      setIsSubmit(true)
      setOpen(true);
    }else if(formValues.projectDescription == ''){
     // console.log(formValues.projectDescription.length)
      setIsSubmit(true)
      setOpen(true);
    }else{
    console.log('value',formValues)
    setIsSubmit(false)
    setOpen(false);
    }
    console.log('formvalues', formValues)
    if((Object.keys(formErrors).length===0) ){
        const reqOpt = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formValues)
        };
        
          fetch('http://localhost:8080/update-product-details',reqOpt) 
          .then(response => response.json()) 
          .then(res => {
            console.log('Response in Load USers', res)
            dispatch(editClick(false))
           dispatch(loadUsers())
          }) 
          .catch(error => {
            console.log('POST api error',error);
    
         })
    // dispatch(addProject(formValues))
    // setFormValues(initialValues)
    // setFormErrors({})
    }
    
  }
  useEffect(()=>{
    if((Object.keys(formErrors).length===0) && isSubmit){

    }
    setIsSubmit(false)
  },[formErrors])
  const validate = (values) =>{
    const errors ={}
   
    if(!values.projectTitle){
      errors.projectTitle= "Project Title is required"
    }
    if(!values.submittedBy){
      errors.submittedBy= "This field should not be empty"
    }
    if(!values.comments){
      errors.comments= "Please mention any comments"
    }
    // if(!values.AutocompleteprojectDescription){
    //   errors.projectDescription= "Description should by atleast 20 characters"
    // }
    if(values.projectDescription.length < 20 ){
      errors.projectDescription= "Description should by atleast 20 characters"
    }
    console.log('errors',errors)
    return errors
    }

    console.log('teamMember in final', teamMember)
    console.log('initialValues in final', initialValues)
  return (
    <div>
      {/* <Button onClick={handleClickOpen} style={{padding:'0px'}}>
      <AddCircleIcon color="primary" baseClassName="fas" className="fa-plus-circle"/>
      </Button> */}
      <BootstrapDialog
       onClick={handleClickOpen}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={editPage}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{
            setOpen(false)
            handleClose()
        }}>
          Edit Project
        </BootstrapDialogTitle>
  
      <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display:'flex',
                flexDirection:'column',
                width:'auto',
                margin:'2%'
            }}
            noValidate
            autoComplete="off"
        >
          <form class="row g-3" style={{marginLeft:'5px'}}>
           <div class="col-md-6">
          <div class="col-md-6">
          <TextField id="standard-basic" label="Project Title" 
        variant="standard" 
        name="projectTitle"
        size="small"
        value={formValues.projectTitle}
        onChange={handleChange}
  
        />
        {formErrors.projectTitle? <div style={{color:'red', fontSize:'10px', marginLeft:'10px'}}>{formErrors.projectTitle}</div> : null}
        </div>
        
        <div class="col-md-12">
        {/* <TextField
          id="standard-multiline-flexible"
          label="Comments"
          multiline
          maxRows={4}
          size="small"
          value={formValues.comments}
          onChange={handleChange}
        /> */}
        <TextField
          id="standard-multiline-flexible"
          label="Comments"
          multiline
          maxRows={4}
          size="small"
          name="comments"
           value={formValues.comments}
          onChange={handleChange}
          variant="standard"
        />
        {formErrors.comments? <div style={{color:'red', fontSize:'10px', marginLeft:'10px'}}>{formErrors.comments}</div> : null}
        </div>
        <div class="col-md-6">
        <TextField id="standard-basic" 
        label="Submitted By" 
        variant="standard"
        name='submittedBy' 
        size="small"
        value={formValues.submittedBy}
        onChange={handleChange} 
        />
        {formErrors.submittedBy? <div style={{color:'red',fontSize:'10px', marginLeft:'10px'}}>{formErrors.submittedBy}</div> : null}
        </div>

        <div class="col-md-12">
        <TextField
          id="standard-multiline-flexible"
          label="Useful Info"
          multiline
          maxRows={4}
          size="small"
          name="usefulInfo"
          value={formValues.usefulInfo}
          onChange={handleChange}
          variant="standard"
        />
        </div>
        <div class="col-md-6">
        <TextField
          id="outlined-multiline-static"
          label="Project Description"
          multiline
          rows={4}
          // error={fieldError}
          name="projectDescription"
          value={formValues.projectDescription}
          onChange={handleChange}
          // helperText="Incorrect entry."
          size="small"
          defaultValue=""
        />
        {formErrors.projectDescription? <div style={{color:'red', fontSize:'10px', marginLeft:'10px'}}>{formErrors.projectDescription}</div> : null}
        </div>
        </div> 
        <div class="col-md-6">
        <div class="col-md-12">
        <TextField
          id="standard-select-currency"
          select
          label="Complexity"
          name="complexity"
          value={complexity}
          onChange={handleChange}
          helperText="Please select complexity"
          variant="standard"
        >
          {complexityLevel.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
         
        </TextField>
        </div> 
        {/* <div class="col-md-12">
        <TextField
         // id="standard-select-projectPhase"
          select
          label="projectPhase"
          value={phase}
          onChange={selectChange1}
          helperText="Please select projectPhase"
          variant="standard"
        >
          {projectPhase.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
         
        </TextField>
        </div> */}
        
        <div class="col-md-12">
        <Autocomplete
        multiple
        id="tags-standard"
        name="teamMember"
        label="teamMember"
        options={teamMemberList}
        value={teamMember}
        onChange={(event, newValue) => {
         // console.log('event, newValue',event, newValue)
          setTeamMember(newValue);
          console.log('teamMember', teamMember)
          setFormValues({...formValues,teamMember:newValue})
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          // console.log('event, newInputValue',event, newInputValue)
          setInputValue(newInputValue);
        }}
        // onInputChange={handleChange}
        getOptionLabel={(option) => option.name}
        // defaultValue={}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Team Members"
            placeholder="Team Members"
          />
        )}
      />
        </div>
        {/* <div class="col-md-12">
        <Autocomplete
        multiple
        id="tags-standard"
        options={projectPhase}
        getOptionLabel={(option) => option.name}
        // defaultValue={}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="project Phase"
            placeholder="project Phase"
          />
        )}
      />
        </div> */}
        <div class="col-md-12" style={{marginLeft:'8px'}}>
          <div>Start date</div>
        <DatePicker
        selected={startDate} 
        onChange={(date) => setStartDate(date)} />
        </div>
        <p></p>
        <div class="col-md-12" style={{marginLeft:'8px'}}>
          <div>End date</div>
        <DatePicker
        selected={endDate} 
        onChange={(date) => setEndDate(date)} />
        </div>
        </div>
        <div class="col-md-12">
        <DialogActions>
          <Button autoFocus variant='contained' onClick={onSubmit}>
            Submit
          </Button>
        </DialogActions>
        </div>
          </form>
        </Box>
       
        {/* </form> */}
       
      </BootstrapDialog>
    </div>
  );
}
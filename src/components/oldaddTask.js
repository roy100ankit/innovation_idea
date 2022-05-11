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
import axios from 'axios';


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



export default function AddTask() {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState('0');

  const initialValues={
    projectTitle:'',
    projectDescription:'',
    status:'Not started',
    complexity:'',
    usefulInfo:'',
    comments:'',
    submittedBy:'',
    teamMember:[]

  }
  const [formValues, setFormValues] = useState(initialValues)
  const  [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const  [fieldError, setFieldError] = useState(false)
  
  const currencies = [
    {
      value: '1',label: '1',
    },
    {
      value: '2',label: '2',
    },
    {
      value: '3',label: '3',
    },
    {
      value: '4',label: '4',
    },
    {
        value: '5',label: '5',
    }
  ];
  const teamMember=[
    {name:'Amol Sathewad', id:1},
    {name:'G Manikanta Sai', id:2},
    {name:'Aishwarya Muktewar', id:3},
    {name:'Prashant Jha', id:4},
    {name:'Sagar Bhosle', id:5},
    {name:'Rafi Dudekula', id:6},
    {name:'Ankit Roy', id:7}
  ]
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const selectChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleChange = (e)=>{
    console.log(e.target)
    const {name,value} = e.target
   
    setFormValues({...formValues,[name]:value})
  }
  const handleClose = () => {
    setFormValues(initialValues)
    setFormErrors({})
    setIsSubmit(false)
    setOpen(false);
  };
  const onSubmit = (e) =>{
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
    console.log('Final Payload', formValues)
    if((Object.keys(formErrors).length===0) ){
      axios.post('http://localhost:8080/add-product-details',formValues)
      .then(res=>{

      })
    }
    // console.log('value', values)
  }
  useEffect(()=>{
    if((Object.keys(formErrors).length===0) && isSubmit){

    }
    setIsSubmit(false)
  },[formErrors])
  const validate = (values) =>{
    const errors ={}
    console.log('values', values.projectDescription.length)
    if(!values.projectTitle){
      errors.projectTitle= "Project Title is required"
    }
    if(!values.submittedBy){
      errors.submittedBy= "This field should not be empty"
    }
    if(!values.comments){
      errors.comments= "Please mention any comments"
    }
    if(!values.projectDescription){
      errors.projectDescription= "Description should be atleast 20 characters"
    }
    if(values.projectDescription> 20){
      errors.projectDescription= "Description should be atleast 20 characters"
    }
    console.log('errors',errors)
    return errors
    }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      <AddCircleIcon color="primary" baseClassName="fas" className="fa-plus-circle"/>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Task
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
        {/* <div class="col-md-6">
        <TextField
          id="standard-select-currency"
          select
          label="Complexity"
          value={currency}
          size="small"
          onChange={selectChange}
          helperText="Please select complexity"
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div> */}
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
          // value={formValues.comments}
          onChange={handleChange}
          variant="standard"
        />
        {/* {formErrors.comments? <div style={{color:'red'}}>{formErrors.comments}</div> : null} */}
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

        {/* <div class="col-md-6">
        <Autocomplete
        multiple
        id="tags-standard"
        options={teamMember}
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
        </div> */}
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
          value={currency}
          defaultValue={''}
          onChange={selectChange}
          helperText="Please select complexity"
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div> 
        <div class="col-md-12">
        <Autocomplete
        multiple
        id="tags-standard"
        options={teamMember}
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
        </div>
        <div class="col-md-10">
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

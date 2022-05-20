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
// import DatePicker from "react-datepicker";  
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './datePicker.css'
import "react-datepicker/dist/react-datepicker.css"; 
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';


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
  const [currency, setCurrency] = React.useState('3');
  const [phase, setPhase] = React.useState('Not Started');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const initialValues={
    projectTitle:'',
    projectDescription:'',
    status:'Not started',
    complexity:'',
    usefulInfo:'',
    comments:'',
    submittedBy:'',
    teamMember:[],
    // projectPhase:[]

  }
  const [formValues, setFormValues] = useState(initialValues)
  const  [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const  [fieldError, setFieldError] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const currencies = [
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
  ];
  
  const projectPhase = [

      {
  
        value: 'Not-Started',
  
        label: 'Not-Started',
  
      },
  
      {
  
        value: 'Planning',
  
        label: 'Planning',
  
      },
  
      {
  
        value: 'In-Progress',
  
        label: 'In-Progress',
  
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
  
  const teamMember=[
    {name:'Amol Sathewad', id:1},
    {name:'G Manikanta Sai', id:2},
    {name:'Aishwarya Muktewar', id:3},
    {name:'Prashant Jha', id:4},
    {name:'Sagar Bhosle', id:5},
    {name:'Rafi Dudekula', id:6},
    {name:'Ankit Roy', id:7}
  ]
  // const projectPhase=[
  //   {name:'Not Started', id:1},
  //   {name:'Planned', id:2},
  //   {name:'Eecution', id:3},
  //   {name:'Deployed', id:4},
  //   {name:'Discard', id:5}
  // ]
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const handleDateChange1 = (date) => {
    console.log(date);
    setEndDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const selectChange = (event) => {
    setCurrency(event.target.value);
   // setPhase(event.target.value);
  };
  const selectChange1 = (event) => {
    setPhase(event.target.value);
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
    if(formValues.projectTitle == ''){
      setIsSubmit(true)
      setOpen(true);
    }else if(formValues.comments == ''){
      setIsSubmit(true)
      setOpen(true);
    }else if(value == ''){
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
    if(!values.value){
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
           value={formValues.comments}
          onChange={handleChange}
          variant="standard"
        />
        {formErrors.comments? <div style={{color:'red', fontSize:'10px', marginLeft:'10px'}}>{formErrors.comments}</div> : null}
        </div>
        <div class="col-md-6">
        {/* <input 
                type='text'
                value={value}
                onChange={(e) => {
                    const onlyLetters = e.target.value.replace(/[^a-zA-Z]/g, '');
                    setValue(Array.from(new Set(onlyLetters.split(''))).join(''));
                }}
            /> */}
        <TextField id="standard-basic" 
        label="Submitted By" 
        variant="standard"
        name='submittedBy' 
        size="small"
        value={value}
        onChange={(e) => {
          const onlyLetters = e.target.value.replace(/[^a-zA-Z]/g, '');
          setValue(Array.from(new Set(onlyLetters.split(''))).join(''));
      }}
        />
        {!value? <div style={{color:'red',fontSize:'10px', marginLeft:'10px'}}>{formErrors.submittedBy}</div> : null}
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
        <div class="col-md-6" id='main'>
        <div class="col-md-12">
        <TextField
          id="standard-select-currency"
          select
          label="Please select complexity"
          value={currency}
          onChange={selectChange}
         // helperText="Please select complexity"
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
        <TextField
         // id="standard-select-projectPhase"
          select
          label="Please select projectPhase"
          value={phase}
          onChange={selectChange1}
         // helperText="Please select projectPhase"
          variant="standard"
        >
          {projectPhase.map((option) => (
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
        <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Start Date"
        value={value1}
        onChange={(newValue) => {
          setValue1(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="End Date"
        value={value2}
        onChange={(newValue) => {
          setValue2(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
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
          {/* <div>Start date</div> */}
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
          label="Start Date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        
      </MuiPickersUtilsProvider> */}
 
        </div>
        <div class="col-md-12" style={{marginLeft:'8px',borderBottomColor:'red'}}>
          
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
          label="End Date"
          value={endDate}
          onChange={handleDateChange1}
        />
        
      </MuiPickersUtilsProvider> */}
{/* <div style={{borderColor:'white',borderWidth:5,color: '#989A9B'}}>Start date</div>
        <DatePicker 
        style={{borderColor:'white',borderWidth:5,width: '5%'}}
        selected={startDate} 
        onChange={(date) => setStartDate(date)} /> */}
        </div>
        {/* <div class="col-md-12" style={{marginLeft:'8px'}}>
          <div style={{borderColor:'white',borderWidth:5,color: '#989A9B'}}>End date</div>
        <DatePicker style={{TextDecoder:null}}
        selected={endDate} 
        placeholder='date'
        onChange={(date) => setEndDate(date)} />
        </div> */}
        </div>
        <div class="col-md-10">
        <DialogActions>
          <Button style={{backgroundColor:'#0d6efd'}} autoFocus variant='contained' onClick={onSubmit}>
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

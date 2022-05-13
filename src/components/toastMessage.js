import React, {useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useDispatch,useSelector} from 'react-redux'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ToastMessage() {
  const [open, setOpen] = React.useState(true);
  const {error,success} = useSelector(state=> state.data)
  console.log('error34', error)
  useEffect(()=>{
    
    setTimeout(()=>{
        setOpen(false)
    },4000)
},[])
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <div>

           {
               success ?
               <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
            </Alert>
        </Snackbar>
        : null}
      </div>
  );
}

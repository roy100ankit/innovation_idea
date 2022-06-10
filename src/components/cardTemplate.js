
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { padding } from '@mui/system';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateTask from './updateTask'
import EditTask from './editTask'
import {useDispatch,useSelector} from 'react-redux'
import { loadUsers } from '../redux/actions';
import {editClick}  from '../redux/actions'
import { Box } from '@mui/material';
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Dialpad } from '@mui/icons-material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  boxShadow:'none',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const initialValues={
  projectTitle:'',
  projectDescription:'',
  status:'Not Started',
  complexity:'',
  usefulInfo:'',
  comments:'',
  submittedBy:'',
  teamMember:'',
  startDate:'',
  endDate:''
  // projectPhase:[]
  
  }
  
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
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

export default function CardTemplate(props) {
  let dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popOver, setPopOver] = React.useState(null);
  const [comments, setComments] = React.useState('')
  const [addComment, setAddComment] = React.useState('')
  const [openComment, setOpenComment] = React.useState(false);
  const [commentArray, setCommentArray] = React.useState([]);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);

  useEffect( () => {
    console.log("commentArray",commentArray)
    const reqOpt2 = {
      method: "GET",
      headers: { "Content-Type": "application/json", mode: "no cors" },
    };
  

      fetch(`http://localhost:8080/get-product-details/${props.item.projectId}`,reqOpt2).then((result)=>{
        result.json().then((resp)=>{
          console.log("resp",resp);
          console.log("resp.comments",resp.comments)
          setCommentArray(resp.comments);
        })
      })
  },
  [commentArray] 
  ) 

  const handleComment =(e) =>{
    console.log(e.target)
    setAddComment(e.target.value)
  }

  const commentAdd =() => {
    setAddComment('')
    const reqData2={
      method: 'PUT',
      headers:{
          'Content-Type' : 'application/json',
          mode:'no cors'},
          body:JSON.stringify(
            {
              projectId: props.item.projectId,
              projectTitle:props.item.projectTitle,
              projectDescription:props.item.projectDescription,
              status:props.item.status,
              complexity:props.item.complexity,
              usefulInfo:props.item.usefulInfo,
              comments: [
                {
                    comment: addComment
                }
              ],
              submittedBy:props.item.submittedBy,
              teamMember:props.item.teamMember,
              startDate:props.item.startDate,
              endDate:props.item.endDate

            }
          )
      
      
    }

    fetch(`http://localhost:8080/update-product-details`,reqData2)
    .then((result)=>{
      result.json().then((resp)=>{
        console.log("resp",resp);
        // setCommentArray(resp.comments);
      })})
      
  }

  const commentAction = () => {
    setOpenComment(true);
    const reqOpt2 = {
      method: "GET",
      headers: { "Content-Type": "application/json", mode: "no cors" },
    };
  

      fetch(`http://localhost:8080/get-product-details/${props.item.projectId}`,reqOpt2).then((result)=>{
        result.json().then((resp)=>{
          console.log("resp",resp);
          console.log("resp.comments",resp.comments)
          setCommentArray(resp.comments);
        })
      })
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenComment(false);
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChange = (e) =>{
    const {name,value} = e.target
    setComments(value)
  }
  const [open1, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [projectStatus, setProjectStatus] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const openPopOver = Boolean(popOver);
  const id = open ? 'simple-popover' : undefined;

    const handleClose1 = () => {
      setOpen(false);
    };

    const statusAction = () => {
      let nextStatus = ''
      if(props.item.status==='Not Started' && status==='Approve'){
        nextStatus = 'Planning'
      }
      else if(props.item.status==='Planning' && status==='Approve'){
        nextStatus = 'In Progress'
      }
      else if(props.item.status==='In Progress' && status==='Approve'){
        nextStatus = 'Completed'
      }
      else {
        nextStatus = 'Blocker'
      }
      console.log('nextStatus', nextStatus)
      const reqOpt = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',mode:'no cors'  },
        body: JSON.stringify({
          "projectId": props.item.projectId,
          "status": nextStatus,
          "comments": comments
        })
    };
    
    if(comments.length>0){
      setOpen(false);
      fetch('http://localhost:8080/accept-reject-product-details',reqOpt) 
      .then(response => response.json()) 
      .then(res => {
        console.log('Response in Load USers', res)
         dispatch(loadUsers())
      }) 
      .catch(error => {
        console.log(error);

     })
    }
    }

  return (
    <Card sx={{ maxWidth: 345, height:"auto",padding:'3px' }}>
      <CardContent sx={{padding:'11px' }}>
      <div class="row g-3" style={{maxWidth:'inherit'}}>
        <div class="col-md-10" style={{textAlign:'initial'}}>
        <Typography variant="h6" component="div" color="#2e4f90">
        {props.item.projectTitle}
      </Typography>
        
        <Typography sx={{ color: 'text.secondary', display: 'inline', fontSize: 12  }} color="text.secondary">
          {props.item.projectId}
      </Typography>
        </div>;
        <div class="col-md-1" style={{display:'flex', justifyContent:'space-between',marginLeft:'-4px'}}>
          {/* <div class="row">
        <IconButton aria-label="settings">
          <MoreVertIcon onClick={handleClick}/>
                <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={ ()=>{setOpen(true)
            setStatus("Approve")}}>Approve</MenuItem>
            <MenuItem onClick={ ()=>{setOpen(true)
            setStatus("Reject")}}>Reject</MenuItem>
            <MenuItem onClick={ ()=>{setOpen(true)
            setStatus("Update")}}>Edit</MenuItem>
          </Menu>     
              </IconButton>
              </div>
              <div class="row">
             {props.status !== 'Not Started' ?<Avatar sx={{ bgcolor:  red[500] ,width: 24, height: 24}}>A</Avatar>: null}
             </div>            */}
             <Stack spacing={2} sx={{alignItems:'center'}}>
               <Item> <IconButton aria-label="settings">
          <MoreVertIcon onClick={handleClick}/>
                <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={ ()=>{setOpen(true)
            setStatus("Approve")}}>Approve</MenuItem>
            <MenuItem onClick={ ()=>{setOpen(true)
            setStatus("Reject")}}>Reject</MenuItem>
            <MenuItem onClick={ ()=>{dispatch(editClick(true))
              setProjectStatus("Edit")}}>Edit</MenuItem>
              <EditTask data={props.item}/>
               {/* <EditTask edit={edit} data={props.item}/> */}
          </Menu>     
              </IconButton>
              </Item>
               {/* <Item> {props.status !== 'Not Started' ?<Avatar sx={{ bgcolor:  red[500] ,width: 24, height: 24}}>A</Avatar>: null}</Item> */}
             </Stack>
        </div>
        </div>
        <div class="row g-3" style={{maxWidth:'inherit'}}>
      <div class="col-md-12" style={{marginTop:'30px'}}>
      {/* <Item> {props.status !== 'Not Started' ?<Avatar sx={{ bgcolor:  red[500] ,width: 24, height: 24}}>A</Avatar>: null}</Item> */}
      <Item> {props.status !== 'Not Started' ?<Chip size="small" label="Active" color="success" />: null}</Item>
      </div>
       
        </div>
        {/* <CardActions>
      {props.status !== 'Not Started' ? <Chip label="success" color="success" />: null}
        </CardActions> */}
      </CardContent>
      {/* <UpdateTask edit={edit} data={props.item}/> */}
      {/* <EditTask data={props.item}/> */}
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Are you sure to {status} this project?</DialogTitle>
        <DialogContent>
        Project Id : {props.item.projectId}<br/>
        Project Name : {props.item.projectTitle}<br/>
        Status : {props.item.status}


          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            type="text"
            name="comments"
            value={comments}
            onChange={handleChange}
            inputProps={{ maxLength: 11 }}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={statusAction}>{status}</Button>
        </DialogActions>
      </Dialog>
      <div>
    <BootstrapDialog
      onClose={handleClose}
      open={openComment}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>{
            handleClose()
        }}>
        Comment History
      </BootstrapDialogTitle>
      <DialogContent>
      <Box style={{marginLeft : '-17px'}}
    component="form"
    sx={{
      '& > :not(style)': { m: 1 },
    }}
    noValidate
    autoComplete="off"
  >
    <div class="row g-3" style={{display:'flex', flexDirection:'row', maxWidth:'inherit'}}>
      <div class="col-md-10">
      <TextField 
        id="outlined-basic" 
        label="Comment" 
        variant="outlined" 
        name="addComment"
        value={addComment} 
        onChange={ handleComment} 
        style={{width:450}}
          />
      </div>
      <div class="col-md-2" style={{ marginTop :'25px', paddingLeft: '35px' }}>
      <Button variant="contained" size='small' onClick={commentAdd}>Add</Button>
      </div>
      </div>
      </Box>

<TableContainer component={Paper}>
<Table sx={{ minWidth: 500 }} aria-label="simple table">
<TableHead>
  <TableRow>
    <TableCell><b>Comment</b> </TableCell>
    <TableCell align="right"><b>Submitted By</b></TableCell>
    <TableCell align="right"><b>Date</b></TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {commentArray.map((row) => (
    
    <TableRow
      key={row}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.comment}
      </TableCell>
      <TableCell align="right">{row.userName}</TableCell>
      <TableCell align="right">{row.commentDate}</TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>
</TableContainer>
        
      </DialogContent>
    </BootstrapDialog>
  </div>
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <DateRangeIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        
        {/* <Button aria-describedby={id} variant="contained" onClick={ (event)=> setPopOver(event.currentTarget)}>
        <CommentIcon color="primary"/>
      </Button> */}
      <CommentIcon color="primary"  onClick={ (event)=>commentAction()}/>
      <Popover
        id={id}
        open={openPopOver}
        anchorEl={popOver}
        onClose={() => setPopOver(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{props.item.comments}</Typography>
      </Popover>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        
       
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
        <Typography paragraph>Project Description:</Typography>
        <div style={{display:'flex',justifyContent:'space-between'}}>
         <Typography variant="body2" color="text.secondary" sx={{overflowWrap:'anywhere',marginBottom:'revert'}}>
            {props.item.projectDescription}
          </Typography>
        </div>       
        {/* </CardContent>
        <CardContent> */}
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <Typography gutterBottom variant="h8" component="div">
          Project ID 
        </Typography>
          </div>
        <div>
          <Typography variant="body2" color="text.secondary">
          {props.item.projectId}
        </Typography>
        </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
          <Typography gutterBottom variant="h8" component="div">
          Started At
        </Typography>
          </div>
        <div>
          <Typography variant="body2" color="text.secondary">
          {props.item.startDate}
        </Typography>
        </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <Typography gutterBottom variant="h8" component="div">
          Complexity 
        </Typography>
          </div>
        <div>
          <Typography variant="body2" color="text.secondary">
          {props.item.complexity}
        </Typography>
        </div>
        </div>
        </div>
      </CardContent>
      <CardActions>
        <div class ="" >
      <Stack spacing={2} sx={{padding : "10px", display: "contents"}} direction="row">
        {
          props.item && props.item.comments.length >0 ?
          props.item.teamMember.map(e=>{
            return(
              <Chip label={e.teamMemberName} variant="outlined"/>
            )
          }):
          null
          
        }
         {/* {
          props.item && props.item.tags.length >0 ?
          props.item.tags.forEach(e=>{
            return(
              <Chip label={e} />
            )
          }):
          null
        } */}
         {/* <Chip label={'sdfd'} />
         <Chip label={'sdfsdf'} variant="outlined"/>
         <Chip label={'sdgdfs'} />
         <Chip label={'sdfsdf'} variant="outlined"/>
         <Chip label={'sdgdfs'} />
         <Chip label={'sdgdfs'} />
         <Chip label={'sdfsdf'} variant="outlined"/>
         <Chip label={'sdgdfs'} /> */}
      </Stack>
      </div>
      </CardActions>
      </Collapse>
    </Card>
  );
}

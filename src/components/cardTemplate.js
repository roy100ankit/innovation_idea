
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

export default function CardTemplate(props) {
  let dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popOver, setPopOver] = React.useState(null);
  const [comments, setComments] = React.useState('')
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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

  return (
    <Card sx={{ maxWidth: 345, height:"auto",padding:'3px' }}>
      <CardContent>
      <div class="row g-3">
        <div class="col-md-9">
        <Typography variant="h6" component="div" color="#2e4f90">
        {props.item.projectTitle}
      </Typography>
        
        <Typography sx={{ color: 'text.secondary', display: 'inline', fontSize: 12  }} color="text.secondary">
          {props.item.projectId}
      </Typography>
        </div>
        <div class="col-md-3">
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
               <Item> {props.status !== 'Not Started' ?<Avatar sx={{ bgcolor:  red[500] ,width: 24, height: 24}}>A</Avatar>: null}</Item>
             </Stack>
        </div>
        </div>
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
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
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
      </CardContent>
      
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
      <CommentIcon color="primary"  onClick={ (event)=> setPopOver(event.currentTarget)}/>
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
      <CardActions>
      <Stack spacing={2} sx={{padding : "10px", display: "contents"}} direction="row">
        
        {/* <Chip label={props.item.address.city} />
        <Chip label={props.item.address.street} variant="outlined"/>
        <Chip label={props.item.address.city} /> */}
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Project Description:</Typography>
          <Typography paragraph>
            {props.item.projectDescription}
          </Typography>          
        </CardContent>
      </Collapse>
    </Card>
  );
}
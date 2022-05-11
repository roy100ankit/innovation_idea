
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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
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

export default function CardTemplate(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const [open1, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState(null);

    const handleClose1 = () => {
      setOpen(false);
    };


  return (
    <Card sx={{ maxWidth: 345, height:"auto",padding:'3px' }}>
      <CardHeader
        avatar={
          props.status!=='Not Started' ? 
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {'A'}
          </Avatar>
          : false
        }
        action={
              <IconButton aria-label="settings">
                {/* <MoreVertIcon /> */}
                {/* <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon onClick={handleClick}/>
          </Button> */}
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
           
        }
        title={props.item.projectTitle}
        subheader={props.item.projectId}
      />
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
            inputProps={{ maxLength: 11 }}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button onClick={handleClose1}>{status}</Button>
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
        <CommentIcon color="primary"/>
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
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardTemplate from './cardTemplate'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '20rem',
    color: theme.palette.text.secondary,
  }));
  

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
    <ListItemButton>
      <Stack 
      spacing={20}
      direction="column"
      justifyContent="space-between">
      <Item>
      <Card sx={{ maxWidth: "100%", maxHeight:"50%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
    </Card>
    </Item>
    </Stack>
    </ListItemButton>
    </ListItem>
  );
}

export default function virtualList(props) {

  const notStarted=[
    {
      id:0,
      title:"Shrimp and Chorizo Paella",
      subheader:'September 14, 2016'
    },
    {
      id:1,
      title:"Shrimp and Chorizo Paella",
      subheader:'September 14, 2016'
    },
    {
      id:2,
      title:"Shrimp and Chorizo Paella",
      subheader:'September 14, 2016'
    },
    {
      id:3,
      title:"Shrimp and Chorizo Paella",
      subheader:'September 14, 2016'
    },
    {
      title:"Shrimp and Chorizo Paella",
      subheader:'September 14, 2016'
    },
    {
      id:4,
      title:"Shrimp and Chorizo Paella",
      subheader:'September 14, 2016'
    },
  ]
  return (
    <React.Fragment >
      <div>
     <div>
      {props.header}
     </div>
    
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {
        notStarted.map(i=>{
          return (
            <Stack spacing={12}>
              <Item><CardTemplate/></Item>           
            </Stack>
           
          )
        })
      }
    </Box>
    </div>
    </React.Fragment >
  );
}
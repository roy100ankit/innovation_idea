import React, {Component} from 'react'
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    height: '20rem',
    color: theme.palette.text.secondary,
    backgroundColor:'#e2edf6'
    }));

class taskList extends Component{
    constructor(props){
        super(props)
        this.state={
            notStarted:[
                {
                  id:0,
                  title:"Shrimp and Chorizo Paella",
                  subheader:'September 14, 2016'
                },
                {
                  id:1,
                  title:"Arabiata Pasta",
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
        }
    }

   
    render(){
      const { addButton} = this.props
        return (
            <React.Fragment >
              
            <div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                {this.props.header}
                {addButton ? <AddCircleIcon color="primary" baseClassName="fas" className="fa-plus-circle" /> : null}
            </div>
            
            <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper',overflow:'scroll',
                overflowX:'hidden',marginTop:'4%' }}
            >
            {
                this.state.notStarted.map(i=>{
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
        )
    }
}

export default taskList
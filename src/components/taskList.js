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
import AddTask from './addTask'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { Article } from '@mui/icons-material';

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

class taskList extends Component{
    constructor(props){
        super(props)
        this.state={
          isOpen: false,
          myCar:'',
          myCar1:'',
          chars_left: 2000,
          chars_left1: 4000,
          max_char:2000,
          max_char1:4000,
          project_name:'',
          discripten:'any data',
          usefull_info:'some data',
          comments: 'any',
          submit_date:'5/5/2022',
          team_meber:'rafi d',
          submit_by:'rafi '
        }
    }
    addCard = () =>{
      const item= {
        "projectId": "MT-15",
        "projectTitle": "Demo Tool",
        "projectDescription": "Testing",
        "status": "Not started",
        "complexity": "Moderate",
        "usefulInfo": "all the related documents are attached",
        "comments": [],
        "submittedBy": "Amol Sathewad",
        "teamMember": [],
        "startDate": "29/04/2022",
        "endDate": null
    }
    console.log('data99', this.props.data)
    let finalItems = this.props.data.push(item)
    console.log('finalItems', finalItems)
    axios.post(`${process.env.REACT_APP_URL}`,this.props.data)
    .then(res=>{
      console.log('POST response', res)
    })
  }
   
    render(){
      const { addButton, data, header} = this.props

     
        return (
            <React.Fragment >
              
            <div>
                <div style={{display:'flex', justifyContent:'space-around',color:'#56567a',fontWeight:'600'}}>
                {this.props.header}
                {/* {addButton ? <AddCircleIcon color="primary" baseClassName="fas" className="fa-plus-circle" onClick={this.addCard}/> : null} */}
                {addButton ? <AddTask/> : null}
            </div>
            
            <Box
            sx={{ width: '15rem', height: '33rem', maxWidth: 360, bgcolor: 'background.paper',overflow:'scroll',
                overflowX:'hidden',marginTop:'4%' }}
            >
            { 
            
                // this.state.notStarted.map(i=>{
                // return (
                //     <Stack spacing={12}>
                //     <Item><CardTemplate/></Item>           
                //     </Stack>
                
                // )
                // })
      
                  <Stack spacing={3}>
                    {
                      data && data.length >0  ?
                      data.map(item=>{
                        if(item.status === header){
                          return (
                            <Item><CardTemplate item={item} status={this.props.header}/></Item> 
                          )
                        }
                        
                      })
                     
                      : null
                    }          
                  </Stack>
            }
            </Box>
            </div>
            </React.Fragment >
        )
    }
}

export default taskList
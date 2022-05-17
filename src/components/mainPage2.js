import React,{Component} from 'react'
import Box from '@mui/material/Box';
import TaskList from './taskList'
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import axios from 'axios'
import { ConstructionOutlined } from '@mui/icons-material';
import {useDispatch,useSelector} from 'react-redux'
import { loadUsers } from '../redux/actions';
import {connect} from 'react-redux'

const drawerWidth = 240;
class MainPage extends Component {
  

    constructor(props){
        super(props)
        this.state={
            task:this.props.projects
        }
    }
    // task = useSelector(state=> state.data)
    componentDidMount(){
        //  axios.get('https://jsonplaceholder.typicode.com/users')
        //   .then(res=> {
        //     this.setState({task: res.data})
        //   })
        // axios.get(`${process.env.REACT_APP_URL}`)
        // .then(res=> {
        //   console.log('res Data',res.data)
        //   this.setState({task: res.data})
        //   console.log('task :', this.state.task.NotStarted)
        // })
        console.log('redux Props', this.props)
        this.props.getProjects()

       // this.dispatch(loadUsers())
        const reqData={
          method: 'GET',
          headers:{
              'Content-Type' : 'application/json',  
              mode:'no cors' 
          }
  
        }
  
      //   fetch('http://localhost:8080/get-product-details',reqData) 
      //   .then(response => response.json()) 
      //   .then(data => {
      //     console.log('data', data)
      //     this.setState({task:data.projectRecords})
      //   }) 
      //   .catch(error => {
      //     console.log(error);
  
      //  })        
    }
    
    render(){
      const {task} = this.state
        return (
          <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Innovation Tasks
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Main Projects', 'My Tasks', 'Views' ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Reports', 'Configure Steps', 'Edit Form', 'Wiki'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
            {/* <div>
                Main Projects
                <div style={{display:"flex", justifyContent:"space-between", marginTop:'10%'}}>
                <VirtualList header={'Not Started'}/>
                <VirtualList header={'Planning'}/>
                <VirtualList header={'Execute'}/>
                <VirtualList header={'Completed'}/>
                 <TaskList header={'Not Started'} addButton={true}/>
                <TaskList header={'Planning'}/>
                <TaskList header={'Execute'}/>
                <TaskList header={'Completed'}/>
                </div>
                 
            </div> */}
            <Box
            component="main" sx={{ flexGrow: 1, p: 3 }}
            >
              <Toolbar />
              <div style={{display:"flex", justifyContent:"space-evenly"}}>
              <TaskList header={'Not Started'} addButton={true} data= {this.state.task}/>
                <TaskList header={'Planning'} data={this.state.task}/>
                <TaskList header={'In Progress'} data={this.state.task}/>
                <TaskList header={'Completed'} data={this.state.task}/>
                </div>
            </Box>
           
            </Box>
            
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
  console.log('state',state)
  return {
    projects : state.data.projects
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    getProjects: ()=> dispatch(loadUsers())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainPage)
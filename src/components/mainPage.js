import React ,{useEffect}from 'react'
import Box from '@mui/material/Box';
import TaskList from './taskList'
import ToastMessage from './toastMessage';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import axios from 'axios'
import { ConstructionOutlined } from '@mui/icons-material';
import {useDispatch,useSelector} from 'react-redux'
import { loadUsers } from '../redux/actions';

const drawerWidth = 240;


const MainPage = ()=>{

    const [open, setOpen] = React.useState(false);
    const [noData, setNoData] = React.useState(false);
    let dispatch = useDispatch()
    const {projects} = useSelector(state=> state.data)
    const {error} = useSelector(state=> state.data)
    
   useSelector(state => console.log('state21',state))
    useEffect(()=>{
        dispatch(loadUsers())
        const noData1 = projects.some(item=>item.status!=='Planning')
        console.log('noData1', noData1)
        setNoData(noData1)
      
    },[])

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      } 
      setOpen(false);
    };
    const noDataStatus = (status)=>{
    const  noData1= projects.filter(item => item.status === status)
    console.log('noData1 efer', noData1)
   return noData1.length===0 ? true : false
    }
  //  const noData= projects.some((item)=>{
  //    return item.status!===
  //  })

    // console.log('noData1', noData1)
    return(
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
            {['Reports', 'Configure Steps', 'Edit Form', 'Wiki', 'Archive'].map((text, index) => (
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
              {/* {noData={projects.some(item=>item.status!=='Planning')}} */}
              <Toolbar />
              <div style={{display:"flex", justifyContent:"space-evenly", position:'fixed'}}>
              <TaskList header={'Not Started'}  noData={noDataStatus('Not Started')} addButton={true} data= {projects}/>
                <TaskList header={'Planning'} noData={noDataStatus('Planning')} data={projects}/>
                <TaskList header={'In Progress'}  noData={noDataStatus('In Progress')} data={projects}/>
                <TaskList header={'Completed'} noData={noDataStatus('Completed')} data={projects}/>
                </div>
                
            </Box>
            </Box>
            
            </React.Fragment>
    )
}

export default MainPage
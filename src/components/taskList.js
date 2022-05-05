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
import Popup from './Popup';

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
    handleWordCount = event => {
      const charCount = event.target.value.length;
      const maxChar = this.state.max_char;
      const charLength = maxChar - charCount;
      this.setState({ chars_left: charLength });
}
handleWordCount1 = event => {
  const charCount = event.target.value.length;
  const maxChar = this.state.max_char1;
  const charLength = maxChar - charCount;
  this.setState({ chars_left1: charLength });
}
    togglePopup1 = () => {
    //  console.log('click')
     this.setState({isOpen : false});
   }
  
     togglePopup = () => {
     //  console.log('click')
      this.setState({isOpen : true});
    }

     handleChange = () => {
       console.log("this.state.value");
     // this.setState(myCar);
    };
   
    render(){
      const { addButton, data, header} = this.props
        return (
            <React.Fragment >
              
            <div>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                {this.props.header}
                {addButton ? <AddCircleIcon onClick={this.togglePopup}  color="primary" baseClassName="fas" className="fa-plus-circle" /> : null}
                {this.state.isOpen && <Popup
      content={<>
        <form>
      <label>Project title:
        <input  type="text" limit="27" required/>
      </label>
    </form>
    <p></p>
    <div >
{/*        
        <input type="text"  style={{width:'50%',height:40,}}
    id="sessionNo" 
    name="sessionNum" 
    onkeypress="return isNumberKey(event)" 
    maxlength="2000" /> */}
     <div style={{flexDirection:'row'}}>
       
       <b style={{bottom:100}}>Project Decsripton: </b> 
    
     
          <textArea style={{width:400}}
            rows={6}
            type="text"
            maxLength="2000"
            placeholder="Describe yourself here..."
            required
            onChange={this.handleWordCount}
          />
          <div  style={{marginLeft:'70%',bottom:20}}>
          <p>{this.state.chars_left}/2000</p>
          </div>
        </div>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
        
        </div>
        <form><b>Complexity</b>
        <select class="form-select" aria-label="Default select example">
  <option selected>select</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
    </form>
    
    
    <form>
      <label>Useful Info:
      <input type="text"  style={{width:'50%',height:40,}}
    id="sessionNo" 
    name="sessionNum" 
    onkeypress="return isNumberKey(event)" 
    maxlength="2000" /> 
      </label>
    </form>
    <div><p></p></div>
    <div>

    </div>
    {/* <form>
      <label>Comments: 
      <input style={{width:'50%',height:40}} type="text" />
      </label>
    </form> */}
     <div style={{flexDirection:'row'}}>
       
       <b style={{bottom:100}}>Project Comments: </b> 
    
     
          <textArea style={{width:400}}
            rows={6}
            type="text"
            maxLength="4000"
            placeholder="Describe yourself here..."
            required
            onChange={this.handleWordCount1}
          />
          <div  style={{marginLeft:'70%',bottom:20}}>
          <p>{this.state.chars_left1}/4000</p>
          </div>
        </div>
    <form>
      <label>Project Submition Data:  <input type="text" limit="27"/>
      </label>
    </form>
    <form>
      <label>Team Members:  <input type="text" limit="27"/>
      </label>
    </form>

    <form>
      <label><b>Project Phase: </b>
      <select class="form-select" aria-label="Default select example">
  <option selected>select</option>
  <option value="NotStarted">NotStarted</option>
  <option value="Planned">Planned</option>
  <option value="Eecution">Eecution</option>
  <option value="Deployed">Deployed</option>
  <option value="Discard">Discard </option>
      </select>
      {/* <select value={this.state.myCar1}
       // onChange={this.handleChange1}
       >
        <option value="Ford">NotStarted </option>
        <option value="Volvo">Planned </option>
        <option value="Ford">Eecution </option>
        <option value="Volvo">Deployed </option>
        <option value="Fiat">Discard </option>
      </select> */}
    
    
      </label>
    </form>
    <form>
      <label>Project Submition By:
        <input type="text" limit="27"/>
      </label>
    </form>

    <form>
      <label>Project Id : <input type="text" limit="27"/>
      </label>
      required
      
    </form>

        <button  onClick={this.togglePopup1} >Submit</button>
      </>}
      handleClose={this.togglePopup1}
    />}
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
                            <Item><CardTemplate item={item}/></Item> 
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
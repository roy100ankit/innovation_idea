import React,{Component} from 'react'
import VirtualList from './virtualList'
import TaskList from './taskList'

class MainPage extends Component {

    constructor(props){
        super(props)
        this.state={
            notStarted:[],
            planning:[],
            execute:[],
            completed:[]
        }
    }
    render(){
        return (
            <div>
                Main Projects
                <div style={{display:"flex", justifyContent:"space-between", marginTop:'10%'}}>
                {/* <VirtualList header={'Not Started'}/>
                <VirtualList header={'Planning'}/>
                <VirtualList header={'Execute'}/>
                <VirtualList header={'Completed'}/> */}
                 <TaskList header={'Not Started'}/>
                <TaskList header={'Planning'}/>
                <TaskList header={'Execute'}/>
                <TaskList header={'Completed'}/>
                </div>
                 
            </div>
        )
    }
}

export default MainPage
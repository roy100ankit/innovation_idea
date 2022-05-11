import './App.css';
import {Switch, Route} from 'react-router-dom'
import MainPage from './components/mainPage'
// import MainPage1 from './components/mainPage1';

function App() {
  return (
    <div className="App">
      {/* <Switch>  
       <Route exact path='/' component={MainPage}/>
      </Switch> */}
      <MainPage />
    </div>
  );
}

export default App;
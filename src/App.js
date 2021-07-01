import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DataUpload from './Components/DataUpload/DataUpload'
import Landing from './Components/Landing/Landing'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
// import Register from './Components/Register/Register'
import DnDEnditor from './Components/DnDEditor/DnDEditor'

function App () {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          {/* <Route exact path='/register'>
            <Register />
          </Route> */}
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/csv'>
            <DataUpload />
          </Route>
          <Route exact path='/dnd'>
            <DnDEnditor />
          </Route>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

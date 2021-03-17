import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DataUpload from './Components/DataUpload/DataUpload'
import ContentEditor from './Components/Editor/Editor'
import MJMLRender from './Components/MJMLRender'
import Footer from './Components/Footer/Footer'
import Login from './Components/Landing/Landing'

function App () {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={Login}
          />
          <Route
            path='/csv'
            component={DataUpload}
          />
          <Route
            path='/mail'
            component={ContentEditor}
          />
          <Route
            path='/template'
            component={MJMLRender}
          />
          <Route
            path='/footer'
            component={Footer}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

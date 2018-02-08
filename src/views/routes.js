import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { 
  Home, 
  About, 
  Profile, 
  // Login, 
  Contact,
  Timeline,
} from './pages'

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/github" component={Profile}/>
    <Route path="/contact" component={Contact}/>
    <Route path="/timeline" component={Timeline}/>
    {/* <Route path="/login" component={Login}/> */}
  </Switch>
)

export default Routes
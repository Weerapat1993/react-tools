import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { 
  Home, 
  About, 
  Profile, 
  Login, 
  Contact,
  Timeline,
} from './pages'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/github" component={Profile}/>
      <Route path="/login" component={Login}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/timeline" component={Timeline}/>
    </Switch>
  </Router>
)

export default Routes
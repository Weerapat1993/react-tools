import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Home, About, Profile, Login } from './pages'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/login" component={Login}/>
    </Switch>
  </Router>
)

export default Routes
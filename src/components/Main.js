import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home/Home';
import Utilisateurs from '../components/Utilisateurs/Utilisateurs';
import Plats from '../components/Plats/Plats';
import Menus from '../components/Menus/Menus';
import Programmes from '../components/Programmes/Programmes';
import Login from '../components/Login/Login'
import Logout from '../components/Logout/Logout'

const Main = () => {
  return(
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/users' component={Utilisateurs}/>
      <Route path='/plats' component={Plats}/>
      <Route path='/menus' component={Menus}/>
      <Route path='/programmes' component={Programmes}/>
      <Route exact path='/login' component={Login} />
      <Route exact path='/logout' component={Logout} />
    </Switch>
  )
}

export default Main;
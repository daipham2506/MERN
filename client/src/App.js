import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css';

import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './components/routing/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'

import { loadUser } from './appRedux/actions/auth'
import { setAuthToken } from './utils/setAuthToken'

import store from './appRedux/store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <Switch>
        <div className='container'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </div>
      </Switch>
    </Router>
  );
}
export default App;

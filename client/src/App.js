import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css';

import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'


const App = () => (
  <Router>
    <Navbar />
    <Route exact path='/' component={Landing} />
    <Switch>
      <div className='container'>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </div>
    </Switch>
  </Router>
);
export default App;

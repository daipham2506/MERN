import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { message } from 'antd';

import { login } from '../../appRedux/actions/auth'
import { resetAlert } from '../../appRedux/actions/alert'

const Login = () => {

  // useState
  const [formData, setFormData] = useState({})

  // dispatch
  const dispatch = useDispatch()

  // selectState from reducer
  const alert = useSelector(state => state.alert)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData))
  }

  useEffect(() => {
    if (alert.login) {
      message.error(alert.login);
    }
  }, [alert])

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user" /> Sign into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="password"
            placeholder="Password"
            name="password"
            required
            onChange={e => onChange(e)}
          />
          <small className="form-text">Password must contain at least at 6 chacracters, including UPPER/lowercase and numbers</small>
        </div>
        <input type="submit" className="btn btn-primary" defaultValue="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login




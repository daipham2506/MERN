import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { message } from 'antd';

import { register } from '../../appRedux/actions/auth'

const Register = () => {

    // useState
    const [user, setUser] = useState({})

    // dispatch
    const dispatch = useDispatch()

    // selectState from reducer
    const stateAlert = useSelector(state => state.alert)

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (stateAlert.msg) {
            if (stateAlert.status === 1) {
                message.success(stateAlert.msg)
                setTimeout(() => {
                    window.location = 'login'
                }, 1000);

            } else {
                message.error(stateAlert.msg);
            }
        }

    }, [stateAlert])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.password2) {
            return message.error('Password do not match.', 3);
        }

        dispatch(register(user));
    }

    return (
        <div>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user" /> Create Your Account </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={e => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={e => onChange(e)}
                        required />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
                </div>
                <div className="form-group">
                    <input type="password"
                        placeholder="Password"
                        name="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        minLength={6}
                        onChange={e => onChange(e)}
                        required
                    />
                    <small className="form-text">Password must contain at least at 6 chacracters, including UPPER/lowercase and numbers</small>
                </div>
                <div className="form-group">
                    <input type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" defaultValue="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

export default Register

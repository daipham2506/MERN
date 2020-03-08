import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { message } from 'antd';
import axios from 'axios'

import { setAlert } from '../../appRedux/actions/alert'

const Register = (props) => {

    // useState
    const [user, setUser] = useState({})

    // dispatch
    const dispatch = useDispatch()
    const SetAlert = (msg) =>{
        dispatch(setAlert(msg));
    }

    // selectState from reducer
    const sta = useSelector( state => state.alert)

    useEffect(() => {
        console.log("test", sta);
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.password2) {
            message.error('Password does not match.', 4);
        }
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
                        minLength={6}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength={6}
                        onChange={e => onChange(e)}
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

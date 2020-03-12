import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from '../../constants/ActionTypes'
import { setAlert } from './alert'
import { setAuthToken } from '../../utils/setAuthToken'

import callApi from '../../utils/callApi'

// Load User

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = (newUser) => async dispatch => {
    try {
        const res = await callApi('POST', '/api/users', newUser)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert({ msg: 'You have registered successfully.', status: 1 }))
        dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.error;

        if (error) {
            dispatch(setAlert({ msg: error, status: 0 }))
        }

        dispatch({
            type: REGISTER_FAILED
        })
    }
}

// Login User
export const login = (formData) => async dispatch => {
    try {
        const res = await callApi('POST', '/api/auth', formData)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert({ msg: 'Login success', status: 1 }))
        dispatch(loadUser())
    } catch (err) {
        const error = err.response.data.msg;

        if (error) {
            dispatch(setAlert({ msg: error, status: 0 }))
        }

        dispatch({
            type: LOGIN_FAILED
        })
    }
}

// logout / clear profile

export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT
    })
}
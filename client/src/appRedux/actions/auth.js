import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    LOGIN,
    REGISTER
} from '../../constants/ActionTypes'
import { setAlertLogin, setAlertRegister } from './alert'
import { setAuthToken } from '../../utils/setAuthToken'

import callApi from '../../utils/callApi'

// Load User

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await callApi('/api/auth');

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
    dispatch({ type: REGISTER})
    try {
        const res = await callApi('/api/users', 'POST', newUser)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(setAlertRegister({msg: 'You have registered successfully.', isSuccess: true}))
        dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.error;

        if (error) {
            dispatch(setAlertRegister({msg: error, isSuccess: false}))
        }

        dispatch({
            type: REGISTER_FAILED
        })
    }
}

// Login User
export const login = (formData) => async dispatch => {
    dispatch({ type: LOGIN})
    try {
        const res = await callApi('/api/auth','POST', formData)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const error = err.response.data.msg;

        if (error) {
            dispatch(setAlertLogin(error));
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
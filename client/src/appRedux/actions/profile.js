import callApi from '../../utils/callApi'
import { setAlert } from './alert'

import { GET_PROFILE, PROFILE_ERROR, LOADING } from '../../constants/ActionTypes'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await callApi('/api/profile/me')
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

// create or update profile
export const createProfile = (formData, edit = false) => async dispatch => {
    dispatch({ type: LOADING})
    try {
        const res = await callApi('/api/profile', 'POST', formData)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
        // if(!edit){
        //     history.push('/dashboard')
        // }
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.msg, status: error.response.status }
        })
    }
}


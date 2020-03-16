import callApi from '../../utils/callApi'
import { setAlert } from './alert'

import { GET_PROFILE, PROFILE_ERROR} from '../../constants/ActionTypes'

export const getCurrentProfile = () => dispatch =>{
    try {
        const res = callApi('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

// create or update profile
export const createProfile =(formData, history, edit = false)=> dispatch=>{
    try {
        const res = callApi('/api/profile','POST',formData)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}


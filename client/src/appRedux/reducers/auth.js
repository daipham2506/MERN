import { 
    REGISTER_SUCCESS, 
    REGISTER_FAILED , 
    AUTH_ERROR, 
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from '../../constants/ActionTypes'

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_FAILED:
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}
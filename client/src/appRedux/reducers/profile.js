import { 
    GET_PROFILE, 
    PROFILE_ERROR,
    CLEAR_PROFILE, 
    LOADING
} from '../../constants/ActionTypes'

const initState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: false,
    error: {}
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case LOADING:
            return{
                ...state,
                loading: true,
            }
        default:
            return state
    }
}
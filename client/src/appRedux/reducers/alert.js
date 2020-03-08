import { SET_ALERT } from '../../constants/ActionTypes'

const initState = {
    msg: '',
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                msg: payload
            }
        default:
            return state
    }
}
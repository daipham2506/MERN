import { SET_ALERT } from '../../constants/ActionTypes'

const initState = {
    msg: undefined,
    status: undefined  // 0: error    1: success
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                msg: payload.msg,
                status: payload.status
            }
        default:
            return state
    }
}
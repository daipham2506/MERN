import { SET_ALERT_LOGIN, SET_ALERT_REGISTER, RESET_ALERT, SET_ALERT } from '../../constants/ActionTypes'

const initState = {
    register: undefined,
    login: undefined,
    isSuccess: false, // check register is success
    msg: undefined,
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_ALERT_REGISTER:
            return {
                ...state,
                register: payload.msg,
                isSuccess: payload.isSuccess
            }
        case SET_ALERT_LOGIN:
            return {
                ...state,
                login: payload
            }
        case RESET_ALERT:
            return {
                ...state,
                register: undefined,
                login: undefined,
                isSuccess: false
            }
        case SET_ALERT:
            return {
                ...state,
                msg: payload
            }
        default:
            return state
    }
}
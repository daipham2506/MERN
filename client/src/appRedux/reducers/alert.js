import { SET_ALERT_LOGIN, SET_ALERT_REGISTER, RESET_ALERT } from '../../constants/ActionTypes'

const initState = {
    register: undefined,
    login: undefined,
    isRegSuccess: false,
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_ALERT_REGISTER:
            return {
                ...state,
                register: payload.msg,
                isRegSuccess: payload.isSuccess
            }
        case SET_ALERT_LOGIN:
            return {
                ...state,
                login: payload
            }
        default:
            return state
    }
}
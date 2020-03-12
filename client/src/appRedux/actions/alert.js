import { SET_ALERT_LOGIN, SET_ALERT_REGISTER } from '../../constants/ActionTypes'

export const setAlertLogin = payload => ({
    type: SET_ALERT_LOGIN,
    payload
})

export const setAlertRegister = payload => ({
    type: SET_ALERT_REGISTER,
    payload
})

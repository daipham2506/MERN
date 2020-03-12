import axios from 'axios'

const callApi = (method, endpoint, data) => {
    const res = axios({
        method: method,
        headers: { 'Content-Type': 'application/json' },
        data: data,
        url: endpoint,
    })
    return res;
}
export default callApi;
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api1.0'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
    register(params) {
        return axios.post('/signup/submit', params)
    },
    searchNameExist(username) {
        return axios.get('/signup/checkname', {
            params: {
                username: username
            }
        })
    },
    signin(params) {
        return axios.post('/signin', params)
    }
}
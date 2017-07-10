import axios from 'axios'

const baseURL = 'http://localhost:3000/api1.0';
export default {
    register(params) {
        return axios.post('/user', params)
            // .then(function (res) {
            //     console.log(res);
            // })
            // .catch(function (err) {
            //     console.log(err);
            // });
    },
    searchNameExist(username) {
        return axios.get(baseURL + '/signup/checkname', {
            params: {
                username: username
            }
        })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (err) {
        //     console.log(err);
        // });
    }
}
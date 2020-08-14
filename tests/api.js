const axios = require('axios');

const API_URL = 'http://127.0.0.1:8001/';

const register = async (variables = {}) => {
    return axios.post(API_URL, {
        query: `
            mutation ($name: String!, $email: String!, $password: String!,) {
                register(name: $name, email: $email, password: $password){
                    token
                    user {
                      id
                      name
                      email
                    }
                  }
            }
        `,
        variables
    })
}

const login = async (variables = {}) => {
    return axios.post(API_URL, {
        query: `
            mutation ($email: String!, $password: String!,) {
                login(email: $email, password: $password){
                    token
                    user {
                      id
                      name
                      email
                    }
                  }
            }
        `,
        variables
    })
}

module.exports = {
    register,
    login
}
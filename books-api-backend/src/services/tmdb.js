const axios = require('axios');

const instanceAxios = axios.create(({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '',
        language: 'pt-BR'
    }
}));

module.exports = instanceAxios;
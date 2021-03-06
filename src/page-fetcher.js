const axios = require('axios');
const R = require('ramda');

const getPage = (url) => 
    axios(url)
        .then(R.prop('data'))
        .then(R.trim);

module.exports = {
    getPage,
};

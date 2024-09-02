const express = require('express');
const books = require('./controllers/movies')

const routes = express();

routes.get('/listarfilmes', books.listarFilmes)

module.exports = routes;
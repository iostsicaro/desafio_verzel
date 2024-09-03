const express = require('express');
const movies = require('./controllers/movies');
const moviesGenres = require('./controllers/movieGenres');

const routes = express();

routes.get('/listmovies', movies.listMovies);
routes.get('/listgenres', moviesGenres.listGenres);

module.exports = routes;
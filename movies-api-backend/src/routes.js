const express = require('express');
const loginMiddleware = require('./middlewares/loginMiddleware');
const { login } = require('./controllers/login');
const { registerUser } = require('./controllers/user');
const { listMovies, findMovieById, addFavorites, removeFavorite, searchMovies } = require('./controllers/movies');
const { listGenres } = require('./controllers/movieGenres');

const routes = express();

// USER REGISTER ROUTE
routes.post('/register', registerUser);

// LOGIN ROUTE
routes.post('/login', login);

// MIDDLEWARE VERIFYING LOGIN
routes.use(loginMiddleware);

// GENRES ROUTES
routes.get('/listgenres', listGenres);

// MOVIES ROUTES
routes.get('/listmovies', listMovies);
routes.get('/findmovie/:id', findMovieById)
routes.get('/searchmovies', searchMovies);
routes.post('/addfavorite/:movie_id', addFavorites);
routes.delete('/removefavorite/:movie_id', removeFavorite);

module.exports = routes;
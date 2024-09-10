const express = require('express');
const loginMiddleware = require('./middlewares/loginMiddleware');
const { login } = require('./controllers/login');
const { registerUser } = require('./controllers/user');
const { listMovies, listFavorites, addFavorites, removeFavorite, searchMovies } = require('./controllers/movies');
const { listGenres } = require('./controllers/movieGenres');
const { userLink, createLink, shareLink } = require('./controllers/shareMovies');


const routes = express();

// FAVORITES MOVIES SHARED
routes.get('/share/:link_token', shareLink);

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
routes.get('/searchmovies', searchMovies);
routes.get('/listfavorites', listFavorites);
routes.post('/addfavorite/:movie_id', addFavorites);
routes.delete('/removefavorite/:movie_id', removeFavorite);
routes.get('/userlink', userLink);
routes.post('/createlink', createLink);

module.exports = routes;
const knex = require('../connection');
const instanceAxios = require('../services/tmdb');

const listMovies = async (req, res) => {
    try {
        const { data: { results: movies } } = await instanceAxios.get('discover/movie');

        if (movies) {
            for (const movie of movies) {
                const existingMovie = await knex('movies').where({ original_title: movie.original_title }).first();

                if (!existingMovie) {
                    await knex('movies').insert({
                        id: movie.id,
                        original_title: movie.original_title,
                        overview: movie.overview,
                        popularity: movie.popularity,
                        release_date: movie.release_date,
                        url_image: movie.poster_path
                    });
                };
            }
        } else {
            const moviesDatabase = await knex('movies');

            if (!moviesDatabase) {
                return res.status(404).json('Movies not found.');
            }

            return res.status(200).json(moviesDatabase);
        }

        return res.status(200).json(movies);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const searchMovies = async (req, res) => {
    const { search } = req.query;

    try {
        const { data: { results: movie } } = await instanceAxios.get(`search/movie?query=${search}`);

        if (!movie) {
            const searchDatabase = await knex('movies').where('title', 'ilike', `%${search}%`);

            if (!searchDatabase) {
                return res.status(404).json('Movies not found.');
            }

            return res.status(200).json(searchDatabase);
        }

        return res.status(200).json(movie);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const listFavorites = async (req, res) => {
    const { user } = req;

    try {
        const favoritesMovies = await knex('favorite_movies').where({ users_id: user.id });
        
        if (!favoritesMovies) {
            return res.status(200).json([]);
        }

        res.status(200).json(favoritesMovies);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const addFavorites = async (req, res) => {
    const { user } = req;
    const { movie_id } = req.params;

    try {
        const { data: { ...movie } } = await instanceAxios.get(`movie/${movie_id}`);
        
        if (!movie) {
            const findMovieDatabase = await knex('movies').where({ id: movie_id });

            if (!findMovieDatabase) {
                return res.status(404).json('Movie not found.');
            }

            const findFavoriteDatabase = await knex('favorite_movies').where({ id: movie_id, users_id: user.id, movies_id: movie_id }).first();;

            if (findFavoriteDatabase) {
                return res.status(400).json('Favorite already exists.');
            }

            const addFavoriteDatabase = await knex('favorite_movies')
                .insert({
                    id: movie_id,
                    users_id: user.id,
                    movies_id: movie_id,
                    original_title: findFavoriteDatabase.original_title,
                    overview: findFavoriteDatabase.overview,
                    popularity: findFavoriteDatabase.popularity,
                    release_date: findFavoriteDatabase.release_date,
                    url_image: findFavoriteDatabase.url_image
                })
            ;

            if (!addFavoriteDatabase) {
                return res.status(400).json('Unable to add favorite.');
            }
        } else {
            const findFavorite = await knex('favorite_movies').where({ id: movie_id, users_id: user.id, movies_id: movie_id }).first();

            if (findFavorite) {
                return res.status(400).json('Favorite already exists.');
            }

            const addFavorite = await knex('favorite_movies')
                .insert({
                    id: movie_id,
                    users_id: user.id,
                    movies_id: movie_id,
                    original_title: movie.original_title,
                    overview: movie.overview,
                    popularity: movie.popularity,
                    release_date: movie.release_date,
                    url_image: movie.url_image
                })
            ;

            if (!addFavorite) {
                return res.status(400).json('Unable to add favorite.');
            }
        }

        return res.status(200).json('Favorite added successfully.');
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const removeFavorite = async (req, res) => {
    const { user } = req;
    const { movie_id } = req.params;

    try {
        const findFavorite = await knex('favorite_movies').where({ id: movie_id, users_id: user.id, movies_id: movie_id }).first();

        if (!findFavorite) {
            return res.status(404).json('Favorite not found.');
        }

        const removeFavorite = await knex('favorite_movies').del().where({ id: movie_id, users_id: user.id, movies_id: movie_id });

        if (!removeFavorite) {
            return res.status(400).json('Favorite not removed.')
        }

        return res.status(200).json('Favorite successfully deleted.');
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

module.exports = {
    listMovies,
    searchMovies,
    addFavorites,
    removeFavorite,
    listFavorites
};
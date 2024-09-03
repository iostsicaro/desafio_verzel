const knex = require('../connection');
const instanceAxios = require('../services/tmdb');

const listMovies = async (req, res) => {
    try {
        const { data: { results: movies } } = await instanceAxios.get('movie/popular');
        
        if (!movies) {
            const moviesDatabase = await knex('movies');

            return res.status(200).json(moviesDatabase)
        }

        return res.status(200).json(movies);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const searchMovies = async (req, res) => {
    const { search } = req.body;
    
    try {
        const { data: { results: movie } } = await instanceAxios.get(`search/movie?query=${search}`);

        if (!movie) {
            const searchDatabase = await knex('movies').where('title', 'ilike', `%${search}%`);

            return res.status(200).json(searchDatabase);
        }

        return res.status(200).json(movie);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const addFavorites = async (req, res) => {
    const { id, title, description, popularity, url_image } = req.body;

    try {
        const verifyingDuplicities = await knex('movies').where('title', 'ilike', `%${title}%`).andWhere({ id: id }).first();

        if (verifyingDuplicities) {
            return res.status(404).json('Favorite already exists.');
        }

        const favorite = await knex('produtos').insert({ id: id, title, description: overview, popularity, url_image: poster_path }).returning('*');

        if (!favorite)  {
            return res.status(404).json('Unable to add favorite.');
        }

        return res.status(200).json(favorite);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const removeFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        const findMovie = await knex('movies').where({ id: id }).first();

        if (!findMovie) {
            return res.status(404).json('Movie not found.');
        }

        let removeFavorite = await knex('movies').del().where({ id: id });
        removeFavorite = await knex('favorite_movies').del().where({ movies_id: id });

        return res.status(200).json('Movie successfully deleted.');
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
};
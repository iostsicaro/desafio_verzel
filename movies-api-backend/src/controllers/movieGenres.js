const knex = require('../connection');
const instanceAxios = require('../services/tmdb');

const listGenres = async (req, res) => {
    try {
        const { data: { genres: genres } } = await instanceAxios.get('genre/movie/list');
        
        if (!genres) {
            const genresDatabase = await knex('genre');

            return res.status(200).json(genresDatabase);
        }

        return res.status(200).json(genres);
    } catch (error) {
        const { data: { status_message }, status } = error.response;
        
        return res.status(status).json(status_message);
    }
};

module.exports = {
    listGenres,
};
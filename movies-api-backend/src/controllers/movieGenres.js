const knex = require('../connection');
const instanceAxios = require('../services/tmdb');

const listGenres = async (req, res) => {
    try {
        const genresTmdb = await instanceAxios.get('genre/movie/list');

        if (!genresTmdb.data) {
            const genresDatabase = await knex('genres');

            return res.status(200).json(genresDatabase)
        }

        return res.status(200).json(genresTmdb.data);
    } catch (error) {
        const { data: { errors }, status } = error.response;

        return res.status(status).json({
            erro: `${errors[0].parameter_name} - ${errors[0].message}`
        });
    }
};

module.exports = {
    listGenres,
};